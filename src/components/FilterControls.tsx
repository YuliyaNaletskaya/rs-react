interface Props {
  selectedYear: number | null;
  setSelectedYear: (y: number | null) => void;
  selectedRegion: string;
  setSelectedRegion: (r: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  allYears: number[];
  allRegions: string[];
  onOpenModal: () => void;
}

export function FilterControls({
  selectedYear,
  setSelectedYear,
  selectedRegion,
  setSelectedRegion,
  searchQuery,
  setSearchQuery,
  allYears,
  allRegions,
  onOpenModal,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">CO₂ Emissions</h1>
      <div className="flex gap-4">
        <input
          type="text"
          className="px-2 py-1 border rounded"
          placeholder="Search country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="px-2 py-1 border rounded"
          value={selectedYear ?? ''}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          <option value="">Latest year</option>
          {allYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className="px-2 py-1 border rounded"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="All">All regions</option>
          {allRegions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white"
          onClick={onOpenModal}
        >
          Select columns
        </button>
      </div>
    </div>
  );
}
