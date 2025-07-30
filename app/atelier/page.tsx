import { Phone, Mail, MapPin, Clock } from "lucide-react"
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  FadeIn,
  ScaleIn,
  SlideInUp,
  StaggerContainer,
  StaggerItem,
  DrawLine,
  TextReveal,
} from "@/components/animations/viewport-animations"
import appConfig from "@/config/app-config"

export default function AtelierPage() {
  const currentLocale = "en"
  const atelierSection = appConfig[currentLocale].sections.find((section) => section.id === "atelier")

  if (!atelierSection) {
    return <div>Atelier section not found.</div>
  }

  return (
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
            {atelierSection.content.description}
          </p>
        </FadeInUp>
      </div>

      <div className="grid md:grid-cols-2 gap-20">
        <FadeInLeft>
          <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
            {atelierSection.content.locationTitle}
          </h2>
          <StaggerContainer className="space-y-8" staggerDelay={0.15}>
            <StaggerItem>
              <div className="flex items-start space-x-6">
                <MapPin className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-sans font-medium text-neutral-900 mb-2">
                    {atelierSection.content.mainAtelierTitle}
                  </h3>
                  <p className="text-neutral-600 font-sans leading-relaxed">
                    {atelierSection.content.mainAtelierAddress}
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start space-x-6">
                <Clock className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-sans font-medium text-neutral-900 mb-2">
                    {atelierSection.content.visitingHoursTitle}
                  </h3>
                  <div className="text-neutral-600 space-y-1 font-sans">
                    {atelierSection.content.visitingHours.map((hour) => (
                      <p key={hour}>{hour}</p>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start space-x-6">
                <Phone className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-sans font-medium text-neutral-900 mb-2">{atelierSection.content.contactTitle}</h3>
                  <p className="text-neutral-600 font-sans">{atelierSection.content.contactNumber}</p>
                  <p className="text-sm text-neutral-500 font-sans">{atelierSection.content.contactRecommendation}</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start space-x-6">
                <Mail className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-sans font-medium text-neutral-900 mb-2">{atelierSection.content.emailTitle}</h3>
                  <p className="text-neutral-600 font-sans">{atelierSection.content.emailAddress}</p>
                  <p className="text-sm text-neutral-500 font-sans">{atelierSection.content.emailResponseTime}</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </FadeInLeft>

        <FadeInRight>
          <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
            {atelierSection.content.workshopMapTitle}
          </h2>
          <ScaleIn>
            <div className="bg-neutral-200 h-96 border border-neutral-300 mb-8 flex items-center justify-center">
              <p className="text-neutral-500 font-sans">{atelierSection.content.workshopMapDescription}</p>
            </div>
          </ScaleIn>

          <FadeInUp delay={0.3}>
            <div className="bg-neutral-50 border border-neutral-200 p-8">
              <h3 className="font-serif text-2xl font-light mb-6 text-neutral-900">
                {atelierSection.content.scheduleVisitTitle}
              </h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={atelierSection.content.firstNamePlaceholder}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                  />
                  <input
                    type="text"
                    placeholder={atelierSection.content.lastNamePlaceholder}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder={atelierSection.content.emailPlaceholder}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                />
                <input
                  type="tel"
                  placeholder={atelierSection.content.phonePlaceholder}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                />
                <textarea
                  placeholder={atelierSection.content.projectPlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-accent-600 hover:bg-accent-700 text-neutral-50 font-medium py-4 transition-colors font-sans"
                >
                  {atelierSection.content.requestAppointmentButtonText}
                </button>
              </form>
            </div>
          </FadeInUp>
        </FadeInRight>
      </div>

      <SlideInUp>
        <div className="bg-accent-600 -mx-16 px-16 py-20 border-t border-accent-500">
          <div className="text-center">
            <h2 className="font-serif text-5xl font-light mb-8 text-neutral-50">
              {atelierSection.content.privateConsultationsTitle}
            </h2>
            <p className="font-sans text-xl text-accent-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              {atelierSection.content.privateConsultationsDescription}
            </p>
            <ScaleIn delay={0.3}>
              <button className="bg-neutral-50 text-accent-700 font-medium px-12 py-4 hover:bg-neutral-100 transition-colors text-lg font-sans">
                {atelierSection.content.bookPrivateSessionButtonText}
              </button>
            </ScaleIn>
          </div>
        </div>
      </SlideInUp>
    </div>
  )
}
