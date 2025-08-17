'use client';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  selectSelectedList,
  selectSelectedCount,
  clearAllSelected,
} from '../lib/slices/selectedItemsSlice';
import type { Character } from '../types/types';
import { toCsv } from '../utils/toCsv';

const EXPORT_FIELDS = [
  'uid',
  'name',
] as const satisfies readonly (keyof Character)[];

export function SelectedFlyout() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectSelectedList);
  const count = useAppSelector(selectSelectedCount);

  if (count === 0) return null;

  const handleDownload = () => {
    const csv = toCsv<Character, typeof EXPORT_FIELDS>(items, EXPORT_FIELDS);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${count}_items.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999,
        background: '#333',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      <span>
        {count} item{count > 1 ? 's' : ''} selected
      </span>
      <button onClick={() => dispatch(clearAllSelected())}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}
