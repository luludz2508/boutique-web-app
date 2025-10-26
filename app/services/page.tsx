import {
  FadeInUp,
  FadeInLeft,
  FadeIn,
  SlideInUp,
  StaggerContainer,
  StaggerItem,
  DrawLine,
  TextReveal,
} from '@/components/animations/viewport-animations';
import content from '@/config/content';
import { ImperialCard, ImperialDivider } from '@/components/ui/imperial-elements';

// Export the content component for the accordion layout
export function ServicesContent() {
  const currentLocale = 'vi';
  const pageContent = content[currentLocale].services;

  return (
    <div className="space-y-24">
      {/* Header Section */}
      <div className="pt-12 text-center">
        <TextReveal>
          <h1 className="font-serif text-6xl font-light mb-8 tracking-tight leading-none text-neutral-100">
            {pageContent.title}
            <br />
            <span className="font-normal text-accent-400">{pageContent.subtitle}</span>
          </h1>
        </TextReveal>
        <FadeIn delay={0.5}>
          <ImperialDivider className="mb-8" />
        </FadeIn>
        <FadeInUp delay={0.8}>
          <p className="font-sans text-lg text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            {pageContent.description}
          </p>
        </FadeInUp>
      </div>

      {/* Services Grid */}
      <StaggerContainer className="grid lg:grid-cols-3 gap-8" staggerDelay={0.15}>
        {pageContent.services?.map((service, index) => (
          <StaggerItem key={index}>
            <div className="group h-full">
              <ImperialCard className="h-full p-8 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm border border-neutral-700/50 hover:border-accent-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-500/10">
                {/* Service Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                      <span className="font-mono text-lg font-bold text-neutral-900">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-lg font-semibold text-accent-400">
                        {service.price}
                      </p>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-light mb-4 text-neutral-100 group-hover:text-accent-300 transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Service Description */}
                <div className="mb-8">
                  <p className="text-neutral-300 leading-relaxed text-sm line-clamp-4">
                    {service.description}
                  </p>
                </div>

                {/* Process Steps */}
                <div className="space-y-3 mb-8">
                  <h4 className="font-sans font-medium text-neutral-200 text-sm uppercase tracking-wider">
                    Quy Trình
                  </h4>
                  <div className="space-y-2">
                    {service.process.map((step, idx) => (
                      <FadeInLeft key={idx} delay={idx * 0.1}>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-accent-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                          </div>
                          <span className="text-neutral-400 text-sm leading-relaxed">{step}</span>
                        </div>
                      </FadeInLeft>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <button className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-neutral-900 font-medium py-3 px-6 rounded-lg transition-all duration-300 font-sans text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-accent-500/25">
                    Tìm Hiểu Thêm
                  </button>
                </div>
              </ImperialCard>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Packages Section */}
      <SlideInUp>
        <div className="relative">
          <ImperialCard
            variant="outlined"
            className="p-16 bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm border border-neutral-700/50"
          >
            <div className="text-center mb-16">
              <h2 className="font-serif text-5xl font-light mb-8 text-neutral-100">Gói Dịch Vụ</h2>
              <ImperialDivider variant="lotus" className="mb-8" />
              <p className="font-sans text-xl text-neutral-300 mb-16 max-w-3xl mx-auto leading-relaxed">
                Các gói chăm sóc toàn diện được thiết kế để bảo vệ khoản đầu tư của bạn và duy trì
                vẻ đẹp theo thời gian.
              </p>
            </div>

            <StaggerContainer
              className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
              staggerDelay={0.2}
            >
              {pageContent.packages?.map((pkg, index) => (
                <StaggerItem key={index}>
                  <div className={`relative ${pkg.highlight ? 'lg:scale-105' : ''}`}>
                    {pkg.highlight && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-neutral-900 px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                          Phổ Biến
                        </div>
                      </div>
                    )}
                    <ImperialCard
                      variant={pkg.highlight ? 'elevated' : 'default'}
                      className={`h-full p-8 ${
                        pkg.highlight
                          ? 'bg-gradient-to-br from-accent-500/10 to-accent-600/10 border-accent-500/50'
                          : 'bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 border-neutral-700/50'
                      } backdrop-blur-sm hover:border-accent-500/50 transition-all duration-500`}
                    >
                      <div className="text-center mb-8">
                        <h3 className="font-serif text-2xl font-light mb-4 text-neutral-100">
                          {pkg.name}
                        </h3>
                        <div className="mb-6">
                          <p className="font-mono text-3xl font-bold text-accent-400">
                            {pkg.price}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                pkg.highlight ? 'bg-accent-500/20' : 'bg-neutral-600/50'
                              }`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  pkg.highlight ? 'bg-accent-500' : 'bg-neutral-400'
                                }`}
                              ></div>
                            </div>
                            <span
                              className={`text-sm leading-relaxed ${
                                pkg.highlight ? 'text-neutral-200' : 'text-neutral-400'
                              }`}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8">
                        <button
                          className={`w-full py-3 px-6 rounded-lg font-sans text-sm uppercase tracking-wider transition-all duration-300 ${
                            pkg.highlight
                              ? 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-neutral-900 hover:shadow-lg hover:shadow-accent-500/25'
                              : 'bg-gradient-to-r from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700 text-neutral-200 hover:shadow-lg hover:shadow-neutral-500/25'
                          }`}
                        >
                          Chọn Gói
                        </button>
                      </div>
                    </ImperialCard>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ImperialCard>
        </div>
      </SlideInUp>
    </div>
  );
}

// Default export for route access
export default ServicesContent;
