import { createProjectSchema, updateProjectSchema } from '@repo/contracts';

describe('content schemas', () => {
  it('applies defaults when creating', () => {
    const parsed = createProjectSchema.parse({ title: 'a project' });
    expect(parsed).toMatchObject({ status: 'draft', locale: 'en', body: '', technologyIds: [] });
  });

  it('never injects defaults when updating', () => {
    const parsed = updateProjectSchema.parse({ status: 'published' });
    expect(parsed).toEqual({ status: 'published' });
    expect('body' in parsed).toBe(false);
    expect('technologyIds' in parsed).toBe(false);
  });

  it('still validates the fields it receives', () => {
    expect(() => updateProjectSchema.parse({ slug: 'Not A Slug' })).toThrow();
  });
});
