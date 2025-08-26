export function toCsv<T, K extends readonly (keyof T)[]>(
  rows: readonly T[],
  keys: K
): string {
  if (rows.length === 0 || keys.length === 0) return '';

  const escape = (value: unknown) =>
    `"${String(value ?? '').replace(/"/g, '""')}"`;

  const header = keys.map(String).join(',');
  const lines = rows.map((row) =>
    keys.map((k) => escape(row[k] as unknown)).join(',')
  );

  return [header, ...lines].join('\r\n');
}
