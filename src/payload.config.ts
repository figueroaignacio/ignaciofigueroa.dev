import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { Contributions } from './shared/collections/contributions';
import { Education } from './shared/collections/education';
import { Experience } from './shared/collections/experience';
import { Media } from './shared/collections/media';
import { ProjectLabels } from './shared/collections/project-labels';
import { Projects } from './shared/collections/projects';
import { TechIcon } from './shared/collections/tech-icons';
import { TechStack } from './shared/collections/tech-stack';
import { Testimonials } from './shared/collections/testimonials';
import { Users } from './shared/collections/users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Experience,
    Education,
    Projects,
    Media,
    TechStack,
    Testimonials,
    Contributions,
    ProjectLabels,
    TechIcon,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    push: false,
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
});
