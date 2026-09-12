import 'dotenv/config';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { createDb } from '../src/client';
import {
  contributions,
  contributionTechnologies,
  education,
  experiences,
  media,
  projectCategories,
  projectLabels,
  projects,
  projectTechnologies,
  projectToCategories,
  projectToLabels,
  techIcons,
  techStack,
  testimonials,
  type ContentStatus,
  type Locale,
} from '../src/schema';
import { lexicalToMarkdown } from './lexical-to-markdown';

type Row = Record<string, unknown>;

const status = (value: unknown): ContentStatus => (value === 'published' ? 'published' : 'draft');
const locale = (value: unknown): Locale => (value === 'es' ? 'es' : 'en');
const str = (value: unknown) => (typeof value === 'string' ? value : null);
const num = (value: unknown) => (typeof value === 'number' ? value : Number(value ?? 0) || 0);
const dateOnly = (value: unknown) => {
  if (!value) return null;
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
};
const slugify = (input: string) =>
  input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s_-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

async function main() {
  const { DATABASE_URL, PAYLOAD_DATABASE_URL, PAYLOAD_MEDIA_BASE_URL } = process.env;
  if (!DATABASE_URL || !PAYLOAD_DATABASE_URL) {
    throw new Error('DATABASE_URL and PAYLOAD_DATABASE_URL are required');
  }

  const db = createDb(DATABASE_URL);
  const old = postgres(PAYLOAD_DATABASE_URL, { prepare: false, max: 2 });

  const iconIds = new Map<number, string>();
  for (const row of await old<Row[]>`select * from tech_icons order by id`) {
    const [saved] = await db
      .insert(techIcons)
      .values({ name: String(row.name), svg: String(row.svg) })
      .onConflictDoUpdate({ target: techIcons.name, set: { svg: String(row.svg) } })
      .returning({ id: techIcons.id });
    iconIds.set(num(row.id), saved!.id);
  }
  console.log(`tech icons: ${iconIds.size}`);

  const techIds = new Map<number, string>();
  for (const row of await old<Row[]>`select * from tech_stack order by id`) {
    const iconId = row.icon_id ? (iconIds.get(num(row.icon_id)) ?? null) : null;
    const [saved] = await db
      .insert(techStack)
      .values({ name: String(row.name), iconId })
      .onConflictDoUpdate({ target: techStack.name, set: { iconId } })
      .returning({ id: techStack.id });
    techIds.set(num(row.id), saved!.id);
  }
  console.log(`tech stack: ${techIds.size}`);

  const labelIds = new Map<number, string>();
  for (const row of await old<Row[]>`select * from project_labels order by id`) {
    const [saved] = await db
      .insert(projectLabels)
      .values({ label: String(row.label) })
      .onConflictDoUpdate({ target: projectLabels.label, set: { label: String(row.label) } })
      .returning({ id: projectLabels.id });
    labelIds.set(num(row.id), saved!.id);
  }
  console.log(`project labels: ${labelIds.size}`);

  const categoryIds = new Map<number, string>();
  for (const row of await old<Row[]>`select * from project_category order by id`) {
    const label = String(row.label);
    const [saved] = await db
      .insert(projectCategories)
      .values({ label, slug: slugify(label) })
      .onConflictDoUpdate({ target: projectCategories.slug, set: { label } })
      .returning({ id: projectCategories.id });
    categoryIds.set(num(row.id), saved!.id);
  }
  console.log(`project categories: ${categoryIds.size}`);

  const mediaIds = new Map<number, string>();
  for (const row of await old<Row[]>`select * from media order by id`) {
    const rawUrl = str(row.url);
    if (!rawUrl) continue;
    const url = rawUrl.startsWith('http') ? rawUrl : `${PAYLOAD_MEDIA_BASE_URL ?? ''}${rawUrl}`;
    const path = `legacy/${str(row.filename) ?? `${num(row.id)}`}`;
    const [saved] = await db
      .insert(media)
      .values({
        bucket: 'legacy',
        path,
        url,
        alt: str(row.alt) ?? '',
        mimeType: str(row.mime_type) ?? 'application/octet-stream',
        size: num(row.filesize),
        width: row.width ? num(row.width) : null,
        height: row.height ? num(row.height) : null,
      })
      .onConflictDoUpdate({ target: media.path, set: { url, alt: str(row.alt) ?? '' } })
      .returning({ id: media.id });
    mediaIds.set(num(row.id), saved!.id);
  }
  console.log(`media: ${mediaIds.size}`);

  const projectRels = await old<Row[]>`select * from projects_rels order by parent_id, "order"`;
  let projectCount = 0;
  for (const row of await old<Row[]>`select * from projects order by "order", id`) {
    const slug = str(row.slug) || slugify(String(row.title));
    const values = {
      locale: locale(row.locale),
      status: status(row._status),
      title: String(row.title),
      subtitle: str(row.subtitle) ?? '',
      slug,
      description: str(row.description) ?? '',
      body: lexicalToMarkdown(row.body),
      icon: str(row.icon),
      imageId: row.project_image_id ? (mediaIds.get(num(row.project_image_id)) ?? null) : null,
      videoUrl: str(row.video_url),
      repository: str(row.repository),
      demo: str(row.demo),
      isCommercial: Boolean(row.is_commercial_project),
      order: num(row.order),
      publishedAt: row._status === 'published' ? new Date(String(row.updated_at)) : null,
      createdAt: new Date(String(row.created_at)),
      updatedAt: new Date(String(row.updated_at)),
    };
    const [saved] = await db
      .insert(projects)
      .values(values)
      .onConflictDoUpdate({ target: projects.slug, set: values })
      .returning({ id: projects.id });
    const projectId = saved!.id;
    await db.delete(projectTechnologies).where(eq(projectTechnologies.projectId, projectId));
    await db.delete(projectToLabels).where(eq(projectToLabels.projectId, projectId));
    await db.delete(projectToCategories).where(eq(projectToCategories.projectId, projectId));

    const rels = projectRels.filter((rel) => num(rel.parent_id) === num(row.id));
    let position = 0;
    for (const rel of rels) {
      const techId = rel.tech_stack_id ? techIds.get(num(rel.tech_stack_id)) : undefined;
      const labelId = rel.project_labels_id ? labelIds.get(num(rel.project_labels_id)) : undefined;
      const categoryId = rel.project_category_id
        ? categoryIds.get(num(rel.project_category_id))
        : undefined;
      if (techId)
        await db
          .insert(projectTechnologies)
          .values({ projectId, techId, position: position++ })
          .onConflictDoNothing();
      if (labelId)
        await db.insert(projectToLabels).values({ projectId, labelId }).onConflictDoNothing();
      if (categoryId)
        await db
          .insert(projectToCategories)
          .values({ projectId, categoryId })
          .onConflictDoNothing();
    }
    projectCount++;
  }
  console.log(`projects: ${projectCount}`);

  const tasks = await old<Row[]>`select * from experience_tasks order by _parent_id, _order`;
  const techs = await old<Row[]>`select * from experience_technologies order by _parent_id, _order`;
  await db.delete(experiences);
  let experienceCount = 0;
  for (const row of await old<Row[]>`select * from experience order by "order", id`) {
    const id = num(row.id);
    await db.insert(experiences).values({
      locale: locale(row.locale),
      status: status(row._status),
      title: String(row.title),
      company: String(row.company),
      location: str(row.location),
      tasks: tasks
        .filter((task) => num(task._parent_id) === id)
        .map((task) => String(task.item ?? ''))
        .filter(Boolean),
      technologies: techs
        .filter((tech) => num(tech._parent_id) === id)
        .map((tech) => String(tech.name ?? ''))
        .filter(Boolean),
      startDate: dateOnly(row.start_date) ?? new Date().toISOString().slice(0, 10),
      endDate: dateOnly(row.end_date),
      isCurrent: Boolean(row.is_current),
      link: str(row.link),
      order: num(row.order),
      createdAt: new Date(String(row.created_at)),
      updatedAt: new Date(String(row.updated_at)),
    });
    experienceCount++;
  }
  console.log(`experiences: ${experienceCount}`);

  await db.delete(education);
  let educationCount = 0;
  for (const row of await old<Row[]>`select * from education order by "order", id`) {
    await db.insert(education).values({
      locale: locale(row.locale),
      status: status(row._status),
      title: String(row.title),
      institution: String(row.institution),
      location: str(row.location),
      description: str(row.description),
      startDate: dateOnly(row.start_date) ?? new Date().toISOString().slice(0, 10),
      endDate: dateOnly(row.end_date),
      isCurrent: Boolean(row.is_current),
      certificateUrl: str(row.certificate_url),
      highlight: Boolean(row.highlight),
      order: num(row.order),
      createdAt: new Date(String(row.created_at)),
      updatedAt: new Date(String(row.updated_at)),
    });
    educationCount++;
  }
  console.log(`education: ${educationCount}`);

  await db.delete(testimonials);
  let testimonialCount = 0;
  for (const row of await old<Row[]>`select * from testimonials order by "order", id`) {
    await db.insert(testimonials).values({
      locale: locale(row.locale),
      status: status(row._status),
      name: String(row.name),
      role: String(row.role),
      company: str(row.company),
      avatar: str(row.avatar),
      testimonial: String(row.testimonial),
      date: dateOnly(row.date),
      order: num(row.order),
      createdAt: new Date(String(row.created_at)),
      updatedAt: new Date(String(row.updated_at)),
    });
    testimonialCount++;
  }
  console.log(`testimonials: ${testimonialCount}`);

  const prs = await old<
    Row[]
  >`select * from contributions_pull_requests order by _parent_id, _order`;
  const contributionRels = await old<
    Row[]
  >`select * from contributions_rels order by parent_id, "order"`;
  await db.delete(contributions);
  let contributionCount = 0;
  for (const row of await old<Row[]>`select * from contributions order by created_at, id`) {
    const id = num(row.id);
    const [saved] = await db
      .insert(contributions)
      .values({
        locale: locale(row.locale),
        status: status(row._status),
        title: String(row.title),
        description: String(row.description),
        repository: String(row.repository),
        fork: str(row.fork),
        pullRequests: prs
          .filter((pr) => num(pr._parent_id) === id)
          .map((pr) => ({ url: String(pr.url ?? ''), label: str(pr.label) }))
          .filter((pr) => pr.url),
        order: contributionCount,
        createdAt: new Date(String(row.created_at)),
        updatedAt: new Date(String(row.updated_at)),
      })
      .returning({ id: contributions.id });
    let position = 0;
    for (const rel of contributionRels.filter((rel) => num(rel.parent_id) === id)) {
      const techId = rel.tech_stack_id ? techIds.get(num(rel.tech_stack_id)) : undefined;
      if (techId)
        await db
          .insert(contributionTechnologies)
          .values({ contributionId: saved!.id, techId, position: position++ })
          .onConflictDoNothing();
    }
    contributionCount++;
  }
  console.log(`contributions: ${contributionCount}`);

  await old.end();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
