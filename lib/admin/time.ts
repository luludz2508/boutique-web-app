// Pure timestamp helpers, safe for the browser (no Node imports).

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

/** The newest of several Postgres timestamps, returned unchanged (full precision) so it can be sent back as a token. */
export function latestTimestamp(list: string[]): string {
  return list.reduce((a, b) => (isStale(a, b) ? b : a));
}
