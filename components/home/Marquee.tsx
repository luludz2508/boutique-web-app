import { FretBand } from '@/components/ink';

const ITEMS = ['Trầm tự nhiên', 'Khánh Hòa', 'Từ năm 1985', 'Vòng trầm', 'Nhang nụ', 'Tượng trầm'];

export function Marquee() {
  const row = ITEMS.flatMap((t) => [
    <span key={t} className="mx-6 sm:mx-7">
      {t}
    </span>,
    <span key={`${t}-d`} aria-hidden className="align-middle text-sm text-gold">
      ◆
    </span>,
  ]);
  return (
    <div className="ink-marquee relative overflow-hidden whitespace-nowrap py-5" aria-label={ITEMS.join(', ')}>
      <FretBand className="absolute inset-x-0 top-0" />
      <div className="ink-marquee-track font-display text-2xl font-light text-ink sm:text-[26px]" aria-hidden>
        {row}
        {row.map((el, i) => (
          <span key={`dup-${i}`}>{el}</span>
        ))}
      </div>
      <FretBand flip className="absolute inset-x-0 bottom-0" />
    </div>
  );
}
