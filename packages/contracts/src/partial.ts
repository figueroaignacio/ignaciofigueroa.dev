import { z } from 'zod';

function stripDefault(schema: z.ZodType): z.ZodType {
  return schema instanceof z.ZodDefault ? stripDefault(schema.def.innerType as z.ZodType) : schema;
}

/**
 * `.partial()` keeps `.default()` wrappers, so an absent field still parses to
 * its default and a PATCH would silently reset it. Update schemas therefore
 * drop the defaults: only the fields actually sent are written.
 */
export function toUpdateSchema<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  const shape = Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => [
      key,
      stripDefault(value as z.ZodType).optional(),
    ]),
  );
  return z.object(shape) as z.ZodObject<{
    [K in keyof T]: z.ZodOptional<z.ZodType<z.output<T[K]> | undefined>>;
  }>;
}
