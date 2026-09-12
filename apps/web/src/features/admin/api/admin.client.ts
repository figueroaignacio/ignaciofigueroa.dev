import { apiClient, uploadFile } from '@/shared/lib/api-client';
import type {
  ContributionDto,
  CreateContributionInput,
  CreateEducationInput,
  CreateExperienceInput,
  CreateProjectCategoryInput,
  CreateProjectInput,
  CreateProjectLabelInput,
  CreateTechIconInput,
  CreateTechStackInput,
  CreateTestimonialInput,
  EducationDto,
  ExperienceDto,
  MediaDto,
  ProjectCategoryDto,
  ProjectDto,
  ProjectLabelDto,
  TechIconDto,
  TechStackDto,
  TestimonialDto,
  UpdateContributionInput,
  UpdateEducationInput,
  UpdateExperienceInput,
  UpdateProjectCategoryInput,
  UpdateProjectInput,
  UpdateProjectLabelInput,
  UpdateTechIconInput,
  UpdateTechStackInput,
  UpdateTestimonialInput,
} from '@repo/contracts';

const json = (body: unknown) => JSON.stringify(body);

function crud<TDto, TCreate, TUpdate>(path: string) {
  return {
    create: (input: TCreate) => apiClient<TDto>(path, { method: 'POST', body: json(input) }),
    update: (id: string, input: TUpdate) =>
      apiClient<TDto>(`${path}/${id}`, { method: 'PATCH', body: json(input) }),
    remove: (id: string) => apiClient<TDto>(`${path}/${id}`, { method: 'DELETE' }),
  };
}

export const projectsApi = crud<ProjectDto, CreateProjectInput, UpdateProjectInput>(
  '/admin/projects',
);
export const experiencesApi = crud<ExperienceDto, CreateExperienceInput, UpdateExperienceInput>(
  '/admin/experiences',
);
export const educationApi = crud<EducationDto, CreateEducationInput, UpdateEducationInput>(
  '/admin/education',
);
export const testimonialsApi = crud<TestimonialDto, CreateTestimonialInput, UpdateTestimonialInput>(
  '/admin/testimonials',
);
export const contributionsApi = crud<
  ContributionDto,
  CreateContributionInput,
  UpdateContributionInput
>('/admin/contributions');
export const techStackApi = crud<TechStackDto, CreateTechStackInput, UpdateTechStackInput>(
  '/admin/tech/stack',
);
export const techIconsApi = crud<TechIconDto, CreateTechIconInput, UpdateTechIconInput>(
  '/admin/tech/icons',
);
export const categoriesApi = crud<
  ProjectCategoryDto,
  CreateProjectCategoryInput,
  UpdateProjectCategoryInput
>('/admin/project-categories');
export const labelsApi = crud<ProjectLabelDto, CreateProjectLabelInput, UpdateProjectLabelInput>(
  '/admin/project-labels',
);

export const mediaApi = {
  upload: (file: File, alt: string) => {
    const body = new FormData();
    body.append('file', file);
    body.append('alt', alt);
    return uploadFile<MediaDto>('/admin/media', body);
  },
  update: (id: string, alt: string) =>
    apiClient<MediaDto>(`/admin/media/${id}`, { method: 'PATCH', body: json({ alt }) }),
  remove: (id: string) => apiClient<MediaDto>(`/admin/media/${id}`, { method: 'DELETE' }),
};
