import { Suspense, useMemo, useState } from 'react';
import { createCO2Resource } from './services/co2Resource';
import { ColumnsProvider } from './components/СolumnsProvider';
import { CountryList } from './components/CountryList';
import { ColumnsModal } from './components/ColumnsModal';
import type { CO2Data } from './types/types';

function CO2DataView({ resource }: { resource: { read(): CO2Data } }) {
  const data = resource.read();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">CO₂ Emissions</h1>
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white"
          onClick={() => setOpen(true)}
        >
          Select columns
        </button>
      </div>

      <CountryList data={data} />
      <ColumnsModal isOpen={open} onClose={() => setOpen(false)} data={data} />
    </>
  );
}

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
