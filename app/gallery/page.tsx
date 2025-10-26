import {
  FadeInUp,
  FadeIn,
  DrawLine,
  TextReveal,
  StaggerContainer,
  StaggerItem,
  SlideInUp,
  ScaleIn,
} from '@/components/animations/viewport-animations';
import Image from 'next/image';
import { ImperialCard, ImperialDivider } from '@/components/ui/imperial-elements';

// Export the content component for the accordion layout
export function GalleryContent() {
  return (
    <div className="space-y-20">
      <div className="pt-12 text-center">
        <TextReveal>
          <h1 className="font-serif text-6xl font-light mb-8 tracking-tight leading-none text-neutral-100">
            Hình Ảnh
            <br />
            <span className="font-normal text-accent-400">Trầm Hương</span>
          </h1>
        </TextReveal>
        <FadeIn delay={0.2}>
          <ImperialDivider className="mb-8" />
        </FadeIn>
        <FadeInUp delay={0.3}>
          <p className="font-sans text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Bộ sưu tập hình ảnh được tuyển chọn về tác phẩm, quy trình sản xuất và không gian nơi
            nghệ thuật trầm hương được tạo nên.
          </p>
        </FadeInUp>
      </div>

      {/* Customer & Expo Gallery */}
      <div>
        <FadeInUp>
          <h2 className="font-serif text-4xl font-light mb-12 text-neutral-100">
            Khách Hàng & Triển Lãm
          </h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {/* Customer Images */}
          <StaggerItem>
            <ImperialCard className="p-0 bg-transparent" color="light">
              <div className="relative aspect-[4/3] cursor-pointer transition-transform duration-300 hover:scale-105">
                <Image
                  src="/tramhuong-sonhong/customers-1.jpg"
                  alt="Khách hàng tại showroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </ImperialCard>
          </StaggerItem>

          <StaggerItem>
            <ImperialCard className="p-0 bg-transparent" color="light">
              <div className="relative aspect-[4/3] cursor-pointer transition-transform duration-300 hover:scale-105">
                <Image
                  src="/tramhuong-sonhong/customers-2.jpg"
                  alt="Khách hàng tham quan showroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </ImperialCard>
          </StaggerItem>

          <StaggerItem>
            <ImperialCard className="p-0 bg-transparent" color="light">
              <div className="relative aspect-[4/3] cursor-pointer transition-transform duration-300 hover:scale-105">
                <Image
                  src="/tramhuong-sonhong/customer-3.jpg"
                  alt="Khách hàng tại triển lãm"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </ImperialCard>
          </StaggerItem>

          <StaggerItem>
            <ImperialCard className="p-0 bg-transparent" color="light">
              <div className="relative aspect-[4/3] cursor-pointer transition-transform duration-300 hover:scale-105">
                <Image
                  src="/tramhuong-sonhong/customer-4.jpg"
                  alt="Khách hàng tại triển lãm"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </ImperialCard>
          </StaggerItem>

          {/* Expo Images */}
          <StaggerItem>
            <ImperialCard className="p-0 bg-transparent" color="light">
              <div className="relative aspect-[4/3] cursor-pointer transition-transform duration-300 hover:scale-105">
                <Image
                  src="/tramhuong-sonhong/caexpo-1.jpg"
                  alt="Triển lãm CAEXPO"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </ImperialCard>
          </StaggerItem>
        </StaggerContainer>
      </div>

      <SlideInUp>
        <ImperialCard
          variant="outlined"
          className="p-16 bg-white/10 backdrop-blur-sm border-white/20"
        >
          <div className="text-center">
            <h2 className="font-serif text-5xl font-light mb-8 text-neutral-100">
              Tài Liệu Đặt Hàng
            </h2>
            <ImperialDivider variant="lotus" className="mb-8" />
            <p className="font-sans text-xl text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Mỗi tác phẩm đặt làm đều được ghi lại từ khâu ý tưởng đến hoàn thiện.
            </p>
            <ScaleIn delay={0.1}>
              <button className="bg-accent-600 hover:bg-accent-700 text-neutral-50 font-medium px-12 py-4 transition-colors text-lg font-sans">
                Xem Bộ Sưu Tập Quy Trình
              </button>
            </ScaleIn>
          </div>
        </ImperialCard>
      </SlideInUp>
    </div>
  );
}

// Default export for route access
export default GalleryContent;
