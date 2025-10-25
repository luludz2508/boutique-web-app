import {
  TextReveal,
  FadeIn,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  ScaleIn,
  DrawLine,
  StaggerContainer,
  StaggerItem,
  SlideInUp,
} from "@/components/animations/viewport-animations";
import content from "@/config/content";
import Link from "next/link";

// Export the content component for the accordion layout
export function HomeContent() {
  const currentLocale = "vi";
  const pageContent = content[currentLocale].home;

  return (
    <div className="space-y-20">
      <div className="pt-8">
        <TextReveal className="text-center">
          <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none text-neutral-900">
            {pageContent.title}
            <br />
            <span className="font-normal text-accent-600">
              {pageContent.subtitle}
            </span>
          </h1>
        </TextReveal>
        <FadeIn delay={0.5}>
          <DrawLine className="w-32 mx-auto mb-8" />
        </FadeIn>
        <FadeInUp delay={0.8}>
          <p className="font-sans text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto text-center mb-10">
            {pageContent.description}
          </p>
        </FadeInUp>
        <FadeInUp delay={0.8}>
          <div className="flex justify-center">
            <Link
              href="/products"
              className="bg-accent-600 hover:bg-accent-700 text-neutral-50 font-medium px-12 py-4 transition-colors font-sans inline-block"
            >
              Mua Ngay
            </Link>
          </div>
        </FadeInUp>
      </div>

      <div className="grid md:grid-cols-2 gap-20 py-16">
        <FadeInLeft>
          <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
            Di Sản Văn Hóa
          </h2>
          <div className="space-y-6 text-neutral-600 leading-relaxed">
            <p>
              Từ năm 1985, chúng tôi đã âm thầm vun đắp nghề trầm hương tại
              trung tâm thành phố. Khởi nguồn từ một xưởng nhỏ, nay đã trở thành
              nơi lưu giữ tinh hoa nghệ thuật—nơi kỹ thuật truyền thống gặp gỡ
              tầm nhìn đương đại.
            </p>
            <p>
              Mỗi tác phẩm chúng tôi tạo ra đều mang trong mình lời thì thầm của
              truyền thống, sự chính xác của đổi mới hiện đại, và tâm hồn của
              nghệ nhân chân chính.
            </p>
          </div>
          <ScaleIn delay={0.3}>
            <div className="mt-12 p-8 bg-accent-50 border-l-2 border-accent-400">
              <p className="font-serif text-lg text-accent-800 italic leading-relaxed">
                "Trong từng thớ gỗ, từng đường cong kim loại, chúng tôi tìm thấy
                câu chuyện chờ được kể."
              </p>
              <p className="text-sm text-accent-600 mt-3 font-sans">
                — Nghệ nhân trưởng, 1985
              </p>
            </div>
          </ScaleIn>
        </FadeInLeft>
        <FadeInRight>
          <div className="bg-neutral-200 h-96 border border-neutral-300" />
        </FadeInRight>
      </div>

      <div className="py-16">
        <FadeInUp>
          <h2 className="font-serif text-5xl font-light mb-16 text-center text-neutral-900">
            Triết Lý
          </h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Thiết Kế Vượt Thời Gian",
              description:
                "Chúng tôi tạo ra những tác phẩm siêu việt xu hướng, tập trung vào vẻ đẹp và chức năng bền vững.",
              symbol: "∞",
            },
            {
              title: "Quy Trình Tỉnh Thức",
              description:
                "Mỗi bước đi được cân nhắc kỹ lưỡng, mỗi chi tiết được suy ngẫm, mỗi lựa chọn đều có chủ ý.",
              symbol: "◯",
            },
            {
              title: "Nguyên Liệu Chân Thực",
              description:
                "Chúng tôi chỉ tuyển chọn những nguyên liệu tốt nhất, tôn trọng đặc tính tự nhiên và nguồn gốc của chúng.",
              symbol: "△",
            },
          ].map((principle, index) => (
            <StaggerItem key={index} className="text-center">
              <div className="text-6xl font-light text-accent-500 mb-6">
                {principle.symbol}
              </div>
              <h3 className="font-serif text-2xl font-light mb-4 text-neutral-900">
                {principle.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed font-sans">
                {principle.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <SlideInUp>
        <div className="py-16 bg-neutral-100 -mx-12 px-12 border-t border-b border-neutral-200">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
              Con Số Nói Lên Tất Cả
            </h2>
            <StaggerContainer
              className="grid md:grid-cols-4 gap-8"
              staggerDelay={0.15}
            >
              <StaggerItem>
                <div className="font-mono text-4xl font-light text-accent-600 mb-2">
                  38
                </div>
                <p className="text-neutral-600 font-sans">Năm Kinh Nghiệm</p>
              </StaggerItem>
              <StaggerItem>
                <div className="font-mono text-4xl font-light text-accent-600 mb-2">
                  2.4K
                </div>
                <p className="text-neutral-600 font-sans">Tác Phẩm Tạo Ra</p>
              </StaggerItem>
              <StaggerItem>
                <div className="font-mono text-4xl font-light text-accent-600 mb-2">
                  99.8%
                </div>
                <p className="text-neutral-600 font-sans">
                  Khách Hàng Hài Lòng
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="font-mono text-4xl font-light text-accent-600 mb-2">
                  ∞
                </div>
                <p className="text-neutral-600 font-sans">Giá Trị Trường Tồn</p>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </SlideInUp>
    </div>
  );
}

// Default export for route access
export default HomeContent;
