import type { YearRecord } from '../types/types';

export function formatVal(val: number | string | null | undefined): string {
  return val === null || val === undefined ? 'N/A' : String(val);
}

export function latestPopulation(records: YearRecord[]): string | number {
  for (let i = records.length - 1; i >= 0; i--) {
    if (
      records[i]?.population !== undefined &&
      records[i]?.population !== null
    ) {
      return formatVal(records[i].population);
    }
  }
  return 'N/A';
}

export function populationByYear(
  records: { year: number; population?: number }[],
  year: number
): number | null {
  const entry = records.find((r) => r.year === year);
  return entry?.population ?? null;
}

export function toNumeric(value: number | string | null): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}
