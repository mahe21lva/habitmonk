import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { toFinished } from './data/finished';

// Society — living positions on the world. Versioned, never deleted.
const society = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/society' }),
  schema: z.object({
    title: z.string(),
    // "2020-12" (month only) or a full date like 2026-06-15 — see src/data/finished.ts
    date: z.union([z.string(), z.number(), z.date()]).transform((v) => toFinished(v)!),
    status: z.enum(['forming', 'held', 'revised']),
    summary: z.string().optional(),
    evolution: z.string().optional(), // how this view has changed over time
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

// Readings — finished books, grouped by the faculty they train.
// The markdown BODY (below the frontmatter) is the full essay, when a book
// earns one. `note` stays the short take shown in every list.
const readings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/readings' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    faculty: z.enum(['think', 'learn', 'do', 'know-yourself', 'be', 'build']).optional(), // the curated shelf
    subject: z.string().optional(), // e.g. History, Politics, AI — for books outside the faculties
    subthread: z.string().optional(),    // e.g. the Krishnamurti thread under Be
    note: z.string().optional(),
    // "2019", "2016, 2018", "2024-10" or a full date — see src/data/finished.ts
    finished: z.union([z.string(), z.number(), z.date()]).optional().transform(toFinished),
  }),
});

// Reading list — the queue.
const readlist = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/readlist' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    why: z.string().optional(),
    month: z.string().regex(/^\d{4}-\d{2}$/).optional(), // "2026-11" — when I plan to read it
  }),
});

export const collections = { society, articles, readings, readlist };
