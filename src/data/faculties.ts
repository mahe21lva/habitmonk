// The faculty spine. Order here controls display order everywhere.
// `intro` is the short lead-in that sits above the book list on a faculty page —
// leave it empty until you write one; empty renders nothing (no "coming soon").
// The long-form faculty essay, when it exists, can live in `intro` as a short
// hook that links out to the full piece, or you can render it however you like
// in [faculty].astro.

export interface Faculty {
  slug: 'think' | 'learn' | 'do' | 'know-yourself' | 'be' | 'build';
  name: string;
  tagline: string;
  intro?: string;
}

export const faculties: Faculty[] = [
  { slug: 'think', name: 'Think', tagline: 'models, biases, systems, reasoning' },
  { slug: 'learn', name: 'Learn', tagline: 'reading, notes, skill acquisition' },
  { slug: 'do', name: 'Do', tagline: 'discipline, habits, follow-through' },
  { slug: 'know-yourself', name: 'Know Yourself', tagline: 'metacognition, self-awareness' },
  { slug: 'be', name: 'Be', tagline: 'philosophy, meaning, the inner life' },
  { slug: 'build', name: 'Build', tagline: 'startups, platforms, venture' },
];

export const facultyBySlug = Object.fromEntries(
  faculties.map((f) => [f.slug, f]),
) as Record<Faculty['slug'], Faculty>;
