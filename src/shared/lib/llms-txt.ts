import { getExperiences } from '@/features/home/api/experience';
import { getProjects } from '@/features/projects/api/projects';
import type { Experience, Project, TechStack } from '@/payload-types';
import { getTranslations } from 'next-intl/server';
import { BASE_URL } from './constants';
import { formatDate } from './format-date';
import { CONTACT_EMAIL, PERSON_SAME_AS, type FaqItem } from './schema';

interface CertificationItem {
  title: string;
  issuer: string;
  credentialId?: string;
  credentialUrl?: string;
  issueDate?: string;
}

interface EducationItem {
  title: string;
  institution: string;
  description: string;
  startDate: string;
  endDate: string | null;
}

function techNames(technologies: Project['technologies']): string[] {
  return (technologies ?? [])
    .filter((tech): tech is TechStack => typeof tech === 'object' && tech !== null)
    .map((tech) => tech.name)
    .filter(Boolean);
}

function experienceLines(experiences: Experience[], locale: string, present: string): string[] {
  return experiences.map((experience) => {
    const period = `${formatDate(experience.startDate, locale)} – ${
      experience.endDate ? formatDate(experience.endDate, locale) : present
    }`;
    const stack = (experience.technologies ?? [])
      .map((tech) => tech.name?.trim())
      .filter(Boolean)
      .join(', ');

    const lines = [
      `### ${experience.title.trim()} — ${experience.company.trim()}`,
      '',
      [period, experience.location?.trim(), experience.link?.trim()].filter(Boolean).join(' · '),
      '',
      ...experience.tasks.map((task) => `- ${task.item}`),
    ];

    if (stack) {
      lines.push('', `Stack: ${stack}`);
    }

    lines.push('');

    return lines.join('\n');
  });
}

export async function buildLlmsTxt(locale: 'en' | 'es', full: boolean): Promise<string> {
  const isEs = locale === 'es';

  const [tMeta, tSections, projects, experiences] = await Promise.all([
    getTranslations({ locale, namespace: 'metadata' }),
    getTranslations({ locale, namespace: 'sections' }),
    getProjects(locale),
    getExperiences(locale),
  ]);

  const certifications = tSections.raw('certifications.items') as CertificationItem[];
  const education = tSections.raw('education.items') as EducationItem[];
  const faq = tSections.raw('faq.items') as FaqItem[];
  const present = isEs ? 'presente' : 'present';

  const heading = (en: string, es: string) => (isEs ? es : en);

  const out: string[] = [
    '# Ignacio Figueroa',
    '',
    `> ${tMeta('home.description')}`,
    '',
    `- ${heading('Site', 'Sitio')}: ${BASE_URL}/${locale}`,
    `- ${heading('Location', 'Ubicación')}: Buenos Aires, ${heading('Argentina', 'Argentina')} (UTC−3)`,
    `- ${heading('Email', 'Email')}: ${CONTACT_EMAIL}`,
    `- ${heading('Languages', 'Idiomas')}: ${heading('Spanish (native), English (professional)', 'Español (nativo), inglés (profesional)')}`,
    `- ${heading('Profiles', 'Perfiles')}: ${PERSON_SAME_AS.join(', ')}`,
    '',
    `## ${heading('About', 'Sobre mí')}`,
    '',
    tSections('aboutMe.content.bio'),
    '',
    tSections('aboutMe.content.details'),
    '',
    `## ${heading('Experience', 'Experiencia')}`,
    '',
    ...experienceLines(experiences, locale, present),
    '',
    `## ${heading('Projects', 'Proyectos')}`,
    '',
  ];

  for (const project of projects) {
    const stack = techNames(project.technologies);
    out.push(
      `### ${project.title}`,
      '',
      project.description,
      '',
      `- URL: ${BASE_URL}/${locale}/projects/${project.slug}`,
    );
    if (project.demo) out.push(`- ${heading('Live demo', 'Demo')}: ${project.demo}`);
    if (project.repository) out.push(`- ${heading('Source', 'Código')}: ${project.repository}`);
    if (stack.length) out.push(`- Stack: ${stack.join(', ')}`);
    out.push(
      `- ${heading('Last updated', 'Última actualización')}: ${project.updatedAt.slice(0, 10)}`,
    );
    out.push('');
  }

  out.push(`## ${heading('Education', 'Educación')}`, '');
  for (const item of education) {
    const period = `${formatDate(item.startDate, locale)} – ${
      item.endDate ? formatDate(item.endDate, locale) : present
    }`;
    out.push(`### ${item.title} — ${item.institution}`, '', period, '', item.description, '');
  }

  out.push(`## ${heading('Certifications', 'Certificaciones')}`, '');
  for (const item of certifications) {
    const parts = [`- ${item.title} — ${item.issuer}`];
    if (item.issueDate) parts.push(`(${item.issueDate})`);
    if (item.credentialId) parts.push(`· ID ${item.credentialId}`);
    if (item.credentialUrl) parts.push(`· ${encodeURI(`${BASE_URL}${item.credentialUrl}`)}`);
    out.push(parts.join(' '));
  }
  out.push('');

  out.push(`## ${heading('Common questions', 'Preguntas frecuentes')}`, '');
  for (const item of faq) {
    out.push(`### ${item.question}`, '', item.answer, '');
  }

  if (full) {
    out.push(`## ${heading('Project details', 'Detalle de proyectos')}`, '');
    for (const project of projects) {
      out.push(
        `### ${project.title}`,
        '',
        `${BASE_URL}/${locale}/projects/${project.slug}`,
        '',
        lexicalToText(project.body),
        '',
      );
    }
  }

  out.push(
    '---',
    '',
    `${heading('Other languages', 'Otros idiomas')}: ${BASE_URL}/llms.txt?lang=${isEs ? 'en' : 'es'}`,
  );

  return `${out.join('\n').replace(/\n{3,}/g, '\n\n')}\n`;
}

interface LexicalNode {
  type?: string;
  tag?: string;
  text?: string;
  listType?: string;
  children?: LexicalNode[];
}

function lexicalToText(body: Project['body']): string {
  const root = (body as { root?: LexicalNode } | null)?.root;
  if (!root?.children) return '';

  const render = (node: LexicalNode, depth = 0): string => {
    if (node.type === 'text') return node.text ?? '';

    const inner = (node.children ?? []).map((child) => render(child, depth + 1)).join('');

    switch (node.type) {
      case 'heading':
        return `\n${'#'.repeat(Number(node.tag?.slice(1) ?? 3) + 1)} ${inner}\n`;
      case 'listitem':
        return `- ${inner}\n`;
      case 'list':
        return `\n${(node.children ?? []).map((child) => render(child, depth + 1)).join('')}\n`;
      case 'paragraph':
        return inner.trim() ? `\n${inner}\n` : '';
      case 'linebreak':
        return '\n';
      default:
        return inner;
    }
  };

  return root.children
    .map((node) => render(node))
    .join('')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
