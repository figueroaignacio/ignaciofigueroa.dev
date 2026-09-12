import { apiAdmin, toQuery } from '@/shared/lib/api-server';
import type {
  AdminListQuery,
  ContributionDto,
  EducationDto,
  ExperienceDto,
  MediaDto,
  Paginated,
  ProjectCategoryDto,
  ProjectDto,
  ProjectLabelDto,
  TechIconDto,
  TechStackDto,
  TestimonialDto,
} from '@repo/contracts';

type ListParams = Partial<AdminListQuery>;

function list<T>(path: string, params: ListParams = {}) {
  return apiAdmin<Paginated<T>>(`${path}${toQuery({ limit: 100, ...params })}`);
}

export const getAdminProjects = (params?: ListParams) =>
  list<ProjectDto>('/admin/projects', params);
export const getAdminProject = (id: string) => apiAdmin<ProjectDto>(`/admin/projects/${id}`);

export const getAdminExperiences = (params?: ListParams) =>
  list<ExperienceDto>('/admin/experiences', params);
export const getAdminExperience = (id: string) =>
  apiAdmin<ExperienceDto>(`/admin/experiences/${id}`);

export const getAdminEducation = (params?: ListParams) =>
  list<EducationDto>('/admin/education', params);
export const getAdminEducationEntry = (id: string) =>
  apiAdmin<EducationDto>(`/admin/education/${id}`);

export const getAdminTestimonials = (params?: ListParams) =>
  list<TestimonialDto>('/admin/testimonials', params);
export const getAdminTestimonial = (id: string) =>
  apiAdmin<TestimonialDto>(`/admin/testimonials/${id}`);

export const getAdminContributions = (params?: ListParams) =>
  list<ContributionDto>('/admin/contributions', params);
export const getAdminContribution = (id: string) =>
  apiAdmin<ContributionDto>(`/admin/contributions/${id}`);

export const getAdminTechStack = () => apiAdmin<TechStackDto[]>('/admin/tech/stack');
export const getAdminTechIcons = () => apiAdmin<TechIconDto[]>('/admin/tech/icons');
export const getAdminCategories = () => apiAdmin<ProjectCategoryDto[]>('/admin/project-categories');
export const getAdminLabels = () => apiAdmin<ProjectLabelDto[]>('/admin/project-labels');
export const getAdminMedia = () => apiAdmin<MediaDto[]>('/admin/media');
