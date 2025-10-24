import {
  DrawLine,
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  ScaleIn,
  SlideInUp,
  StaggerContainer,
  StaggerItem,
  TextReveal,
} from "@/components/animations/viewport-animations";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

interface SectionConfig {
  id: string;
  title: string;
  path: string;
  color: string;
  textColor: string;
  component: ReactNode; // This will be the JSX content for the section
  content?: {
    description?: string;
    locationTitle?: string;
    mainAtelierTitle?: string;
    mainAtelierAddress?: string;
    visitingHoursTitle?: string;
    visitingHours?: string[];
    contactTitle?: string;
    contactNumber?: string;
    contactRecommendation?: string;
    emailTitle?: string;
    emailAddress?: string;
    emailResponseTime?: string;
    workshopMapTitle?: string;
    workshopMapDescription?: string;
    scheduleVisitTitle?: string;
    firstNamePlaceholder?: string;
    lastNamePlaceholder?: string;
    emailPlaceholder?: string;
    phonePlaceholder?: string;
    projectPlaceholder?: string;
    requestAppointmentButtonText?: string;
    privateConsultationsTitle?: string;
    privateConsultationsDescription?: string;
    bookPrivateSessionButtonText?: string;
  };
  items?: Array<{
    name: string;
    price: string;
    description: string;
    details: string[];
  }>;
  services?: Array<{
    title: string;
    price: string;
    description: string;
    process: string[];
  }>;
  packages?: Array<{
    name: string;
    price: string;
    features: string[];
    highlight: boolean;
  }>;
}

interface AppConfig {
  [locale: string]: {
    sections: SectionConfig[];
  };
}

const appConfig: AppConfig = {
  vi: {
    sections: [
      {
        id: "home",
        title: "TRANG CHỦ",
        path: "/",
        color: "bg-neutral-50",
        textColor: "text-neutral-900",
        component: (
          <div className="space-y-20">
            <div className="pt-8">
              <TextReveal className="text-center">
                <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none text-neutral-900">
                  Tinh Túy
                  <br />
                  <span className="font-normal text-accent-600">
                    Trầm Hương
                  </span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto text-center mb-10">
                  Tinh túy của đất trời trong từng thớ gỗ trầm, hòa quyện giữa
                  truyền thống và tâm huyết nghệ nhân.
                </p>
              </FadeInUp>
              <FadeInUp delay={0.8}>
                <div className="flex justify-center">
                  <a
                    href="https://shop.tramhuongsonhong.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent-600 hover:bg-accent-700 text-neutral-50 font-medium px-12 py-4 transition-colors font-sans inline-block"
                  >
                    Mua Ngay
                  </a>
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
                    Từ năm 1985, chúng tôi đã âm thầm vun đắp nghề trầm hương
                    tại trung tâm thành phố. Khởi nguồn từ một xưởng nhỏ, nay đã
                    trở thành nơi lưu giữ tinh hoa nghệ thuật—nơi kỹ thuật
                    truyền thống gặp gỡ tầm nhìn đương đại.
                  </p>
                  <p>
                    Mỗi tác phẩm chúng tôi tạo ra đều mang trong mình lời thì
                    thầm của truyền thống, sự chính xác của đổi mới hiện đại, và
                    tâm hồn của nghệ nhân chân chính. Chúng tôi không chỉ tạo ra
                    sản phẩm; chúng tôi tạo nên trải nghiệm, ký ức và di sản gia
                    đình.
                  </p>
                </div>
                <ScaleIn delay={0.3}>
                  <div className="mt-12 p-8 bg-accent-50 border-l-2 border-accent-400">
                    <p className="font-serif text-lg text-accent-800 italic leading-relaxed">
                      "Trong từng thớ gỗ, từng đường cong kim loại, chúng tôi
                      tìm thấy câu chuyện chờ được kể."
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
                      <p className="text-neutral-600 font-sans">
                        Năm Kinh Nghiệm
                      </p>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="font-mono text-4xl font-light text-accent-600 mb-2">
                        2.4K
                      </div>
                      <p className="text-neutral-600 font-sans">
                        Tác Phẩm Tạo Ra
                      </p>
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
                      <p className="text-neutral-600 font-sans">
                        Giá Trị Trường Tồn
                      </p>
                    </StaggerItem>
                  </StaggerContainer>
                </div>
              </div>
            </SlideInUp>
          </div>
        ),
      },
      {
        id: "collection",
        title: "SẢN PHẨM",
        path: "/collection",
        color: "bg-neutral-900",
        textColor: "text-neutral-50",
        component: (
          <div className="space-y-20">
            <div className="pt-12 text-center">
              <TextReveal>
                <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none">
                  Bộ Sưu Tập
                  <br />
                  <span className="font-normal text-primary-400">
                    Trầm Hương
                  </span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8 bg-neutral-600" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                  Những tác phẩm được tuyển chọn kỹ lưỡng, thể hiện cam kết của
                  chúng tôi với sự hoàn mỹ, mỗi món đồ kể một câu chuyện riêng
                  về nghệ thuật và tâm huyết.
                </p>
              </FadeInUp>
            </div>

            <StaggerContainer
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.1}
            >
              {[
                {
                  name: "Trầm Hương Kỳ Nam",
                  price: "Từ 50.000.000đ",
                  description:
                    "Trầm kỳ nam cao cấp với hương thơm đặc trưng, quý hiếm và tinh túy nhất của gỗ trầm.",
                  details: [
                    "Nguồn gốc rõ ràng",
                    "Chứng nhận xác thực",
                    "Bảo hành trọn đời",
                  ],
                },
                {
                  name: "Vòng Tay Trầm Hương",
                  price: "Từ 3.000.000đ",
                  description:
                    "Vòng tay trầm hương tinh xảo, mang lại sự bình an và thanh tịnh cho người đeo.",
                  details: [
                    "Chất liệu tự nhiên",
                    "Thiết kế tinh tế",
                    "Đa dạng kích thước",
                  ],
                },
                {
                  name: "Tượng Phật Trầm Hương",
                  price: "Từ 80.000.000đ",
                  description:
                    "Tượng Phật điêu khắc tinh xảo từ gỗ trầm nguyên khối, tác phẩm nghệ thuật độc đáo.",
                  details: [
                    "Điêu khắc thủ công",
                    "Thiết kế độc nhất",
                    "Ký tên nghệ nhân",
                  ],
                },
                {
                  name: "Nhang Trầm Cao Cấp",
                  price: "Từ 500.000đ",
                  description:
                    "Nhang trầm hương nguyên chất, mang đến không gian thanh tịnh và thư thái.",
                  details: [
                    "100% tự nhiên",
                    "Không hóa chất",
                    "Đóng gói sang trọng",
                  ],
                },
                {
                  name: "Dầu Trầm Hương",
                  price: "Từ 2.000.000đ",
                  description:
                    "Tinh dầu trầm hương nguyên chất, chiết xuất từ những cây trầm quý hiếm nhất.",
                  details: [
                    "Chiết xuất nguyên chất",
                    "Hương thơm đặc trưng",
                    "Chai thủy tinh cao cấp",
                  ],
                },
                {
                  name: "Tranh Gỗ Trầm",
                  price: "Từ 120.000.000đ",
                  description:
                    "Tranh nghệ thuật từ gỗ trầm tự nhiên, kết hợp hài hòa giữa thẩm mỹ và giá trị tâm linh.",
                  details: [
                    "Tác phẩm độc bản",
                    "Nguyên liệu quý hiếm",
                    "Giá trị đầu tư",
                  ],
                },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="border border-neutral-700 bg-neutral-800 hover:border-neutral-600 transition-colors">
                    <div className="bg-neutral-700 h-48 border-b border-neutral-600"></div>
                    <div className="p-8">
                      <h3 className="font-serif text-2xl font-light mb-3 text-neutral-50">
                        {item.name}
                      </h3>
                      <p className="font-mono text-lg text-primary-400 mb-4">
                        {item.price}
                      </p>
                      <p className="text-neutral-300 leading-relaxed mb-6 font-sans">
                        {item.description}
                      </p>
                      <div className="space-y-2 mb-8">
                        {item.details.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-1 h-1 bg-primary-400"></div>
                            <span className="text-neutral-400 text-sm font-sans">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button className="w-full bg-primary-600 hover:bg-primary-700 text-neutral-900 font-medium py-3 transition-colors font-sans">
                        Tìm Hiểu Thêm
                      </button>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <SlideInUp>
              <div className="bg-primary-600 -mx-12 px-12 py-20 border-t border-primary-500">
                <div className="text-center">
                  <h2 className="font-serif text-5xl font-light mb-8 text-neutral-900">
                    Dịch Vụ Đặt Làm Riêng
                  </h2>
                  <p className="font-sans text-xl text-neutral-800 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Mỗi tác phẩm có thể được tùy chỉnh theo yêu cầu của bạn.
                    Nghệ nhân của chúng tôi sẽ làm việc cùng bạn để hiện thực
                    hóa tầm nhìn của bạn.
                  </p>
                  <FadeInUp delay={0.3}>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="Địa chỉ email của bạn"
                        className="flex-1 px-6 py-4 bg-neutral-50 text-neutral-900 border border-neutral-300 focus:outline-none focus:border-neutral-500 font-sans transition-colors"
                      />
                      <button className="bg-neutral-900 text-neutral-50 font-medium px-8 py-4 hover:bg-neutral-800 transition-colors font-sans">
                        Bắt Đầu Tư Vấn
                      </button>
                    </div>
                  </FadeInUp>
                </div>
              </div>
            </SlideInUp>
          </div>
        ),
        items: [
          {
            name: "Trầm Hương Kỳ Nam",
            price: "Từ 50.000.000đ",
            description:
              "Trầm kỳ nam cao cấp với hương thơm đặc trưng, quý hiếm và tinh túy nhất của gỗ trầm.",
            details: [
              "Nguồn gốc rõ ràng",
              "Chứng nhận xác thực",
              "Bảo hành trọn đời",
            ],
          },
          {
            name: "Vòng Tay Trầm Hương",
            price: "Từ 3.000.000đ",
            description:
              "Vòng tay trầm hương tinh xảo, mang lại sự bình an và thanh tịnh cho người đeo.",
            details: [
              "Chất liệu tự nhiên",
              "Thiết kế tinh tế",
              "Đa dạng kích thước",
            ],
          },
          {
            name: "Tượng Phật Trầm Hương",
            price: "Từ 80.000.000đ",
            description:
              "Tượng Phật điêu khắc tinh xảo từ gỗ trầm nguyên khối, tác phẩm nghệ thuật độc đáo.",
            details: [
              "Điêu khắc thủ công",
              "Thiết kế độc nhất",
              "Ký tên nghệ nhân",
            ],
          },
          {
            name: "Nhang Trầm Cao Cấp",
            price: "Từ 500.000đ",
            description:
              "Nhang trầm hương nguyên chất, mang đến không gian thanh tịnh và thư thái.",
            details: ["100% tự nhiên", "Không hóa chất", "Đóng gói sang trọng"],
          },
          {
            name: "Dầu Trầm Hương",
            price: "Từ 2.000.000đ",
            description:
              "Tinh dầu trầm hương nguyên chất, chiết xuất từ những cây trầm quý hiếm nhất.",
            details: [
              "Chiết xuất nguyên chất",
              "Hương thơm đặc trưng",
              "Chai thủy tinh cao cấp",
            ],
          },
          {
            name: "Tranh Gỗ Trầm",
            price: "Từ 120.000.000đ",
            description:
              "Tranh nghệ thuật từ gỗ trầm tự nhiên, kết hợp hài hòa giữa thẩm mỹ và giá trị tâm linh.",
            details: [
              "Tác phẩm độc bản",
              "Nguyên liệu quý hiếm",
              "Giá trị đầu tư",
            ],
          },
        ],
      },
      {
        id: "services",
        title: "DỊCH VỤ",
        path: "/services",
        color: "bg-accent-50",
        textColor: "text-neutral-900",
        component: (
          <div className="space-y-20">
            <div className="pt-12 text-center">
              <TextReveal>
                <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none text-neutral-900">
                  Dịch Vụ
                  <br />
                  <span className="font-normal text-accent-700">
                    Của Chúng Tôi
                  </span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Ngoài việc tạo ra tác phẩm, chúng tôi cung cấp các dịch vụ
                  toàn diện để đảm bảo món đồ của bạn được trân trọng qua nhiều
                  thế hệ.
                </p>
              </FadeInUp>
            </div>

            <StaggerContainer
              className="grid md:grid-cols-2 gap-16"
              staggerDelay={0.2}
            >
              {[
                {
                  title: "Tư Vấn Lựa Chọn",
                  price: "Miễn phí",
                  description:
                    "Hướng dẫn cá nhân hóa từ các chuyên gia của chúng tôi để hiện thực hóa tầm nhìn của bạn.",
                  process: [
                    "Buổi khám phá ban đầu",
                    "Đánh giá nhu cầu và mục đích sử dụng",
                    "Lựa chọn sản phẩm và chất liệu phù hợp",
                    "Đề xuất chi tiết và thời gian thực hiện",
                  ],
                },
                {
                  title: "Giao Hàng Cao Cấp",
                  price: "Từ 500.000đ",
                  description:
                    "Dịch vụ giao hàng và lắp đặt chuyên nghiệp để bạn yên tâm.",
                  process: [
                    "Lên lịch giao hàng theo hẹn",
                    "Đội ngũ giao hàng chuyên nghiệp",
                    "Hướng dẫn bố trí và điều chỉnh",
                    "Hướng dẫn chăm sóc và bảo quản",
                  ],
                },
                {
                  title: "Chương Trình Bảo Dưỡng",
                  price: "3.000.000đ/năm",
                  description:
                    "Bảo tồn vẻ đẹp và giá trị của tác phẩm với dịch vụ chăm sóc chuyên môn.",
                  process: [
                    "Kiểm tra chuyên nghiệp hàng năm",
                    "Làm sạch và dưỡng bảo",
                    "Sửa chữa và điều chỉnh nhỏ",
                    "Báo cáo tình trạng chi tiết",
                  ],
                },
                {
                  title: "Phục Hồi & Sửa Chữa",
                  price: "Báo giá sau đánh giá",
                  description:
                    "Dịch vụ phục hồi chuyên môn để đưa tác phẩm trở về tình trạng ban đầu.",
                  process: [
                    "Đánh giá hư hỏng toàn diện",
                    "Kế hoạch phục hồi và thời gian",
                    "Kỹ thuật phù hợp với thời kỳ",
                    "Đảm bảo chất lượng và bảo hành",
                  ],
                },
              ].map((service, index) => (
                <StaggerItem key={index}>
                  <div className="bg-neutral-50 border border-neutral-200 p-10 hover:border-neutral-300 transition-colors">
                    <h3 className="font-serif text-3xl font-light mb-4 text-neutral-900">
                      {service.title}
                    </h3>
                    <p className="font-mono text-lg text-accent-600 mb-6">
                      {service.price}
                    </p>
                    <p className="text-neutral-600 leading-relaxed mb-8 font-sans">
                      {service.description}
                    </p>
                    <div className="space-y-4 mb-10">
                      <h4 className="font-sans font-medium text-neutral-900">
                        Quy Trình:
                      </h4>
                      {service.process.map((step, idx) => (
                        <FadeInLeft key={idx} delay={idx * 0.1}>
                          <div className="flex items-start space-x-4">
                            <div className="font-mono text-sm text-accent-600 mt-1">
                              {String(idx + 1).padStart(2, "0")}
                            </div>
                            <span className="text-neutral-600 font-sans">
                              {step}
                            </span>
                          </div>
                        </FadeInLeft>
                      ))}
                    </div>
                    <button className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-50 font-medium py-4 transition-colors font-sans">
                      Tìm Hiểu Thêm
                    </button>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <SlideInUp>
              <div className="bg-neutral-900 -mx-12 px-12 py-20 border-t border-neutral-800">
                <div className="text-center">
                  <h2 className="font-serif text-5xl font-light mb-8 text-neutral-50">
                    Gói Dịch Vụ
                  </h2>
                  <p className="font-sans text-xl text-neutral-300 mb-16 max-w-2xl mx-auto leading-relaxed">
                    Các gói chăm sóc toàn diện được thiết kế để bảo vệ khoản đầu
                    tư của bạn và duy trì vẻ đẹp theo thời gian.
                  </p>
                  <StaggerContainer
                    className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    staggerDelay={0.15}
                  >
                    {[
                      {
                        name: "Chăm Sóc Cơ Bản",
                        price: "5.000.000đ/năm",
                        features: [
                          "Bảo dưỡng hàng năm",
                          "Sửa chữa cơ bản",
                          "Tư vấn qua điện thoại",
                        ],
                        highlight: false,
                      },
                      {
                        name: "Chăm Sóc Cao Cấp",
                        price: "10.000.000đ/năm",
                        features: [
                          "Dịch vụ 6 tháng/lần",
                          "Ưu tiên sửa chữa",
                          "Tư vấn tại chỗ",
                          "Hỗ trợ khẩn cấp",
                        ],
                        highlight: true,
                      },
                      {
                        name: "Chăm Sóc VIP",
                        price: "20.000.000đ/năm",
                        features: [
                          "Dịch vụ 3 tháng/lần",
                          "Bao gồm mọi sửa chữa",
                          "Chuyên viên riêng",
                          "Hỗ trợ bảo hiểm",
                        ],
                        highlight: false,
                      },
                    ].map((pkg, index) => (
                      <StaggerItem key={index}>
                        <div
                          className={`p-8 border-2 hover:scale-105 transition-all duration-300 ${
                            pkg.highlight
                              ? "border-primary-400 bg-primary-50"
                              : "border-neutral-700 bg-neutral-800"
                          }`}
                        >
                          <h3
                            className={`font-serif text-2xl font-light mb-3 ${
                              pkg.highlight
                                ? "text-neutral-900"
                                : "text-neutral-50"
                            }`}
                          >
                            {pkg.name}
                          </h3>
                          <p
                            className={`font-mono text-2xl mb-6 ${
                              pkg.highlight
                                ? "text-accent-700"
                                : "text-primary-400"
                            }`}
                          >
                            {pkg.price}
                          </p>
                          <div className="space-y-3">
                            {pkg.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className={`font-sans text-sm ${
                                  pkg.highlight
                                    ? "text-neutral-700"
                                    : "text-neutral-300"
                                }`}
                              >
                                • {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </SlideInUp>
          </div>
        ),
        services: [
          {
            title: "Tư Vấn Lựa Chọn",
            price: "Miễn phí",
            description:
              "Hướng dẫn cá nhân hóa từ các chuyên gia của chúng tôi để hiện thực hóa tầm nhìn của bạn.",
            process: [
              "Buổi khám phá ban đầu",
              "Đánh giá nhu cầu và mục đích sử dụng",
              "Lựa chọn sản phẩm và chất liệu phù hợp",
              "Đề xuất chi tiết và thời gian thực hiện",
            ],
          },
          {
            title: "Giao Hàng Cao Cấp",
            price: "Từ 500.000đ",
            description:
              "Dịch vụ giao hàng và lắp đặt chuyên nghiệp để bạn yên tâm.",
            process: [
              "Lên lịch giao hàng theo hẹn",
              "Đội ngũ giao hàng chuyên nghiệp",
              "Hướng dẫn bố trí và điều chỉnh",
              "Hướng dẫn chăm sóc và bảo quản",
            ],
          },
          {
            title: "Chương Trình Bảo Dưỡng",
            price: "3.000.000đ/năm",
            description:
              "Bảo tồn vẻ đẹp và giá trị của tác phẩm với dịch vụ chăm sóc chuyên môn.",
            process: [
              "Kiểm tra chuyên nghiệp hàng năm",
              "Làm sạch và dưỡng bảo",
              "Sửa chữa và điều chỉnh nhỏ",
              "Báo cáo tình trạng chi tiết",
            ],
          },
          {
            title: "Phục Hồi & Sửa Chữa",
            price: "Báo giá sau đánh giá",
            description:
              "Dịch vụ phục hồi chuyên môn để đưa tác phẩm trở về tình trạng ban đầu.",
            process: [
              "Đánh giá hư hỏng toàn diện",
              "Kế hoạch phục hồi và thời gian",
              "Kỹ thuật phù hợp với thời kỳ",
              "Đảm bảo chất lượng và bảo hành",
            ],
          },
        ],
        packages: [
          {
            name: "Chăm Sóc Cơ Bản",
            price: "5.000.000đ/năm",
            features: [
              "Bảo dưỡng hàng năm",
              "Sửa chữa cơ bản",
              "Tư vấn qua điện thoại",
            ],
            highlight: false,
          },
          {
            name: "Chăm Sóc Cao Cấp",
            price: "10.000.000đ/năm",
            features: [
              "Dịch vụ 6 tháng/lần",
              "Ưu tiên sửa chữa",
              "Tư vấn tại chỗ",
              "Hỗ trợ khẩn cấp",
            ],
            highlight: true,
          },
          {
            name: "Chăm Sóc VIP",
            price: "20.000.000đ/năm",
            features: [
              "Dịch vụ 3 tháng/lần",
              "Bao gồm mọi sửa chữa",
              "Chuyên viên riêng",
              "Hỗ trợ bảo hiểm",
            ],
            highlight: false,
          },
        ],
      },
      {
        id: "gallery",
        title: "HÌNH ẢNH",
        path: "/gallery",
        color: "bg-neutral-900",
        textColor: "text-neutral-50",
        component: (
          <div className="space-y-20">
            <div className="pt-12 text-center">
              <TextReveal>
                <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none">
                  Hình Ảnh
                  <br />
                  <span className="font-normal text-primary-400">
                    Trầm Hương
                  </span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8 bg-neutral-600" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                  Bộ sưu tập hình ảnh được tuyển chọn về tác phẩm, quy trình sản
                  xuất và không gian nơi nghệ thuật trầm hương được tạo nên.
                </p>
              </FadeInUp>
            </div>

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

            <div>
              <FadeInUp>
                <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">
                  Quy Trình Chế Tác
                </h2>
              </FadeInUp>
              <StaggerContainer
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
                staggerDelay={0.08}
              >
                {Array.from({ length: 8 }, (_, i) => (
                  <StaggerItem key={i}>
                    <div className="bg-neutral-800 h-48 border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer hover:scale-105 duration-300">
                      <div className="h-full flex items-center justify-center text-neutral-500 font-sans">
                        Quy Trình {i + 1}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div>
              <FadeInUp>
                <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">
                  Tác Phẩm Nổi Bật
                </h2>
              </FadeInUp>
              <StaggerContainer
                className="grid md:grid-cols-2 gap-8"
                staggerDelay={0.15}
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <StaggerItem key={i}>
                    <div className="bg-neutral-800 border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer hover:scale-105 duration-300">
                      <div className="h-64 bg-neutral-700 border-b border-neutral-600 flex items-center justify-center text-neutral-500 font-sans">
                        Tác Phẩm {i + 1}
                      </div>
                      <div className="p-8">
                        <h3 className="font-serif text-2xl font-light mb-3 text-neutral-50">
                          Kiệt Tác {i + 1}
                        </h3>
                        <p className="text-neutral-300 text-sm font-sans leading-relaxed">
                          Minh chứng cho cam kết của chúng tôi về sự xuất sắc,
                          tác phẩm này thể hiện sự hài hòa giữa kỹ thuật truyền
                          thống và tầm nhìn đương đại.
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div>
              <FadeInUp>
                <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">
                  Hậu Trường
                </h2>
              </FadeInUp>
              <StaggerContainer
                className="grid md:grid-cols-5 gap-3"
                staggerDelay={0.03}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <StaggerItem key={i}>
                    <div className="bg-neutral-800 h-32 border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer hover:scale-105 duration-300">
                      <div className="h-full flex items-center justify-center text-neutral-500 text-sm font-sans">
                        HT {i + 1}
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
                    Mỗi tác phẩm đặt làm đều được ghi lại từ khâu ý tưởng đến
                    hoàn thiện, tạo nên câu chuyện hình ảnh về quá trình sáng
                    tạo của nó.
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
        ),
      },
      {
        id: "atelier",
        title: "VỀ CHÚNG TÔI",
        path: "/atelier",
        color: "bg-neutral-100",
        textColor: "text-neutral-900",
        content: {
          description:
            "Ghé thăm xưởng và phòng trưng bày của chúng tôi để trải nghiệm nghệ thuật trầm hương và gặp gỡ các nghệ nhân đằng sau mỗi tác phẩm.",
          locationTitle: "Địa Điểm & Giờ Làm Việc",
          mainAtelierTitle: "Xưởng Chính",
          mainAtelierAddress:
            "127 Phố Nghệ Nhân\nQuận 1, Thành phố Hồ Chí Minh\nViệt Nam",
          visitingHoursTitle: "Giờ Mở Cửa",
          visitingHours: [
            "Thứ Ba - Thứ Sáu: 10:00 - 18:00",
            "Thứ Bảy: 11:00 - 17:00",
            "Chủ Nhật & Thứ Hai: Theo hẹn",
          ],
          contactTitle: "Liên Hệ",
          contactNumber: "(028) 555-0127",
          contactRecommendation: "Nên đặt hẹn trước",
          emailTitle: "Email",
          emailAddress: "lienhe@tramhuong.vn",
          emailResponseTime: "Phản hồi trong 24 giờ",
          workshopMapTitle: "Sơ Đồ Xưởng",
          workshopMapDescription: "Bản đồ tương tác xưởng sản xuất",
          scheduleVisitTitle: "Đặt Lịch Ghé Thăm",
          firstNamePlaceholder: "Họ",
          lastNamePlaceholder: "Tên",
          emailPlaceholder: "Địa chỉ Email",
          phonePlaceholder: "Số Điện Thoại",
          projectPlaceholder: "Chia sẻ về nhu cầu hoặc sở thích của bạn",
          requestAppointmentButtonText: "Đặt Lịch Hẹn",
          privateConsultationsTitle: "Tư Vấn Riêng Tư",
          privateConsultationsDescription:
            "Đặt buổi gặp riêng với các nghệ nhân hàng đầu của chúng tôi để thảo luận về tầm nhìn và khám phá các khả năng.",
          bookPrivateSessionButtonText: "Đặt Buổi Riêng Tư",
        },
        component: (
          <div className="space-y-20">
            <div className="pt-12 text-center">
              <TextReveal>
                <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none text-neutral-900">
                  Xưởng
                  <br />
                  <span className="font-normal text-accent-700">
                    Trầm Hương
                  </span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Ghé thăm xưởng và phòng trưng bày của chúng tôi để trải nghiệm
                  nghệ thuật trầm hương và gặp gỡ các nghệ nhân đằng sau mỗi tác
                  phẩm.
                </p>
              </FadeInUp>
            </div>

            <div className="grid md:grid-cols-2 gap-20">
              <FadeInLeft>
                <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
                  Địa Điểm & Giờ Làm Việc
                </h2>
                <StaggerContainer className="space-y-8" staggerDelay={0.15}>
                  <StaggerItem>
                    <div className="flex items-start space-x-6">
                      <MapPin className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">
                          Xưởng Chính
                        </h3>
                        <p className="text-neutral-600 font-sans leading-relaxed">
                          127 Phố Nghệ Nhân
                          <br />
                          Quận 1, Thành phố Hồ Chí Minh
                          <br />
                          Việt Nam
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start space-x-6">
                      <Clock className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">
                          Giờ Mở Cửa
                        </h3>
                        <div className="text-neutral-600 space-y-1 font-sans">
                          <p>Thứ Ba - Thứ Sáu: 10:00 - 18:00</p>
                          <p>Thứ Bảy: 11:00 - 17:00</p>
                          <p>Chủ Nhật & Thứ Hai: Theo hẹn</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start space-x-6">
                      <Phone className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">
                          Liên Hệ
                        </h3>
                        <p className="text-neutral-600 font-sans">
                          (028) 555-0127
                        </p>
                        <p className="text-sm text-neutral-500 font-sans">
                          Nên đặt hẹn trước
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start space-x-6">
                      <Mail className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">
                          Email
                        </h3>
                        <p className="text-neutral-600 font-sans">
                          lienhe@tramhuong.vn
                        </p>
                        <p className="text-sm text-neutral-500 font-sans">
                          Phản hồi trong 24 giờ
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </FadeInLeft>

              <FadeInRight>
                <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
                  Sơ Đồ Xưởng
                </h2>
                <ScaleIn>
                  <div className="bg-neutral-200 h-96 border border-neutral-300 mb-8 flex items-center justify-center">
                    <p className="text-neutral-500 font-sans">
                      Bản đồ tương tác xưởng sản xuất
                    </p>
                  </div>
                </ScaleIn>

                <FadeInUp delay={0.3}>
                  <div className="bg-neutral-50 border border-neutral-200 p-8">
                    <h3 className="font-serif text-2xl font-light mb-6 text-neutral-900">
                      Đặt Lịch Ghé Thăm
                    </h3>
                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Họ"
                          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="Tên"
                          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Địa chỉ Email"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                      />
                      <input
                        type="tel"
                        placeholder="Số Điện Thoại"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                      />
                      <textarea
                        placeholder="Chia sẻ về nhu cầu hoặc sở thích của bạn"
                        rows={4}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                      ></textarea>
                      <button
                        type="submit"
                        className="w-full bg-accent-600 hover:bg-accent-700 text-neutral-50 font-medium py-4 transition-colors font-sans"
                      >
                        Đặt Lịch Hẹn
                      </button>
                    </form>
                  </div>
                </FadeInUp>
              </FadeInRight>
            </div>

            <SlideInUp>
              <div className="bg-accent-600 -mx-12 px-12 py-20 border-t border-accent-500">
                <div className="text-center">
                  <h2 className="font-serif text-5xl font-light mb-8 text-neutral-50">
                    Tư Vấn Riêng Tư
                  </h2>
                  <p className="font-sans text-xl text-accent-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Đặt buổi gặp riêng với các nghệ nhân hàng đầu của chúng tôi
                    để thảo luận về tầm nhìn và khám phá các khả năng.
                  </p>
                  <ScaleIn delay={0.3}>
                    <button className="bg-neutral-50 text-accent-700 font-medium px-12 py-4 hover:bg-neutral-100 transition-colors text-lg font-sans">
                      Đặt Buổi Riêng Tư
                    </button>
                  </ScaleIn>
                </div>
              </div>
            </SlideInUp>
          </div>
        ),
      },
    ],
  },
  en: {
    sections: [
      {
        id: "home",
        title: "HOME",
        path: "/",
        color: "bg-neutral-50",
        textColor: "text-neutral-900",
        component: (
          <div className="space-y-20">
            <div className="pt-8">
              <TextReveal className="text-center">
                <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none text-neutral-900">
                  Crafting
                  <br />
                  <span className="font-normal text-accent-600">
                    Excellence
                  </span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto text-center mb-10">
                  A legacy of artisanal craftsmanship, refined through
                  generations of dedication to perfection.
                </p>
              </FadeInUp>
              <FadeInUp delay={0.8}>
                <div className="flex justify-center">
                  <a
                    href="https://shop.tramhuongsonhong.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent-600 hover:bg-accent-700 text-neutral-50 font-medium px-12 py-4 transition-colors font-sans inline-block"
                  >
                    Shop Now
                  </a>
                </div>
              </FadeInUp>
            </div>

            <div className="grid md:grid-cols-2 gap-20 py-16">
              <FadeInLeft>
                <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
                  Our Heritage
                </h2>
                <div className="space-y-6 text-neutral-600 leading-relaxed">
                  <p>
                    Since 1985, we have been quietly perfecting our craft in the
                    heart of the city. What began as a small workshop has
                    evolved into something more profound—a sanctuary where
                    time-honored techniques meet contemporary vision.
                  </p>
                  <p>
                    Each piece we create carries within it the whispers of
                    tradition, the precision of modern innovation, and the soul
                    of true artisanship. We do not simply make products; we
                    craft experiences, memories, and heirlooms.
                  </p>
                </div>
                <ScaleIn delay={0.3}>
                  <div className="mt-12 p-8 bg-accent-50 border-l-2 border-accent-400">
                    <p className="font-serif text-lg text-accent-800 italic leading-relaxed">
                      "In every grain of wood, every curve of metal, we find the
                      story waiting to be told."
                    </p>
                    <p className="text-sm text-accent-600 mt-3 font-sans">
                      — Master Craftsman, 1985
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
                  Philosophy
                </h2>
              </FadeInUp>
              <StaggerContainer className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Timeless Design",
                    description:
                      "We create pieces that transcend trends, focusing on enduring beauty and functionality.",
                    symbol: "∞",
                  },
                  {
                    title: "Mindful Process",
                    description:
                      "Every step is considered, every detail contemplated, every choice deliberate.",
                    symbol: "◯",
                  },
                  {
                    title: "Authentic Materials",
                    description:
                      "We source only the finest materials, respecting their natural character and origin.",
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
                    By the Numbers
                  </h2>
                  <StaggerContainer
                    className="grid md:grid-cols-4 gap-8"
                    staggerDelay={0.15}
                  >
                    <StaggerItem>
                      <div className="font-mono text-4xl font-light text-accent-600 mb-2">
                        38
                      </div>
                      <p className="text-neutral-600 font-sans">
                        Years of Mastery
                      </p>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="font-mono text-4xl font-light text-accent-600 mb-2">
                        2.4K
                      </div>
                      <p className="text-neutral-600 font-sans">
                        Pieces Created
                      </p>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="font-mono text-4xl font-light text-accent-600 mb-2">
                        99.8%
                      </div>
                      <p className="text-neutral-600 font-sans">
                        Client Satisfaction
                      </p>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="font-mono text-4xl font-light text-accent-600 mb-2">
                        ∞
                      </div>
                      <p className="text-neutral-600 font-sans">
                        Lifetime Value
                      </p>
                    </StaggerItem>
                  </StaggerContainer>
                </div>
              </div>
            </SlideInUp>
          </div>
        ),
      },
      {
        id: "collection",
        title: "PRODUCTS",
        path: "/collection",
        color: "bg-neutral-900",
        textColor: "text-neutral-50",
        component: (
          <div className="space-y-20">
            <div className="pt-12 text-center">
              <TextReveal>
                <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none">
                  The
                  <br />
                  <span className="font-normal text-primary-400">
                    Collection
                  </span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8 bg-neutral-600" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                  Curated pieces that embody our commitment to excellence, each
                  telling its own story of craftsmanship and care.
                </p>
              </FadeInUp>
            </div>

            <StaggerContainer
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.1}
            >
              {[
                {
                  name: "Heritage Series",
                  price: "From $1,200",
                  description:
                    "Timeless pieces inspired by classical design principles and traditional techniques.",
                  details: [
                    "Hand-selected materials",
                    "Traditional joinery",
                    "Lifetime guarantee",
                  ],
                },
                {
                  name: "Modern Minimalist",
                  price: "From $800",
                  description:
                    "Clean lines and purposeful design for contemporary living spaces.",
                  details: [
                    "Sustainable sourcing",
                    "Precision engineering",
                    "Modular design",
                  ],
                },
                {
                  name: "Artisan Collection",
                  price: "From $2,000",
                  description:
                    "One-of-a-kind pieces showcasing the pinnacle of our craftspeople's skill.",
                  details: [
                    "Unique designs",
                    "Master crafted",
                    "Signed & numbered",
                  ],
                },
                {
                  name: "Custom Commissions",
                  price: "Quote on request",
                  description:
                    "Bespoke creations tailored to your vision and space requirements.",
                  details: [
                    "Personal consultation",
                    "3D visualization",
                    "White-glove delivery",
                  ],
                },
                {
                  name: "Restoration Services",
                  price: "Assessment required",
                  description:
                    "Bringing cherished pieces back to their original glory with expert care.",
                  details: [
                    "Damage assessment",
                    "Period-appropriate methods",
                    "Documentation included",
                  ],
                },
                {
                  name: "Limited Editions",
                  price: "From $3,500",
                  description:
                    "Exclusive pieces available in very limited quantities for discerning collectors.",
                  details: [
                    "Collector's certificate",
                    "Exclusive materials",
                    "Investment grade",
                  ],
                },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="border border-neutral-700 bg-neutral-800 hover:border-neutral-600 transition-colors">
                    <div className="bg-neutral-700 h-48 border-b border-neutral-600"></div>
                    <div className="p-8">
                      <h3 className="font-serif text-2xl font-light mb-3 text-neutral-50">
                        {item.name}
                      </h3>
                      <p className="font-mono text-lg text-primary-400 mb-4">
                        {item.price}
                      </p>
                      <p className="text-neutral-300 leading-relaxed mb-6 font-sans">
                        {item.description}
                      </p>
                      <div className="space-y-2 mb-8">
                        {item.details.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-1 h-1 bg-primary-400"></div>
                            <span className="text-neutral-400 text-sm font-sans">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button className="w-full bg-primary-600 hover:bg-primary-700 text-neutral-900 font-medium py-3 transition-colors font-sans">
                        Inquire
                      </button>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <SlideInUp>
              <div className="bg-primary-600 -mx-12 px-12 py-20 border-t border-primary-500">
                <div className="text-center">
                  <h2 className="font-serif text-5xl font-light mb-8 text-neutral-900">
                    Bespoke Service
                  </h2>
                  <p className="font-sans text-xl text-neutral-800 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Every piece can be customized to your exact specifications.
                    Our artisans work closely with you to bring your vision to
                    life.
                  </p>
                  <FadeInUp delay={0.3}>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-1 px-6 py-4 bg-neutral-50 text-neutral-900 border border-neutral-300 focus:outline-none focus:border-neutral-500 font-sans transition-colors"
                      />
                      <button className="bg-neutral-900 text-neutral-50 font-medium px-8 py-4 hover:bg-neutral-800 transition-colors font-sans">
                        Begin Consultation
                      </button>
                    </div>
                  </FadeInUp>
                </div>
              </div>
            </SlideInUp>
          </div>
        ),
      },
      {
        id: "services",
        title: "SERVICES",
        path: "/services",
        color: "bg-accent-50",
        textColor: "text-neutral-900",
        component: (
          <div className="space-y-20">
            <div className="pt-12 text-center">
              <TextReveal>
                <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none text-neutral-900">
                  Our
                  <br />
                  <span className="font-normal text-accent-700">Services</span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Beyond creation, we offer comprehensive services to ensure
                  your pieces remain treasured for generations.
                </p>
              </FadeInUp>
            </div>

            <StaggerContainer
              className="grid md:grid-cols-2 gap-16"
              staggerDelay={0.2}
            >
              {[
                {
                  title: "Design Consultation",
                  price: "Complimentary",
                  description:
                    "Personal guidance from our design experts to realize your vision.",
                  process: [
                    "Initial discovery session",
                    "Space assessment and measurements",
                    "Material and finish selection",
                    "Detailed proposal and timeline",
                  ],
                },
                {
                  title: "White-Glove Delivery",
                  price: "From $200",
                  description:
                    "Professional installation and setup service for your peace of mind.",
                  process: [
                    "Scheduled delivery appointment",
                    "Professional installation team",
                    "Final positioning and adjustment",
                    "Care instruction walkthrough",
                  ],
                },
                {
                  title: "Maintenance Program",
                  price: "$150 annually",
                  description:
                    "Preserve the beauty and integrity of your pieces with expert care.",
                  process: [
                    "Annual professional inspection",
                    "Cleaning and conditioning",
                    "Minor repair and adjustment",
                    "Detailed condition report",
                  ],
                },
                {
                  title: "Restoration & Repair",
                  price: "Assessment required",
                  description:
                    "Expert restoration services to return pieces to their original condition.",
                  process: [
                    "Comprehensive damage assessment",
                    "Restoration plan and timeline",
                    "Period-appropriate techniques",
                    "Quality assurance and warranty",
                  ],
                },
              ].map((service, index) => (
                <StaggerItem key={index}>
                  <div className="bg-neutral-50 border border-neutral-200 p-10 hover:border-neutral-300 transition-colors">
                    <h3 className="font-serif text-3xl font-light mb-4 text-neutral-900">
                      {service.title}
                    </h3>
                    <p className="font-mono text-lg text-accent-600 mb-6">
                      {service.price}
                    </p>
                    <p className="text-neutral-600 leading-relaxed mb-8 font-sans">
                      {service.description}
                    </p>
                    <div className="space-y-4 mb-10">
                      <h4 className="font-sans font-medium text-neutral-900">
                        Process:
                      </h4>
                      {service.process.map((step, idx) => (
                        <FadeInLeft key={idx} delay={idx * 0.1}>
                          <div className="flex items-start space-x-4">
                            <div className="font-mono text-sm text-accent-600 mt-1">
                              {String(idx + 1).padStart(2, "0")}
                            </div>
                            <span className="text-neutral-600 font-sans">
                              {step}
                            </span>
                          </div>
                        </FadeInLeft>
                      ))}
                    </div>
                    <button className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-50 font-medium py-4 transition-colors font-sans">
                      Learn More
                    </button>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <SlideInUp>
              <div className="bg-neutral-900 -mx-12 px-12 py-20 border-t border-neutral-800">
                <div className="text-center">
                  <h2 className="font-serif text-5xl font-light mb-8 text-neutral-50">
                    Service Packages
                  </h2>
                  <p className="font-sans text-xl text-neutral-300 mb-16 max-w-2xl mx-auto leading-relaxed">
                    Comprehensive care packages designed to protect your
                    investment and maintain its beauty over time.
                  </p>
                  <StaggerContainer
                    className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    staggerDelay={0.15}
                  >
                    {[
                      {
                        name: "Essential Care",
                        price: "$299/year",
                        features: [
                          "Annual maintenance",
                          "Basic repairs",
                          "Phone consultation",
                        ],
                        highlight: false,
                      },
                      {
                        name: "Premium Care",
                        price: "$599/year",
                        features: [
                          "Bi-annual service",
                          "Priority repairs",
                          "On-site consultation",
                          "Emergency support",
                        ],
                        highlight: true,
                      },
                      {
                        name: "Collector's Care",
                        price: "$999/year",
                        features: [
                          "Quarterly service",
                          "All repairs included",
                          "Dedicated specialist",
                          "Insurance liaison",
                        ],
                        highlight: false,
                      },
                    ].map((pkg, index) => (
                      <StaggerItem key={index}>
                        <div
                          className={`p-8 border-2 hover:scale-105 transition-all duration-300 ${
                            pkg.highlight
                              ? "border-primary-400 bg-primary-50"
                              : "border-neutral-700 bg-neutral-800"
                          }`}
                        >
                          <h3
                            className={`font-serif text-2xl font-light mb-3 ${
                              pkg.highlight
                                ? "text-neutral-900"
                                : "text-neutral-50"
                            }`}
                          >
                            {pkg.name}
                          </h3>
                          <p
                            className={`font-mono text-2xl mb-6 ${
                              pkg.highlight
                                ? "text-accent-700"
                                : "text-primary-400"
                            }`}
                          >
                            {pkg.price}
                          </p>
                          <div className="space-y-3">
                            {pkg.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className={`font-sans text-sm ${
                                  pkg.highlight
                                    ? "text-neutral-700"
                                    : "text-neutral-300"
                                }`}
                              >
                                • {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </SlideInUp>
          </div>
        ),
      },
      {
        id: "atelier",
        title: "ATELIER",
        path: "/atelier",
        color: "bg-neutral-100",
        textColor: "text-neutral-900",
        content: {
          description:
            "Visit our workshop and showroom to experience our craft firsthand and meet the artisans behind each piece.",
          locationTitle: "Location & Hours",
          mainAtelierTitle: "Main Atelier",
          mainAtelierAddress:
            "127 Artisan Quarter\nNew York, NY 10013\nUnited States",
          visitingHoursTitle: "Visiting Hours",
          visitingHours: [
            "Tuesday - Friday: 10:00 AM - 6:00 PM",
            "Saturday: 11:00 AM - 5:00 PM",
            "Sunday & Monday: By appointment",
          ],
          contactTitle: "Contact",
          contactNumber: "(212) 555-0127",
          contactRecommendation: "Appointments recommended",
          emailTitle: "Email",
          emailAddress: "atelier@craftworks.com",
          emailResponseTime: "Response within 24 hours",
          workshopMapTitle: "Workshop Map",
          workshopMapDescription: "Interactive Workshop Map",
          scheduleVisitTitle: "Schedule a Visit",
          firstNamePlaceholder: "First Name",
          lastNamePlaceholder: "Last Name",
          emailPlaceholder: "Email Address",
          phonePlaceholder: "Phone Number",
          projectPlaceholder: "Tell us about your project or interests",
          requestAppointmentButtonText: "Request Appointment",
          privateConsultationsTitle: "Private Consultations",
          privateConsultationsDescription:
            "Book an exclusive one-on-one session with our master craftspeople to discuss your vision and explore possibilities.",
          bookPrivateSessionButtonText: "Book Private Session",
        },
        component: (
          <div className="space-y-20">
            <div className="pt-12 text-center">
              <TextReveal>
                <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none text-neutral-900">
                  The
                  <br />
                  <span className="font-normal text-accent-700">Atelier</span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Visit our workshop and showroom to experience our craft
                  firsthand and meet the artisans behind each piece.
                </p>
              </FadeInUp>
            </div>

            <div className="grid md:grid-cols-2 gap-20">
              <FadeInLeft>
                <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
                  Location & Hours
                </h2>
                <StaggerContainer className="space-y-8" staggerDelay={0.15}>
                  <StaggerItem>
                    <div className="flex items-start space-x-6">
                      <MapPin className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">
                          Main Atelier
                        </h3>
                        <p className="text-neutral-600 font-sans leading-relaxed">
                          127 Artisan Quarter
                          <br />
                          New York, NY 10013
                          <br />
                          United States
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start space-x-6">
                      <Clock className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">
                          Visiting Hours
                        </h3>
                        <div className="text-neutral-600 space-y-1 font-sans">
                          <p>Tuesday - Friday: 10:00 AM - 6:00 PM</p>
                          <p>Saturday: 11:00 AM - 5:00 PM</p>
                          <p>Sunday & Monday: By appointment</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start space-x-6">
                      <Phone className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">
                          Contact
                        </h3>
                        <p className="text-neutral-600 font-sans">
                          (212) 555-0127
                        </p>
                        <p className="text-sm text-neutral-500 font-sans">
                          Appointments recommended
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start space-x-6">
                      <Mail className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">
                          Email
                        </h3>
                        <p className="text-neutral-600 font-sans">
                          atelier@craftworks.com
                        </p>
                        <p className="text-sm text-neutral-500 font-sans">
                          Response within 24 hours
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </FadeInLeft>

              <FadeInRight>
                <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
                  Workshop Map
                </h2>
                <ScaleIn>
                  <div className="bg-neutral-200 h-96 border border-neutral-300 mb-8 flex items-center justify-center">
                    <p className="text-neutral-500 font-sans">
                      Interactive Workshop Map
                    </p>
                  </div>
                </ScaleIn>

                <FadeInUp delay={0.3}>
                  <div className="bg-neutral-50 border border-neutral-200 p-8">
                    <h3 className="font-serif text-2xl font-light mb-6 text-neutral-900">
                      Schedule a Visit
                    </h3>
                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                      />
                      <textarea
                        placeholder="Tell us about your project or interests"
                        rows={4}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                      ></textarea>
                      <button
                        type="submit"
                        className="w-full bg-accent-600 hover:bg-accent-700 text-neutral-50 font-medium py-4 transition-colors font-sans"
                      >
                        Request Appointment
                      </button>
                    </form>
                  </div>
                </FadeInUp>
              </FadeInRight>
            </div>

            <SlideInUp>
              <div className="bg-accent-600 -mx-12 px-12 py-20 border-t border-accent-500">
                <div className="text-center">
                  <h2 className="font-serif text-5xl font-light mb-8 text-neutral-50">
                    Private Consultations
                  </h2>
                  <p className="font-sans text-xl text-accent-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Book an exclusive one-on-one session with our master
                    craftspeople to discuss your vision and explore
                    possibilities.
                  </p>
                  <ScaleIn delay={0.3}>
                    <button className="bg-neutral-50 text-accent-700 font-medium px-12 py-4 hover:bg-neutral-100 transition-colors text-lg font-sans">
                      Book Private Session
                    </button>
                  </ScaleIn>
                </div>
              </div>
            </SlideInUp>
          </div>
        ),
      },
      {
        id: "gallery",
        title: "GALLERY",
        path: "/gallery",
        color: "bg-neutral-900",
        textColor: "text-neutral-50",
        component: (
          <div className="space-y-20">
            <div className="pt-12 text-center">
              <TextReveal>
                <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none">
                  Visual
                  <br />
                  <span className="font-normal text-primary-400">Stories</span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8 bg-neutral-600" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                  A curated collection of our work, process, and the spaces
                  where craftsmanship comes to life.
                </p>
              </FadeInUp>
            </div>

            <div>
              <FadeInUp>
                <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">
                  The Workshop
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
                        Workshop {i + 1}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div>
              <FadeInUp>
                <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">
                  Craftsmanship Process
                </h2>
              </FadeInUp>
              <StaggerContainer
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
                staggerDelay={0.08}
              >
                {Array.from({ length: 8 }, (_, i) => (
                  <StaggerItem key={i}>
                    <div className="bg-neutral-800 h-48 border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer hover:scale-105 duration-300">
                      <div className="h-full flex items-center justify-center text-neutral-500 font-sans">
                        Process {i + 1}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div>
              <FadeInUp>
                <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">
                  Featured Pieces
                </h2>
              </FadeInUp>
              <StaggerContainer
                className="grid md:grid-cols-2 gap-8"
                staggerDelay={0.15}
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <StaggerItem key={i}>
                    <div className="bg-neutral-800 border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer hover:scale-105 duration-300">
                      <div className="h-64 bg-neutral-700 border-b border-neutral-600 flex items-center justify-center text-neutral-500 font-sans">
                        Featured {i + 1}
                      </div>
                      <div className="p-8">
                        <h3 className="font-serif text-2xl font-light mb-3 text-neutral-50">
                          Masterpiece {i + 1}
                        </h3>
                        <p className="text-neutral-300 text-sm font-sans leading-relaxed">
                          A testament to our commitment to excellence, this
                          piece showcases the harmony between traditional
                          techniques and contemporary vision.
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div>
              <FadeInUp>
                <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">
                  Behind the Scenes
                </h2>
              </FadeInUp>
              <StaggerContainer
                className="grid md:grid-cols-5 gap-3"
                staggerDelay={0.03}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <StaggerItem key={i}>
                    <div className="bg-neutral-800 h-32 border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer hover:scale-105 duration-300">
                      <div className="h-full flex items-center justify-center text-neutral-500 text-sm font-sans">
                        BTS {i + 1}
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
                    Commission Documentation
                  </h2>
                  <p className="font-sans text-xl text-neutral-800 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Every commissioned piece is documented from conception to
                    completion, creating a visual story of its creation.
                  </p>
                  <ScaleIn delay={0.3}>
                    <button className="bg-neutral-900 text-neutral-50 font-medium px-12 py-4 hover:bg-neutral-800 transition-colors text-lg font-sans">
                      View Process Gallery
                    </button>
                  </ScaleIn>
                </div>
              </div>
            </SlideInUp>
          </div>
        ),
      },
    ],
  },
};

export default appConfig;
