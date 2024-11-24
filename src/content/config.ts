import { defineCollection, z } from 'astro:content';

const versions = defineCollection({
  type: 'content',
  schema: z.object({
    version: z.string(),
    date: z.string(),
    bugfixes: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    improvements: z.array(z.string()).optional(),
  }),
});

export const collections = { versions };