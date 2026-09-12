import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  AdminListQuery,
  ContributionDto,
  CreateContributionInput,
  Locale,
  PullRequestDto,
  UpdateContributionInput,
} from '@repo/contracts';
import { asc, contributions, contributionTechnologies, type Database, eq, sql } from '@repo/db';
import { contentWhere } from '../common/content-filters';
import { offset, paginate } from '../common/paginate';
import { InjectDb } from '../db/inject-db.decorator';
import { GithubService } from '../github/github.service';

const WITH_RELATIONS = {
  technologies: { with: { tech: { with: { icon: true } } } },
} as const;

const ORDER = [asc(contributions.order), asc(contributions.createdAt)];

function toDto(row: Record<string, any>): ContributionDto {
  return {
    id: row.id,
    locale: row.locale,
    status: row.status,
    title: row.title,
    description: row.description,
    repository: row.repository,
    fork: row.fork ?? null,
    pullRequests: row.pullRequests ?? [],
    order: row.order,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    technologies: (row.technologies ?? []).map((link: any) => link.tech).filter(Boolean),
  };
}

@Injectable()
export class ContributionsService {
  constructor(
    @InjectDb() private readonly db: Database,
    private readonly github: GithubService,
  ) {}

  async findPublic(locale?: Locale): Promise<ContributionDto[]> {
    const rows = await this.db.query.contributions.findMany({
      where: contentWhere(contributions, { locale, status: 'published' }),
      orderBy: ORDER,
      with: WITH_RELATIONS,
    });
    return rows.map(toDto);
  }

  async findAll(query: AdminListQuery) {
    const where = contentWhere(contributions, query);
    const [rows, [count]] = await Promise.all([
      this.db.query.contributions.findMany({
        where,
        orderBy: ORDER,
        limit: query.limit,
        offset: offset(query),
        with: WITH_RELATIONS,
      }),
      this.db
        .select({ count: sql<number>`count(*)::int` })
        .from(contributions)
        .where(where),
    ]);
    return paginate(rows.map(toDto), count?.count ?? 0, query);
  }

  async findById(id: string): Promise<ContributionDto> {
    const row = await this.db.query.contributions.findFirst({
      where: eq(contributions.id, id),
      with: WITH_RELATIONS,
    });
    if (!row) throw new NotFoundException('Contribution not found');
    return toDto(row);
  }

  async create(dto: CreateContributionInput): Promise<ContributionDto> {
    const pullRequests = await this.resolvePullRequests(
      dto.repository,
      dto.syncPullRequests !== false,
      dto.pullRequests,
    );
    const [created] = await this.db
      .insert(contributions)
      .values({
        locale: dto.locale,
        status: dto.status,
        title: dto.title,
        description: dto.description,
        repository: dto.repository,
        fork: dto.fork || null,
        pullRequests,
        order: dto.order,
      })
      .returning({ id: contributions.id });

    await this.syncTechnologies(created!.id, dto.technologyIds);
    return this.findById(created!.id);
  }

  async update(id: string, dto: UpdateContributionInput): Promise<ContributionDto> {
    const existing = await this.db.query.contributions.findFirst({
      where: eq(contributions.id, id),
    });
    if (!existing) throw new NotFoundException('Contribution not found');

    const repository = dto.repository ?? existing.repository;
    const pullRequests = await this.resolvePullRequests(
      repository,
      dto.syncPullRequests === true,
      dto.pullRequests,
    );

    const values = {
      ...(dto.locale !== undefined ? { locale: dto.locale } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
      ...(dto.title !== undefined ? { title: dto.title } : {}),
      ...(dto.description !== undefined ? { description: dto.description } : {}),
      ...(dto.repository !== undefined ? { repository: dto.repository } : {}),
      ...(dto.fork !== undefined ? { fork: dto.fork || null } : {}),
      ...(dto.order !== undefined ? { order: dto.order } : {}),
      ...(pullRequests ? { pullRequests } : {}),
    };

    await this.db
      .update(contributions)
      .set(Object.keys(values).length ? values : { updatedAt: new Date() })
      .where(eq(contributions.id, id));

    if (dto.technologyIds) await this.syncTechnologies(id, dto.technologyIds);
    return this.findById(id);
  }

  async remove(id: string): Promise<ContributionDto> {
    const contribution = await this.findById(id);
    await this.db.delete(contributions).where(eq(contributions.id, id));
    return contribution;
  }

  /**
   * GitHub is the source of truth for the pull request list, but a failed or
   * rate-limited call must not block the save, so a null result falls back to
   * whatever the caller sent and, failing that, leaves the row untouched.
   */
  private async resolvePullRequests(
    repository: string | undefined,
    shouldSync: boolean,
    fallback: PullRequestDto[] | undefined,
  ) {
    if (!repository || !shouldSync) return fallback;
    const fetched = await this.github.fetchPullRequests(repository);
    return fetched ?? fallback;
  }

  private async syncTechnologies(contributionId: string, technologyIds: string[] = []) {
    await this.db
      .delete(contributionTechnologies)
      .where(eq(contributionTechnologies.contributionId, contributionId));
    if (technologyIds.length) {
      await this.db
        .insert(contributionTechnologies)
        .values(technologyIds.map((techId, position) => ({ contributionId, techId, position })));
    }
  }
}
