import {
  FadeInUp,
  FadeIn,
  SlideInUp,
  StaggerContainer,
  StaggerItem,
  DrawLine,
  TextReveal,
} from "@/components/animations/viewport-animations";
import appConfig from "@/config/app-config";

export default function CollectionPage() {
  const currentLocale = "vi";
  const collectionSection = appConfig[currentLocale].sections.find(
    (section) => section.id === "collection"
  );

  if (!collectionSection) {
    return <div>Collection section not found.</div>;
  }

  return (
    <div className="space-y-20">
      <div className="pt-12 text-center">
        <TextReveal>
          <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none">
            The
            <br />
            <span className="font-normal text-primary-400">Collection</span>
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
        {collectionSection.items.map((item, index) => (
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
                    <div key={idx} className="flex items-center space-x-3">
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
        <div className="bg-primary-600 -mx-16 px-16 py-20 border-t border-primary-500">
          <div className="text-center">
            <h2 className="font-serif text-5xl font-light mb-8 text-neutral-900">
              Bespoke Service
            </h2>
            <p className="font-sans text-xl text-neutral-800 mb-12 max-w-2xl mx-auto leading-relaxed">
              Every piece can be customized to your exact specifications. Our
              artisans work closely with you to bring your vision to life.
            </p>
            <FadeInUp delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 bg-neutral-50 text-neutral-900 border border-neutral-300 focus:outline-none focus:border-neutral-500 font-sans"
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
  );
}
