export type YearRecord = {
  year: number;
  population?: number;
  // co2?: number;
  // co2_per_capita?: number;
  // [key: string]: number | string | undefined;
} & Record<string, number | undefined>;

export type CountryData = {
  iso_code?: string;
  data: YearRecord[];
};

export type CO2Data = Record<string, CountryData>;
