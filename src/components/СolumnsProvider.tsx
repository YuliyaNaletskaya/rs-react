import { useMemo, useState } from 'react';
import { baseColumns } from '../types/columnsTypes';
import { ColumnsContext } from '../services/columnsContext';

export function ColumnsProvider({ children }: { children: React.ReactNode }) {
  const [extra, setExtra] = useState<string[]>([]);
  const value = useMemo(
    () => ({ base: [...baseColumns], extra, setExtra }),
    [extra]
  );
  return (
    <ColumnsContext.Provider value={value}>{children}</ColumnsContext.Provider>
  );
}
