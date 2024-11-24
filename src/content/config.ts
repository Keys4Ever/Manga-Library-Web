import { defineCollection, z } from 'astro:content';

const versions = defineCollection({
  type: 'content',
  schema: z.object({
    version: z.string(),
    date: z.string(),
    features: z.array(z.string()).optional(),
    bugfixes: z.array(z.string()).optional(),
    improvements: z.array(z.string()).optional(),
  }),
});

export const collections = { versions };