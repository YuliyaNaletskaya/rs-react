import { describe, expect, it } from 'vitest';
import { toCsv } from './toCsv';

describe('toCsv', () => {
  it('returns empty string for empty rows or keys', () => {
    expect(toCsv([], ['name'])).toBe('');
    expect(toCsv([{ name: 'Luke' }], [])).toBe('');
  });

  it('generates CSV with headers and escaped values', () => {
    const rows = [
      { name: 'Luke', role: 'Jedi' },
      { name: 'Leia', role: 'Rebel, Leader' },
      { name: 'Han', role: 'Smuggler "Captain"' },
    ] as const;

    const keys = ['name', 'role'] as const;

    const result = toCsv(rows, keys);

    expect(result).toBe(
      [
        'name,role',
        '"Luke","Jedi"',
        '"Leia","Rebel, Leader"',
        '"Han","Smuggler ""Captain"""',
      ].join('\r\n')
    );
  });

  it('handles null and undefined values gracefully', () => {
    const rows = [
      { name: 'Yoda', role: null },
      { name: 'Chewbacca', role: undefined },
    ] as const;

    const keys = ['name', 'role'] as const;

    const result = toCsv(rows, keys);

    expect(result).toBe(
      ['name,role', '"Yoda",""', '"Chewbacca",""'].join('\r\n')
    );
  });
});
