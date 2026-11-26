import { isDeepStrictEqual } from 'node:util';

export type Changes = Record<string, { from: unknown; to: unknown }>;

/** Fields whose value differs between two snapshots, for the audit log. */
export function diffChanges(before: Record<string, unknown>, after: Record<string, unknown>): Changes {
  const out: Changes = {};
  for (const key of new Set([...Object.keys(before), ...Object.keys(after)])) {
    if (!isDeepStrictEqual(before[key], after[key])) out[key] = { from: before[key], to: after[key] };
  }
  return out;
}

/** Microseconds since epoch — Postgres timestamps carry 6 fractional digits, JS Dates only 3. */
function toMicros(ts: string): number {
  const frac = /\.(\d+)/.exec(ts)?.[1] ?? '';
  const micros = Number((frac + '000000').slice(3, 6));
  const ms = Date.parse(ts.replace(/\.(\d+)/, `.${(frac + '000').slice(0, 3)}`));
  return ms * 1000 + micros;
}

/** True when the row in the database changed after the editor loaded it. */
export function isStale(expectedUpdatedAt: string, actualUpdatedAt: string): boolean {
  return toMicros(actualUpdatedAt) > toMicros(expectedUpdatedAt);
}
