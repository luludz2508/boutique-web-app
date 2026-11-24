import VideoPlayer from '@/components/VideoPlayer';
import { InkArt, PaperFrame, Reveal } from '@/components/ink';
import { SectionHeading } from './SectionHeading';

export function Story() {
  return (
    <section id="story" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-[7vw] md:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-[6vw]">
        <Reveal>
          <SectionHeading eyebrow="Di sản">
            Bốn mươi năm
            <br />
            giữ một mùi hương
          </SectionHeading>
          <div className="space-y-5 leading-[1.9] text-ink-2">
            <p>
              Từ năm 1985, chúng tôi đã âm thầm vun đắp nghề trầm hương. Khởi nguồn từ một xưởng nhỏ, nay đã trở thành
              nơi lưu giữ tinh hoa nghệ thuật, nơi kỹ thuật truyền thống gặp gỡ tầm nhìn đương đại.
            </p>
            <p>
              Mỗi tác phẩm chúng tôi tạo ra đều mang trong mình lời thì thầm của truyền thống, sự chính xác của đổi mới
              hiện đại, và tâm hồn của nghệ nhân chân chính.
            </p>
          </div>
          <blockquote className="mt-9 border-l border-gold pl-6">
            <p className="font-display text-2xl italic leading-normal text-ink sm:text-[26px]">
              &ldquo;Trong từng thớ gỗ, chúng tôi tìm thấy câu chuyện chờ được kể.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-ink-2">Nguyễn Văn Sơn – Nghệ nhân trưởng</footer>
          </blockquote>
        </Reveal>

        <Reveal delayMs={200} className="justify-self-center">
          <InkArt src="/ink/moon-hills.webp" feather="radial" className="w-full max-w-[520px]" />
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-16 max-w-[320px]">
        <PaperFrame>
          <div className="relative aspect-[9/16] w-full bg-paper-2">
            {/* the old remote copy lived in a Supabase project that no longer resolves; serve the local file */}
            <VideoPlayer src="/tramhuong-sonhong/master-video-1.mp4" />
          </div>
        </PaperFrame>
        <p className="mt-4 text-center text-sm text-ink-2">Nghệ nhân Sơn Hồng chế tác trầm</p>
      </Reveal>
    </section>
  );
}
