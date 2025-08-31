import { useMemo } from 'react';
import { latestPopulation, populationByYear, toNumeric } from '../utils/utils';
import { regionMap } from '../types/regionMap';
import type { CO2Data } from '../types/types';

interface Params {
  data: CO2Data;
  selectedYear: number | null;
  selectedRegion: string;
  searchQuery: string;
}

export function useFilteredData({
  data,
  selectedYear,
  selectedRegion,
  searchQuery,
}: Params) {
  const allYears = useMemo(() => {
    const yearsSet = new Set<number>();
    Object.values(data).forEach(({ data: records }) => {
      records.forEach((r) => {
        if (r.year) yearsSet.add(r.year);
      });
    });
    return Array.from(yearsSet).sort((a, b) => b - a);
  }, [data]);

  const allRegions = useMemo(() => {
    const regionSet = new Set<string>();
    Object.values(regionMap).forEach((region) => regionSet.add(region));
    return Array.from(regionSet).sort();
  }, []);

  const filteredData = useMemo(() => {
    const result: CO2Data = {};

    for (const [code, entry] of Object.entries(data)) {
      const region = regionMap[entry.iso_code ?? code];
      const matchesRegion =
        selectedRegion === 'All' || region === selectedRegion;
      const matchesSearch =
        searchQuery.trim() === '' ||
        code.toLowerCase().includes(searchQuery.trim().toLowerCase());

      if (matchesRegion && matchesSearch) {
        result[code] = entry;
      }
    }

    return result;
  }, [data, selectedRegion, searchQuery]);

  const sortedData = useMemo(() => {
    const entries = Object.entries(filteredData);

    const sorted = entries.sort(([, a], [, b]) => {
      const popA = selectedYear
        ? populationByYear(a.data, selectedYear)
        : latestPopulation(a.data);
      const popB = selectedYear
        ? populationByYear(b.data, selectedYear)
        : latestPopulation(b.data);

      return toNumeric(popB) - toNumeric(popA);
    });

    return Object.fromEntries(sorted);
  }, [filteredData, selectedYear]);

  return { sortedData, allYears, allRegions };
}
