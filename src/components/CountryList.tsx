import type { CO2Data } from '../types/types';
import { latestPopulation } from '../utils/utils';
import { CountryTable } from './CountryTable';

export function CountryList({ data }: { data: CO2Data }) {
  const entries = Object.entries(data);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {entries.map(([code, { iso_code, data: records }]) => {
          const pop = latestPopulation(records);
          const isoToShow = iso_code || code || 'N/A';
          return (
            <div key={code} className="border rounded p-3">
              <div className="font-semibold">{code}</div>
              <div className="text-sm text-gray-600">
                Population (latest): {pop} • ISO: {isoToShow}
              </div>
              <CountryTable key={code} country={code} rows={records} />
            </div>
          );
        })}
      </div>

      {/* <div className="space-y-2">
        {entries.map(([code, { data: records }]) => (
          <CountryTable key={code} country={code} rows={records} />
        ))}
      </div> */}
    </div>
  );
}
