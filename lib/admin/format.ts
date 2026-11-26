/** "14:05" in Vietnam time, for conflict messages. */
export function hhmm(ts: string): string {
  return new Date(ts).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' });
}
