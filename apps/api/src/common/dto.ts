import {
  adminListQuerySchema,
  createContributionSchema,
  createEducationSchema,
  createExperienceSchema,
  createProjectCategorySchema,
  createProjectLabelSchema,
  createProjectSchema,
  createTechIconSchema,
  createTechStackSchema,
  createTestimonialSchema,
  listProjectsQuerySchema,
  localeQuerySchema,
  loginSchema,
  updateContributionSchema,
  updateEducationSchema,
  updateExperienceSchema,
  updateMediaSchema,
  updateProjectCategorySchema,
  updateProjectLabelSchema,
  updateProjectSchema,
  updateTechIconSchema,
  updateTechStackSchema,
  updateTestimonialSchema,
} from '@repo/contracts';
import { createZodDto } from 'nestjs-zod';

export class LoginDto extends createZodDto(loginSchema) {}
export class LocaleQueryDto extends createZodDto(localeQuerySchema) {}
export class AdminListQueryDto extends createZodDto(adminListQuerySchema) {}

export class CreateTechIconDto extends createZodDto(createTechIconSchema) {}
export class UpdateTechIconDto extends createZodDto(updateTechIconSchema) {}
export class CreateTechStackDto extends createZodDto(createTechStackSchema) {}
export class UpdateTechStackDto extends createZodDto(updateTechStackSchema) {}

export class CreateProjectCategoryDto extends createZodDto(createProjectCategorySchema) {}
export class UpdateProjectCategoryDto extends createZodDto(updateProjectCategorySchema) {}
export class CreateProjectLabelDto extends createZodDto(createProjectLabelSchema) {}
export class UpdateProjectLabelDto extends createZodDto(updateProjectLabelSchema) {}

export class CreateProjectDto extends createZodDto(createProjectSchema) {}
export class UpdateProjectDto extends createZodDto(updateProjectSchema) {}
export class ListProjectsQueryDto extends createZodDto(listProjectsQuerySchema) {}

export class CreateExperienceDto extends createZodDto(createExperienceSchema) {}
export class UpdateExperienceDto extends createZodDto(updateExperienceSchema) {}

export class CreateEducationDto extends createZodDto(createEducationSchema) {}
export class UpdateEducationDto extends createZodDto(updateEducationSchema) {}

export class CreateTestimonialDto extends createZodDto(createTestimonialSchema) {}
export class UpdateTestimonialDto extends createZodDto(updateTestimonialSchema) {}

export class CreateContributionDto extends createZodDto(createContributionSchema) {}
export class UpdateContributionDto extends createZodDto(updateContributionSchema) {}

export class UpdateMediaDto extends createZodDto(updateMediaSchema) {}
