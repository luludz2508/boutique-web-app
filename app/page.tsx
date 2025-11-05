import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  SlideInUp,
} from '@/components/animations/viewport-animations';
import Image from 'next/image';
import VideoPlayer from '@/components/VideoPlayer';
import { CollectionContent } from './collection/page';
import { GalleryContent } from './gallery/page';
import { Footer } from '@/components/Footer';
import { BackgroundImage } from '@/components/ui/background-image';
import content from '@/config/content';

export default function HomePage() {
  const currentLocale = 'vi';
  const homeNavItem = content[currentLocale].navigation.find((item) => item.id === 'home');
  const homeBackground = homeNavItem?.background;

  return (
    <div className="space-y-0 w-full">
      {/* History/Heritage Section */}
      <section
        id="history"
        className="min-h-screen flex flex-col justify-center w-full relative bg-neutral-50"
        style={{ zIndex: 5 }}
      >
        <BackgroundImage
          config={
            homeBackground
              ? {
                  ...homeBackground,
                  size: 'auto',
                  repeat: true,
                }
              : undefined
          }
          className="absolute inset-0"
        />
        {/* Hero Image Section */}
        <section className="w-full relative z-10">
          <div className="relative w-full flex items-center justify-center">
            <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
              <Image
                src="/tramhuong-sonhong/hero.png"
                alt="Hero"
                width={1920}
                height={1080}
                priority
                className="w-full h-auto object-contain mt-12"
                sizes="100vw"
                style={{ zIndex: 10 }}
              />
            </div>
          </div>
        </section>
        <div className="max-w-7xl py-10 px-4 lg:px-12 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-20 py-16">
            <FadeInLeft>
              <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
                Di Sản Văn Hóa
              </h2>
              <div className="space-y-6 text-neutral-600 leading-relaxed">
                <p>
                  Từ năm 1985, chúng tôi đã âm thầm vun đắp nghề trầm hương tại trung tâm thành phố.
                  Khởi nguồn từ một xưởng nhỏ, nay đã trở thành nơi lưu giữ tinh hoa nghệ thuật, nơi
                  kỹ thuật truyền thống gặp gỡ tầm nhìn đương đại.
                </p>
                <p>
                  Mỗi tác phẩm chúng tôi tạo ra đều mang trong mình lời thì thầm của truyền thống,
                  sự chính xác của đổi mới hiện đại, và tâm hồn của nghệ nhân chân chính.
                </p>
              </div>
              <ScaleIn delay={0.1}>
                <div className="mt-12 p-8 bg-accent-50 border-l-4 border-accent-600 shadow-lg">
                  <p className="font-serif text-lg text-accent-800 italic leading-relaxed">
                    "Trong từng thớ gỗ, từng đường cong kim loại, chúng tôi tìm thấy câu chuyện chờ
                    được kể."
                  </p>
                  <p className="text-sm text-accent-600 mt-3 font-sans font-medium">
                    Nguyễn Văn Sơn - Nghệ nhân trưởng, 1995
                  </p>
                </div>
              </ScaleIn>
            </FadeInLeft>
            <FadeInRight>
              <div className="relative aspect-[3/4] border border-neutral-300 shadow-xl rounded-lg overflow-hidden">
                <VideoPlayer
                  src="https://pidgjpxcfuuiorylnjik.supabase.co/storage/v1/object/public/public_assets/master-video-1.mp4"
                  fallbackSrc="/tramhuong-sonhong/master-video-1.mp4"
                />
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full">
        <SlideInUp>
          <div className="bg-gradient-to-br from-accent-600 to-accent-700 py-20 px-4 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-5xl font-light text-neutral-50 mb-4">
                  Khách Hàng Nói Gì Về Chúng Tôi
                </h2>
                <p className="text-accent-100 text-lg">
                  Hàng nghìn khách hàng tin tưởng và hài lòng với sản phẩm của chúng tôi
                </p>
              </div>
              <StaggerContainer className="grid md:grid-cols-3 gap-8">
                <StaggerItem>
                  <div className="bg-neutral-50 p-8 rounded-lg shadow-2xl">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-neutral-700 italic mb-6 leading-relaxed">
                      "Sản phẩm trầm hương tự nhiên 100%, mùi hương rất thơm và dịu. Chất lượng vượt
                      mong đợi, đội ngũ tư vấn nhiệt tình và chuyên nghiệp."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent-200 rounded-full flex items-center justify-center font-bold text-accent-700">
                        N
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">Nguyễn Văn A</p>
                        <p className="text-sm text-neutral-500">Hà Nội</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="bg-neutral-50 p-8 rounded-lg shadow-2xl">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-neutral-700 italic mb-6 leading-relaxed">
                      "Mua vòng trầm cho bố, ông rất thích. Sản phẩm đẹp, đóng gói kỹ càng. Giao
                      hàng nhanh, giá cả hợp lý. Sẽ tiếp tục ủng hộ!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent-200 rounded-full flex items-center justify-center font-bold text-accent-700">
                        T
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">Trần Thị B</p>
                        <p className="text-sm text-neutral-500">TP. Hồ Chí Minh</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="bg-neutral-50 p-8 rounded-lg shadow-2xl">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-neutral-700 italic mb-6 leading-relaxed">
                      "Showroom đẹp, nhân viên tư vấn tận tình. Được trải nghiệm nhiều loại trầm
                      khác nhau. Rất hài lòng với chất lượng và dịch vụ."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent-200 rounded-full flex items-center justify-center font-bold text-accent-700">
                        L
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">Lê Văn C</p>
                        <p className="text-sm text-neutral-500">Đà Nẵng</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </SlideInUp>
      </section>

      {/* Collections Section */}
      <section id="collections" className="min-h-screen py-20 px-4 lg:px-12 bg-neutral-900 w-full">
        <div className="max-w-7xl mx-auto">
          <CollectionContent />
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="min-h-screen py-20 px-4 lg:px-12 bg-neutral-900 w-full">
        <div className="max-w-7xl mx-auto">
          <GalleryContent />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
