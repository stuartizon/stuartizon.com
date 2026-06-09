import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    youtubeUrl: z.string().url().optional(),
    screenshot: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    domain: z.enum(['music', 'engineering', 'both']).default('engineering'),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ogImage: image().optional(),
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

export const collections = { projects, engagements, blog };
