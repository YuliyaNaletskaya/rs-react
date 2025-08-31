import { Suspense, useMemo } from 'react';
import { createCO2Resource } from './services/co2Resource';
import { ColumnsProvider } from './components/СolumnsProvider';
import { CO2DataView } from './components/CO2DataView';
// import { CountryList } from './components/CountryList';
// import { ColumnsModal } from './components/ColumnsModal';
// import type { CO2Data } from './types/types';
// import { regionMap } from './types/regionMap';
// import { latestPopulation, populationByYear, toNumeric } from './utils/utils';

// function CO2DataView({ resource }: { resource: { read(): CO2Data } }) {
//   const data = resource.read();
//   const [open, setOpen] = useState(false);
//   const [selectedYear, setSelectedYear] = useState<number | null>(null);
//   const [selectedRegion, setSelectedRegion] = useState<string>('All');
//   const [searchQuery, setSearchQuery] = useState('');

//   const allYears = useMemo(() => {
//     const yearsSet = new Set<number>();
//     Object.values(data).forEach(({ data: records }) => {
//       records.forEach((r) => {
//         if (r.year) yearsSet.add(r.year);
//       });
//     });
//     return Array.from(yearsSet).sort((a, b) => b - a);
//   }, [data]);

//   const allRegions = useMemo(() => {
//     const regionSet = new Set<string>();
//     Object.values(regionMap).forEach((region) => regionSet.add(region));
//     return Array.from(regionSet).sort();
//   }, []);

//   const filteredData = useMemo(() => {
//     const result: CO2Data = {};

//     for (const [code, entry] of Object.entries(data)) {
//       const region = regionMap[entry.iso_code ?? code];
//       const matchesRegion =
//         selectedRegion === 'All' || region === selectedRegion;
//       const matchesSearch =
//         searchQuery.trim() === '' ||
//         code.toLowerCase().includes(searchQuery.trim().toLowerCase());

//       if (matchesRegion && matchesSearch) {
//         result[code] = entry;
//       }
//     }

//     return result;
//   }, [data, selectedRegion, searchQuery]);

//   const sortedData = useMemo(() => {
//     const entries = Object.entries(filteredData);

//     const sorted = entries.sort(([, a], [, b]) => {
//       const popA = selectedYear
//         ? populationByYear(a.data, selectedYear)
//         : latestPopulation(a.data);
//       const popB = selectedYear
//         ? populationByYear(b.data, selectedYear)
//         : latestPopulation(b.data);

//       return toNumeric(popB) - toNumeric(popA);
//     });

//     return Object.fromEntries(sorted);
//   }, [filteredData, selectedYear]);

//   return (
//     <>
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">CO₂ Emissions</h1>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             className="px-2 py-1 border rounded"
//             placeholder="Search country..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <select
//             className="px-2 py-1 border rounded"
//             value={selectedYear ?? ''}
//             onChange={(e) => setSelectedYear(Number(e.target.value))}
//           >
//             <option value="">Latest year</option>
//             {allYears.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//           <select
//             className="px-2 py-1 border rounded"
//             value={selectedRegion}
//             onChange={(e) => setSelectedRegion(e.target.value)}
//           >
//             <option value="All">All regions</option>
//             {allRegions.map((region) => (
//               <option key={region} value={region}>
//                 {region}
//               </option>
//             ))}
//           </select>
//           <button
//             className="px-3 py-1 rounded bg-blue-600 text-white"
//             onClick={() => setOpen(true)}
//           >
//             Select columns
//           </button>
//         </div>
//       </div>

//       <CountryList data={sortedData} selectedYear={selectedYear} />
//       <ColumnsModal isOpen={open} onClose={() => setOpen(false)} data={data} />
//     </>
//   );
// }

export default function App() {
  const resource = useMemo(
    () =>
      createCO2Resource(
        'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
      ),
    []
  );

  return (
    <ColumnsProvider>
      <div className="p-4">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          }
        >
          <CO2DataView resource={resource} />
        </Suspense>
      </div>
    </ColumnsProvider>
  );
}
