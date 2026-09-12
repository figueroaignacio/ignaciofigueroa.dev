import type { ContentStatus, Locale } from './common.js';

type Timestamps = { createdAt: string; updatedAt: string };

export type TechIconDto = Timestamps & {
  id: string;
  name: string;
  svg: string;
};

export type TechStackDto = Timestamps & {
  id: string;
  name: string;
  iconId: string | null;
  icon: TechIconDto | null;
};

export type MediaDto = Timestamps & {
  id: string;
  bucket: string;
  path: string;
  url: string;
  alt: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
};

export type ProjectCategoryDto = Timestamps & {
  id: string;
  label: string;
  slug: string;
};

export type ProjectLabelDto = Timestamps & {
  id: string;
  label: string;
};

export type ProjectDto = Timestamps & {
  id: string;
  locale: Locale;
  status: ContentStatus;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  body: string;
  icon: string | null;
  imageId: string | null;
  image: MediaDto | null;
  videoUrl: string | null;
  repository: string | null;
  demo: string | null;
  isCommercial: boolean;
  order: number;
  publishedAt: string | null;
  technologies: TechStackDto[];
  labels: ProjectLabelDto[];
  categories: ProjectCategoryDto[];
};

export type ExperienceDto = Timestamps & {
  id: string;
  locale: Locale;
  status: ContentStatus;
  title: string;
  company: string;
  location: string | null;
  tasks: string[];
  technologies: string[];
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  link: string | null;
  order: number;
};

export type EducationDto = Timestamps & {
  id: string;
  locale: Locale;
  status: ContentStatus;
  title: string;
  institution: string;
  location: string | null;
  description: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  certificateUrl: string | null;
  highlight: boolean;
  order: number;
};

export type TestimonialDto = Timestamps & {
  id: string;
  locale: Locale;
  status: ContentStatus;
  name: string;
  role: string;
  company: string | null;
  avatar: string | null;
  testimonial: string;
  date: string | null;
  order: number;
};

export type PullRequestDto = { url: string; label: string | null };

export type ContributionDto = Timestamps & {
  id: string;
  locale: Locale;
  status: ContentStatus;
  title: string;
  description: string;
  repository: string;
  fork: string | null;
  pullRequests: PullRequestDto[];
  order: number;
  technologies: TechStackDto[];
};
