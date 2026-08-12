import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Society — living positions on the world. Versioned, never deleted.
const society = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/society' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(['forming', 'held', 'revised']),
    summary: z.string().optional(),
  }),
});

// Writing — essays and articles.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    topic: z.enum(['work', 'citizen']).optional(),
  }),
});

// Readings — finished books, with a note on what stuck.
const readings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/readings' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    finished: z.coerce.date(),
    note: z.string().optional(),
  }),
});

// Reading list — the queue.
const readlist = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/readlist' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    why: z.string().optional(),
  }),
});

export const collections = { society, articles, readings, readlist };
