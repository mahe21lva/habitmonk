// `finished` in a reading's frontmatter can be as precise as you remember it:
//   finished: "2019"         → "Finished 2019"
//   finished: "2016, 2018"   → "Finished 2016, 2018"   (read more than once; sorts by the last)
//   finished: "2024-10"      → "Finished October 2024"
//   finished: 2026-06-30     → "Finished June 2026" (lists) / "30 June 2026" (book page)
export interface Finished {
  date: Date;      // for sorting
  label: string;   // shown in lists
  long: string;    // shown on the book's own page
}

const monthYear = (d: Date) =>
  new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
const dayMonthYear = (d: Date) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);

export function toFinished(raw: string | number | Date | undefined): Finished | undefined {
  if (raw === undefined || raw === null || raw === '') return undefined;
  if (raw instanceof Date) return { date: raw, label: monthYear(raw), long: dayMonthYear(raw) };

  const s = String(raw).trim();
  if (/^\d{4}(\s*,\s*\d{4})*$/.test(s)) {
    const years = s.split(',').map((y) => y.trim());
    const last = Number(years[years.length - 1]);
    const label = years.join(', ');
    return { date: new Date(Date.UTC(last, 0, 1)), label, long: label };
  }
  const ym = s.match(/^(\d{4})-(\d{1,2})$/);
  if (ym) {
    const d = new Date(Date.UTC(Number(ym[1]), Number(ym[2]) - 1, 1));
    return { date: d, label: monthYear(d), long: monthYear(d) };
  }
  const d = new Date(s);
  if (isNaN(d.getTime())) throw new Error(`Can't read finished date "${s}". Use 2019, 2024-10 or 2024-10-15.`);
  return { date: d, label: monthYear(d), long: dayMonthYear(d) };
}
