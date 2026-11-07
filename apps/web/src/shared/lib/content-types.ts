import type { ProjectDto } from '@repo/contracts';

export type {
  ContentStatus,
  ContributionDto as Contribution,
  EducationDto as Education,
  ExperienceDto as Experience,
  Locale as ContentLocale,
  MediaDto as Media,
  ProjectCategoryDto as ProjectCategory,
  ProjectDto as Project,
  ProjectLabelDto as ProjectLabel,
  PullRequestDto as PullRequest,
  TechIconDto as TechIcon,
  TechStackDto as TechStack,
  TestimonialDto as Testimonial,
} from '@repo/contracts';

export type CategoryProjects = {
  category: string;
  projects: ProjectDto[];
};
