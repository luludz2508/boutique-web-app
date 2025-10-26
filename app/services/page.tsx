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
    <div className="space-y-20">
      <div className="pt-12 text-center">
        <TextReveal>
          <h1 className="font-serif text-6xl font-light mb-8 tracking-tight leading-none text-neutral-900">
            {pageContent.title}
            <br />
            <span className="font-normal text-accent-700">{pageContent.subtitle}</span>
          </h1>
        </TextReveal>
        <FadeIn delay={0.5}>
          <ImperialDivider className="mb-8" />
        </FadeIn>
        <FadeInUp delay={0.8}>
          <p className="font-sans text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {pageContent.description}
          </p>
        </FadeInUp>
      </div>

      <StaggerContainer className="grid md:grid-cols-2 gap-16" staggerDelay={0.2}>
        {pageContent.services?.map((service, index) => (
          <StaggerItem key={index}>
            <ImperialCard className="p-10 bg-gradient-to-br from-neutral-50 to-accent-50">
              <h3 className="font-serif text-3xl font-light mb-4 text-neutral-900">
                {service.title}
              </h3>
              <p className="font-mono text-lg text-accent-600 mb-6">{service.price}</p>
              <p className="text-neutral-600 leading-relaxed mb-8 font-sans">
                {service.description}
              </p>
              <div className="space-y-4 mb-10">
                <h4 className="font-sans font-medium text-neutral-900">Process:</h4>
                {service.process.map((step, idx) => (
                  <FadeInLeft key={idx} delay={idx * 0.1}>
                    <div className="flex items-start space-x-4">
                      <div className="font-mono text-sm text-accent-600 mt-1">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <span className="text-neutral-600 font-sans">{step}</span>
                    </div>
                  </FadeInLeft>
                ))}
              </div>
              <button className="w-full bg-accent-600 hover:bg-accent-700 text-neutral-50 font-medium py-4 transition-colors font-sans">
                Tìm Hiểu Thêm
              </button>
            </ImperialCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <SlideInUp>
        <ImperialCard
          variant="outlined"
          className="p-16 bg-gradient-to-br from-accent-50 to-neutral-100"
        >
          <div className="text-center">
            <h2 className="font-serif text-5xl font-light mb-8 text-neutral-900">Gói Dịch Vụ</h2>
            <ImperialDivider variant="pattern" className="mb-8" />
            <p className="font-sans text-xl text-neutral-600 mb-16 max-w-2xl mx-auto leading-relaxed">
              Các gói chăm sóc toàn diện được thiết kế để bảo vệ khoản đầu tư của bạn và duy trì vẻ
              đẹp theo thời gian.
            </p>
            <StaggerContainer
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              staggerDelay={0.15}
            >
              {pageContent.packages?.map((pkg, index) => (
                <StaggerItem key={index}>
                  <ImperialCard
                    variant={pkg.highlight ? 'elevated' : 'default'}
                    className={`p-8 ${pkg.highlight ? 'bg-gradient-to-br from-accent-100 to-accent-50' : 'bg-gradient-to-br from-neutral-100 to-neutral-50'}`}
                  >
                    <h3 className="font-serif text-2xl font-light mb-3 text-neutral-900">
                      {pkg.name}
                    </h3>
                    <p className="font-mono text-2xl mb-6 text-accent-600">{pkg.price}</p>
                    <div className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="font-sans text-sm text-neutral-600">
                          • {feature}
                        </div>
                      ))}
                    </div>
                  </ImperialCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </ImperialCard>
      </SlideInUp>
    </div>
  );
}

// Default export for route access
export default ServicesContent;
