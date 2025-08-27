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

// export function isoFromRecords(records: YearRecord[]): string {
//   for (let i = 0; i < records.length; i++) {
//     const iso = records[i]?.iso_code as string | undefined;
//     if (iso) return iso;
//   }
//   return 'N/A';
// }
