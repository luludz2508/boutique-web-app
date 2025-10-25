import {
  FadeInUp,
  FadeIn,
  DrawLine,
  TextReveal,
  StaggerContainer,
  StaggerItem,
  SlideInUp,
  ScaleIn,
} from "@/components/animations/viewport-animations";

// Export the content component for the accordion layout
export function GalleryContent() {
  return (
    <div className="space-y-20">
      <div className="pt-12 text-center">
        <TextReveal>
          <h1 className="font-serif text-6xl font-light mb-8 tracking-tight leading-none">
            Hình Ảnh
            <br />
            <span className="font-normal text-primary-400">Trầm Hương</span>
          </h1>
        </TextReveal>
        <FadeIn delay={0.5}>
          <DrawLine className="w-32 mx-auto mb-8 bg-neutral-600" />
        </FadeIn>
        <FadeInUp delay={0.8}>
          <p className="font-sans text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Bộ sưu tập hình ảnh được tuyển chọn về tác phẩm, quy trình sản xuất
            và không gian nơi nghệ thuật trầm hương được tạo nên.
          </p>
        </FadeInUp>
      </div>

      {/* Gallery Content - Placeholder for now */}
      <div>
        <FadeInUp>
          <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">
            Xưởng Sản Xuất
          </h2>
        </FadeInUp>
        <StaggerContainer
          className="grid md:grid-cols-3 gap-4"
          staggerDelay={0.05}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <StaggerItem key={i}>
              <div className="bg-neutral-800 h-64 border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer hover:scale-105 duration-300">
                <div className="h-full flex items-center justify-center text-neutral-500 font-sans">
                  Xưởng {i + 1}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <SlideInUp>
        <div className="bg-primary-600 -mx-12 px-12 py-20 border-t border-primary-500">
          <div className="text-center">
            <h2 className="font-serif text-5xl font-light mb-8 text-neutral-900">
              Tài Liệu Đặt Hàng
            </h2>
            <p className="font-sans text-xl text-neutral-800 mb-12 max-w-2xl mx-auto leading-relaxed">
              Mỗi tác phẩm đặt làm đều được ghi lại từ khâu ý tưởng đến hoàn
              thiện.
            </p>
            <ScaleIn delay={0.3}>
              <button className="bg-neutral-900 text-neutral-50 font-medium px-12 py-4 hover:bg-neutral-800 transition-colors text-lg font-sans">
                Xem Bộ Sưu Tập Quy Trình
              </button>
            </ScaleIn>
          </div>
        </div>
      </SlideInUp>
    </div>
  );
}

// Default export for route access
export default GalleryContent;
