import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    screenshot: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    domain: z.enum(['music', 'engineering', 'both']).default('engineering'),
  }),
});

const engagements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/engagements' }),
  schema: z.object({
    venue: z.string(),
    role: z.string(),
    location: z.string().optional(),
    period: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { projects, engagements };
