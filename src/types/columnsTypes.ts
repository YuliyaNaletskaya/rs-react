export const baseColumns = [
  'year',
  'population',
  'co2',
  'co2_per_capita',
] as const;
export type BaseColumn = (typeof baseColumns)[number];
