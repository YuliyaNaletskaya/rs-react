export type YearRecord = {
  year: number;
  population?: number;
} & Record<string, number | undefined>;

export type CountryData = {
  iso_code?: string;
  data: YearRecord[];
};

export type CO2Data = Record<string, CountryData>;
