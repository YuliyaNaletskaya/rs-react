import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useColumns } from '../hooks/useColumns';
import type { CO2Data } from '../types/types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: CO2Data;
};

export function ColumnsModal({ isOpen, onClose, data }: Props) {
  const { base, extra, setExtra } = useColumns();
  const [local, setLocal] = useState<string[]>(extra);

  useEffect(() => {
    if (isOpen) setLocal(extra);
  }, [isOpen, extra]);

  const available = useMemo(() => {
    const keys = new Set<string>();
    for (const country of Object.values(data)) {
      const first = country.data?.[0];
      if (first) Object.keys(first).forEach((key) => keys.add(key));
    }

    base.forEach((key) => keys.delete(key));

    return Array.from(keys).sort();
  }, [data, base]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          Select additional columns
        </h2>
        <div className="max-h-80 overflow-auto grid grid-cols-2 gap-2">
          {available.map((k) => (
            <label key={k} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={local.includes(k)}
                onChange={(e) =>
                  setLocal((prev) =>
                    e.target.checked
                      ? [...prev, k]
                      : prev.filter((x) => x !== k)
                  )
                }
              />
              <span>{k}</span>
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button className="px-3 py-1 rounded bg-gray-200" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white"
            onClick={() => {
              setExtra(local);
              onClose();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
