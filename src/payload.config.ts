import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { Contributions } from './shared/collections/Contributions';
import { Education } from './shared/collections/Education';
import { Experience } from './shared/collections/Experience';
import { Media } from './shared/collections/Media';
import { ProjectLabels } from './shared/collections/ProjectLabels';
import { Projects } from './shared/collections/Projects';
import { TechStack } from './shared/collections/TechStack';
import { Testimonials } from './shared/collections/Testimonials';
import { Users } from './shared/collections/Users';

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
