import { z } from 'zod';

function stripDefault(schema: z.ZodType): z.ZodType {
  return schema instanceof z.ZodDefault ? stripDefault(schema.def.innerType as z.ZodType) : schema;
}

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
