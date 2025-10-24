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
import appConfig from "@/config/app-config";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function AtelierPage() {
  const currentLocale = "vi";
  const atelierSection = appConfig[currentLocale]?.sections?.find(
    (section) => section.id === "atelier"
  );

  if (!atelierSection) {
    return <div>Atelier section not found.</div>;
  }
  const content = {
    description: "",
    locationTitle: "",
    mainAtelierTitle: "",
    mainAtelierAddress: "",
    visitingHoursTitle: "",
    visitingHours: [] as string[],
    contactTitle: "",
    contactNumber: "",
    contactRecommendation: "",
    emailTitle: "",
    emailAddress: "",
    emailResponseTime: "",
    workshopMapTitle: "",
    workshopMapDescription: "",
    scheduleVisitTitle: "",
    firstNamePlaceholder: "",
    lastNamePlaceholder: "",
    emailPlaceholder: "",
    phonePlaceholder: "",
    projectPlaceholder: "",
    requestAppointmentButtonText: "",
    privateConsultationsTitle: "",
    privateConsultationsDescription: "",
    bookPrivateSessionButtonText: "",
    ...(atelierSection?.content ?? {}),
  };

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
        {content.description && (
          <FadeInUp delay={0.8}>
            <p className="font-sans text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              {content.description}
            </p>
          </FadeInUp>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-20">
        <FadeInLeft>
          {content.locationTitle && (
            <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
              {content.locationTitle}
            </h2>
          )}
          <StaggerContainer className="space-y-8" staggerDelay={0.15}>
            {content.mainAtelierTitle && content.mainAtelierAddress && (
              <StaggerItem>
                <div className="flex items-start space-x-6">
                  <MapPin className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-sans font-medium text-neutral-900 mb-2">
                      {content.mainAtelierTitle}
                    </h3>
                    <p className="text-neutral-600 font-sans leading-relaxed">
                      {content.mainAtelierAddress}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            )}

            {content.visitingHoursTitle &&
              content.visitingHours?.length > 0 && (
                <StaggerItem>
                  <div className="flex items-start space-x-6">
                    <Clock className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-sans font-medium text-neutral-900 mb-2">
                        {content.visitingHoursTitle}
                      </h3>
                      <div className="text-neutral-600 space-y-1 font-sans">
                        {content.visitingHours.map((hour, index) => (
                          <p key={index}>{hour}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              )}

            {content.contactTitle && content.contactNumber && (
              <StaggerItem>
                <div className="flex items-start space-x-6">
                  <Phone className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-sans font-medium text-neutral-900 mb-2">
                      {content.contactTitle}
                    </h3>
                    <p className="text-neutral-600 font-sans">
                      {content.contactNumber}
                    </p>
                    {content.contactRecommendation && (
                      <p className="text-sm text-neutral-500 font-sans">
                        {content.contactRecommendation}
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            )}

            {content.emailTitle && content.emailAddress && (
              <StaggerItem>
                <div className="flex items-start space-x-6">
                  <Mail className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-sans font-medium text-neutral-900 mb-2">
                      {content.emailTitle}
                    </h3>
                    <p className="text-neutral-600 font-sans">
                      {content.emailAddress}
                    </p>
                    {content.emailResponseTime && (
                      <p className="text-sm text-neutral-500 font-sans">
                        {content.emailResponseTime}
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            )}
          </StaggerContainer>
        </FadeInLeft>

        <FadeInRight>
          {content.workshopMapTitle && (
            <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
              {content.workshopMapTitle}
            </h2>
          )}
          <ScaleIn>
            <div className="bg-neutral-200 h-96 border border-neutral-300 mb-8 flex items-center justify-center">
              <p className="text-neutral-500 font-sans">
                {content.workshopMapDescription || "Interactive Workshop Map"}
              </p>
            </div>
          </ScaleIn>

          {content.scheduleVisitTitle && (
            <FadeInUp delay={0.3}>
              <div className="bg-neutral-50 border border-neutral-200 p-8">
                <h3 className="font-serif text-2xl font-light mb-6 text-neutral-900">
                  {content.scheduleVisitTitle}
                </h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={content.firstNamePlaceholder || "First Name"}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                    />
                    <input
                      type="text"
                      placeholder={content.lastNamePlaceholder || "Last Name"}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder={content.emailPlaceholder || "Email Address"}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder={content.phonePlaceholder || "Phone Number"}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                  />
                  <textarea
                    placeholder={
                      content.projectPlaceholder ||
                      "Tell us about your project or interests"
                    }
                    rows={4}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-accent-600 hover:bg-accent-700 text-neutral-50 font-medium py-4 transition-colors font-sans"
                  >
                    {content.requestAppointmentButtonText ||
                      "Request Appointment"}
                  </button>
                </form>
              </div>
            </FadeInUp>
          )}
        </FadeInRight>
      </div>

      {content.privateConsultationsTitle &&
        content.privateConsultationsDescription && (
          <SlideInUp>
            <div className="bg-accent-600 -mx-16 px-16 py-20 border-t border-accent-500">
              <div className="text-center">
                <h2 className="font-serif text-5xl font-light mb-8 text-neutral-50">
                  {content.privateConsultationsTitle}
                </h2>
                <p className="font-sans text-xl text-accent-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                  {content.privateConsultationsDescription}
                </p>
                <ScaleIn delay={0.3}>
                  <button className="bg-neutral-50 text-accent-700 font-medium px-12 py-4 hover:bg-neutral-100 transition-colors text-lg font-sans">
                    {content.bookPrivateSessionButtonText ||
                      "Book Private Session"}
                  </button>
                </ScaleIn>
              </div>
            </div>
          </SlideInUp>
        )}
    </div>
  );
}
