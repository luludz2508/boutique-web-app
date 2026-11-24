// Dev-only preview of the ink building blocks. Deleted in the cleanup task.
import { BrushStroke, DrumFace, FretBand, FretCorner, InkArt, InkCursor, PaperFrame, Reveal, Seal } from '@/components/ink';

const PHOTO =
  'https://hgpthqkuinupxhzkbtxn.supabase.co/storage/v1/object/public/product-images/haravan/108dtmm_ngoc_1_1c524365793f4a1ba1a903bb6fae95de.jpg';

export default function InkPreview() {
  return (
    <main className="space-y-16 px-[6vw] pb-24 pt-28 text-ink">
      <section className="relative h-72 overflow-hidden">
        <InkCursor />
        <div className="ink-art absolute inset-x-0 bottom-0">
          <img src="/ink/hero-mountains-near.webp" alt="" className="w-full" />
        </div>
        <h1 className="relative font-display text-6xl font-light">
          <span className="ink-word">Hương</span> <span className="ink-word" style={{ animationDelay: '300ms' }}>
            của
          </span>
          <span className="relative ml-4 inline-block">
            <BrushStroke variant="gold" animate delayMs={600} className="absolute -left-2 top-1/2 -z-10 w-[110%]" />
            núi rừng
          </span>
        </h1>
      </section>

      <section className="flex flex-wrap items-center gap-10">
        <Seal size="lg" stamp delayMs={500} />
        <Seal size="lg" className="!w-24" />
        <Seal />
        <Seal className="!h-7 !w-7" />
        <InkArt src="/ink/moon-hills.webp" feather="radial" className="w-64" />
        <BrushStroke variant="ink" className="w-52" />
      </section>

      <section className="flex items-center gap-10">
        <button className="relative bg-ink px-8 py-4 text-xs uppercase tracking-[.18em] text-paper">
          <FretCorner className="absolute -left-1 -top-1 h-3 w-3" />
          <FretCorner className="absolute -bottom-1 -right-1 h-3 w-3 rotate-180" />
          Xem sản phẩm
        </button>
        <div className="w-80">
          <FretBand />
          <p className="py-3 font-display text-2xl">Trầm tự nhiên ◆ Khánh Hòa</p>
          <FretBand flip />
        </div>
        <DrumFace className="w-40 opacity-30" />
      </section>

      <section className="grid max-w-3xl grid-cols-2 gap-8">
        {[0, 1].map((i) => (
          <Reveal key={i} delayMs={i * 120}>
            <a className="group block cursor-pointer">
              <PaperFrame hoverLift>
                <img src={PHOTO} alt="Vòng trầm" className="aspect-square w-full scale-[1.12] object-cover" />
              </PaperFrame>
              <p className="mt-4 font-display text-xl">Vòng trầm hương 108 hạt tứ diệp bảo</p>
            </a>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
