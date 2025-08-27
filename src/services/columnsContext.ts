import { createContext } from 'react';
import type { BaseColumn } from '../types/columnsTypes';

type ColumnsContextValue = {
  base: BaseColumn[];
  extra: string[];
  setExtra: (cols: string[]) => void;
};

export const ColumnsContext = createContext<ColumnsContextValue | null>(null);
