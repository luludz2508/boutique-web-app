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

export { isStale, latestTimestamp } from './time';
