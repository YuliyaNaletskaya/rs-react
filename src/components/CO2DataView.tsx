import { useDeferredValue, useState } from 'react';
import type { CO2Data } from '../types/types';
import { FilterControls } from './FilterControls';
import { CountryList } from './CountryList';
import { ColumnsModal } from './ColumnsModal';
import { useFilteredData } from '../hooks/useFilteredData';

export function CO2DataView({ resource }: { resource: { read(): CO2Data } }) {
  const data = resource.read();
  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const deferredSearch = useDeferredValue(searchQuery);

  const { sortedData, allYears, allRegions } = useFilteredData({
    data,
    selectedYear,
    selectedRegion,
    searchQuery: deferredSearch,
  });

  return (
    <>
      <FilterControls
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        allYears={allYears}
        allRegions={allRegions}
        onOpenModal={() => setOpen(true)}
      />

      <CountryList data={sortedData} selectedYear={selectedYear} />
      <ColumnsModal isOpen={open} onClose={() => setOpen(false)} data={data} />
    </>
  );
}
