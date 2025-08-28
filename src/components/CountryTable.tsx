import { useColumns } from '../hooks/useColumns';
import { formatVal } from '../utils/utils';
import type { YearRecord } from '../types/types';
import { useMemo } from 'react';

type CountryTableProps = {
  country: string;
  rows: YearRecord[];
};

export function CountryTable({ country, rows }: CountryTableProps) {
  const { base, extra } = useColumns();
  const allColumns = useMemo(() => [...base, ...extra], [base, extra]);
  const sortedRows = useMemo(
    () => [...rows].sort((a, b) => a.year - b.year),
    [rows]
  );

  return (
    <details className="border rounded">
      <summary className="cursor-pointer px-3 py-2 font-medium">
        Data for {country}
      </summary>
      <div className="p-3 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              {allColumns.map((c) => (
                <th key={c} className="border px-2 py-1 text-left capitalize">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((r, idx) => (
              <tr key={idx}>
                {allColumns.map((c) => (
                  <td key={c} className="border px-2 py-1">
                    {r[c] !== undefined ? formatVal(r[c]) : 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
