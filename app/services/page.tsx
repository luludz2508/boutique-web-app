import {
  FadeInUp,
  FadeInLeft,
  FadeIn,
  SlideInUp,
  StaggerContainer,
  StaggerItem,
  DrawLine,
  TextReveal,
} from "@/components/animations/viewport-animations";
import content from "@/config/content";

// Export the content component for the accordion layout
export function ServicesContent() {
  const currentLocale = "vi";
  const pageContent = content[currentLocale].services;

  return (
    <div className="space-y-20">
      <div className="pt-12 text-center">
        <TextReveal>
          <h1 className="font-serif text-6xl font-light mb-8 tracking-tight leading-none text-neutral-900">
            {pageContent.title}
            <br />
            <span className="font-normal text-accent-700">
              {pageContent.subtitle}
            </span>
          </h1>
        </TextReveal>
        <FadeIn delay={0.5}>
          <DrawLine className="w-32 mx-auto mb-8" />
        </FadeIn>
        <FadeInUp delay={0.8}>
          <p className="font-sans text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {pageContent.description}
          </p>
        </FadeInUp>
      </div>

      <StaggerContainer
        className="grid md:grid-cols-2 gap-16"
        staggerDelay={0.2}
      >
        {pageContent.services?.map((service, index) => (
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
                      <span className="text-neutral-600 font-sans">{step}</span>
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
        <div className="bg-neutral-900 -mx-16 px-16 py-20 border-t border-neutral-800">
          <div className="text-center">
            <h2 className="font-serif text-5xl font-light mb-8 text-neutral-50">
              Gói Dịch Vụ
            </h2>
            <p className="font-sans text-xl text-neutral-300 mb-16 max-w-2xl mx-auto leading-relaxed">
              Các gói chăm sóc toàn diện được thiết kế để bảo vệ khoản đầu tư
              của bạn và duy trì vẻ đẹp theo thời gian.
            </p>
            <StaggerContainer
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              staggerDelay={0.15}
            >
              {pageContent.packages?.map((pkg, index) => (
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
                        pkg.highlight ? "text-neutral-900" : "text-neutral-50"
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className={`font-mono text-2xl mb-6 ${
                        pkg.highlight ? "text-accent-700" : "text-primary-400"
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
  );
}

// Default export for route access
export default ServicesContent;
