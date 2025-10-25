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
          <h1 className="font-serif text-6xl font-light mb-8 tracking-tight leading-none text-neutral-900">
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
          <p className="font-sans text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto text-center mb-10">
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

      {/* Why Choose Us Section */}
      <div className="py-16">
        <FadeInUp>
          <h2 className="font-serif text-5xl font-light mb-16 text-center text-neutral-900">
            Tại Sao Chọn Chúng Tôi?
          </h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-12">
          <StaggerItem>
            <div className="text-center p-8 bg-gradient-to-br from-accent-50 to-neutral-50 border border-accent-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-accent-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-neutral-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-light mb-4 text-neutral-900">
                100% Tự Nhiên
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Cam kết sản phẩm Trầm Hương nguyên chất, nguồn gốc rõ ràng, có
                chứng nhận chất lượng đầy đủ
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="text-center p-8 bg-gradient-to-br from-accent-50 to-neutral-50 border border-accent-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-accent-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-neutral-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-light mb-4 text-neutral-900">
                30+ Năm Kinh Nghiệm
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Hơn 3 thập kỷ tâm huyết với nghề, am hiểu sâu sắc về trầm hương
                và nghệ thuật chế tác truyền thống
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="text-center p-8 bg-gradient-to-br from-accent-50 to-neutral-50 border border-accent-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-accent-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-neutral-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-light mb-4 text-neutral-900">
                Hàng Nghìn Khách Hài Lòng
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Được tin tưởng bởi khách hàng trên toàn quốc, đánh giá 5 sao về
                chất lượng sản phẩm và dịch vụ
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
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
              nơi lưu giữ tinh hoa nghệ thuật, nơi kỹ thuật truyền thống gặp gỡ
              tầm nhìn đương đại.
            </p>
            <p>
              Mỗi tác phẩm chúng tôi tạo ra đều mang trong mình lời thì thầm của
              truyền thống, sự chính xác của đổi mới hiện đại, và tâm hồn của
              nghệ nhân chân chính.
            </p>
          </div>
          <ScaleIn delay={0.3}>
            <div className="mt-12 p-8 bg-accent-50 border-l-4 border-accent-600 shadow-lg">
              <p className="font-serif text-lg text-accent-800 italic leading-relaxed">
                "Trong từng thớ gỗ, từng đường cong kim loại, chúng tôi tìm thấy
                câu chuyện chờ được kể."
              </p>
              <p className="text-sm text-accent-600 mt-3 font-sans font-medium">
                Nguyễn Văn Sơn - Nghệ nhân trưởng, 1995
              </p>
            </div>
          </ScaleIn>
        </FadeInLeft>
        <FadeInRight>
          <div className="relative aspect-[3/4] border border-neutral-300 shadow-xl rounded-lg overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              webkit-playsinline="true"
              x-webkit-airplay="allow"
              controls={false}
            >
              <source
                src="/tramhuong-sonhong/master-video-1.mp4"
                type="video/mp4"
              />
              <source
                src="/tramhuong-sonhong/master-video-1.mp4"
                type="video/mp4"
                media="(max-width: 768px)"
              />
              Your browser does not support the video tag.
            </video>
          </div>
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

      {/* Testimonials Section */}
      <SlideInUp>
        <div className="bg-gradient-to-br from-accent-600 to-accent-700 -mx-12 px-12 py-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl font-light text-neutral-50 mb-4">
              Khách Hàng Nói Gì Về Chúng Tôi
            </h2>
            <p className="text-accent-100 text-lg">
              Hàng nghìn khách hàng tin tưởng và hài lòng với sản phẩm của chúng
              tôi
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
                  "Sản phẩm trầm hương tự nhiên 100%, mùi hương rất thơm và dịu.
                  Chất lượng vượt mong đợi, đội ngũ tư vấn nhiệt tình và chuyên
                  nghiệp."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-200 rounded-full flex items-center justify-center font-bold text-accent-700">
                    N
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">
                      Nguyễn Văn A
                    </p>
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
                  "Mua vòng trầm cho bố, ông rất thích. Sản phẩm đẹp, đóng gói
                  kỹ càng. Giao hàng nhanh, giá cả hợp lý. Sẽ tiếp tục ủng hộ!"
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
                  "Showroom đẹp, nhân viên tư vấn tận tình. Được trải nghiệm
                  nhiều loại trầm khác nhau. Rất hài lòng với chất lượng và dịch
                  vụ."
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
      </SlideInUp>

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
                <div className="font-mono text-5xl font-bold text-accent-600 mb-2">
                  30+
                </div>
                <p className="text-neutral-600 font-sans text-lg">
                  Năm Kinh Nghiệm
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="font-mono text-5xl font-bold text-accent-600 mb-2">
                  10K+
                </div>
                <p className="text-neutral-600 font-sans text-lg">
                  Khách Hàng Tin Tưởng
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="font-mono text-5xl font-bold text-accent-600 mb-2">
                  99%
                </div>
                <p className="text-neutral-600 font-sans text-lg">
                  Đánh Giá 5 Sao
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="font-mono text-5xl font-bold text-accent-600 mb-2">
                  100%
                </div>
                <p className="text-neutral-600 font-sans text-lg">
                  Trầm Tự Nhiên
                </p>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 pt-16 border-t border-neutral-300">
            <h3 className="font-serif text-3xl font-light mb-8 text-center text-neutral-900">
              Cam Kết Chất Lượng
            </h3>
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-neutral-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-neutral-700">
                  Chứng Nhận
                  <br />
                  Chất Lượng
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-neutral-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-neutral-700">
                  Hoàn Tiền
                  <br />
                  Nếu Không Hài Lòng
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-neutral-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-neutral-700">
                  Giao Hàng
                  <br />
                  Toàn Quốc
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-neutral-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-neutral-700">
                  Hỗ Trợ
                  <br />
                  24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </SlideInUp>
    </div>
  );
}

// Default export for route access
export default HomeContent;
