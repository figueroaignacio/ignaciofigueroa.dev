import 'dotenv/config';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { createDb } from '../src/client';
import { projectCategories, users } from '../src/schema';

async function main() {
  const { DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;
  if (!DATABASE_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('DATABASE_URL, ADMIN_EMAIL and ADMIN_PASSWORD are required');
  }

  const db = createDb(DATABASE_URL);
  const email = ADMIN_EMAIL.toLowerCase().trim();
  const passwordHash = await hash(ADMIN_PASSWORD, 12);

  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });

  if (existing) {
    await db
      .update(users)
      .set({ passwordHash, name: ADMIN_NAME ?? existing.name })
      .where(eq(users.id, existing.id));
    console.log(`Admin ${email} already existed, password updated.`);
  } else {
    await db.insert(users).values({ email, passwordHash, name: ADMIN_NAME ?? null, role: 'admin' });
    console.log(`Admin ${email} created.`);
  }

  const categories = [
    { label: 'Frontend', slug: 'frontend' },
    { label: 'Backend', slug: 'backend' },
    { label: 'AI', slug: 'ai' },
  ];

  for (const category of categories) {
    await db
      .insert(projectCategories)
      .values(category)
      .onConflictDoUpdate({ target: projectCategories.slug, set: { label: category.label } });
  }
  console.log('Project categories ensured.');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
