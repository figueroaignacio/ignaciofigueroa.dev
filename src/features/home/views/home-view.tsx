import { Suspense } from 'react';
import { ContributionsContainer } from '../containers/contributions-container';
import { EducationContainer } from '../containers/education-container';
import { ExperienceContainer } from '../containers/experience-container';
import { GithubStatsContainer } from '../containers/github-stats-container';
import { NachUiCtaContainer } from '../containers/nach-ui-cta-container';
import { ProjectsContainer } from '../containers/projects-container';
import { TestimonialsContainer } from '../containers/testimonials-container';
import { AboutSection } from '../ui/about-section';
import { CertificationsSection } from '../ui/certifications-section';
import { ContactSection } from '../ui/contact-section';
import { ContributionsSkeleton } from '../ui/contributions-skeleton';
import { CTACurriculum } from '../ui/cta-curriculum';
import { GithubStatsSkeleton } from '../ui/github-stats-skeleton';
import { HomeHero } from '../ui/home-hero';
import { Interests } from '../ui/interests';
import { NachUiCtaSkeleton } from '../ui/nach-ui-cta-skeleton';
import { ProjectsSkeleton } from '../ui/projects-skeleton';
import { TechStack } from '../ui/tech-stack';
import { TestimonialsSkeleton } from '../ui/testimonials-skeleton';
import { TimelineSkeleton } from '../ui/timeline-skeleton';

export function HomeView() {
  return (
    <div className="space-y-14 mb-12">
      <HomeHero />
      <Suspense fallback={<TimelineSkeleton />}>
        <ExperienceContainer />
      </Suspense>
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContainer />
      </Suspense>
      <Suspense fallback={<TimelineSkeleton />}>
        <EducationContainer />
      </Suspense>
      <CertificationsSection />
      <TechStack />
      <Interests />
      <AboutSection />
      <Suspense fallback={<ContributionsSkeleton />}>
        <ContributionsContainer />
      </Suspense>
      <Suspense fallback={<GithubStatsSkeleton />}>
        <GithubStatsContainer />
      </Suspense>
      <Suspense fallback={<NachUiCtaSkeleton />}>
        <NachUiCtaContainer />
      </Suspense>
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsContainer />
      </Suspense>
      <CTACurriculum />
      <ContactSection />
    </div>
  );
}
