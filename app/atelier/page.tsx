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
import content from "@/config/content";
import { Clock, Mail, MapPin, Phone, Instagram, Globe } from "lucide-react";

// Export the content component for the accordion layout
export function AtelierContent() {
  const currentLocale = "vi";
  const pageContent = content[currentLocale].atelier;

  return (
    <div className="space-y-20">
      <div className="pt-12 text-center">
        <TextReveal>
          <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none text-neutral-900">
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
          <p className="font-sans text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {pageContent.description}
          </p>
        </FadeInUp>
      </div>

      <div className="grid md:grid-cols-2 gap-20">
        <FadeInLeft>
          {pageContent.locationTitle && (
            <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
              {pageContent.locationTitle}
            </h2>
          )}
          <StaggerContainer className="space-y-8" staggerDelay={0.15}>
            {pageContent.mainAtelierTitle && pageContent.mainAtelierAddress && (
              <StaggerItem>
                <div className="flex items-start space-x-6">
                  <MapPin className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-sans font-medium text-neutral-900 mb-2">
                      {pageContent.mainAtelierTitle}
                    </h3>
                    <p className="text-neutral-600 font-sans leading-relaxed">
                      {pageContent.mainAtelierAddress}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            )}

            {pageContent.visitingHoursTitle &&
              pageContent.visitingHours &&
              pageContent.visitingHours.length > 0 && (
                <StaggerItem>
                  <div className="flex items-start space-x-6">
                    <Clock className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-sans font-medium text-neutral-900 mb-2">
                        {pageContent.visitingHoursTitle}
                      </h3>
                      <div className="text-neutral-600 space-y-1 font-sans">
                        {pageContent.visitingHours.map((hour, index) => (
                          <p key={index}>{hour}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              )}

            {pageContent.contactTitle && pageContent.contactNumber && (
              <StaggerItem>
                <div className="flex items-start space-x-6">
                  <Phone className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-sans font-medium text-neutral-900 mb-2">
                      {pageContent.contactTitle}
                    </h3>
                    <p className="text-neutral-600 font-sans">
                      {pageContent.contactNumber}
                    </p>
                    {pageContent.contactRecommendation && (
                      <p className="text-sm text-neutral-500 font-sans">
                        {pageContent.contactRecommendation}
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            )}

            {pageContent.emailTitle && pageContent.emailAddress && (
              <StaggerItem>
                <div className="flex items-start space-x-6">
                  <Mail className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-sans font-medium text-neutral-900 mb-2">
                      {pageContent.emailTitle}
                    </h3>
                    <p className="text-neutral-600 font-sans">
                      {pageContent.emailAddress}
                    </p>
                    {pageContent.emailResponseTime && (
                      <p className="text-sm text-neutral-500 font-sans mt-1">
                        {pageContent.emailResponseTime}
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            )}

            {pageContent.instagramTitle && pageContent.instagramHandle && (
              <StaggerItem>
                <div className="flex items-start space-x-6">
                  <Instagram className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-sans font-medium text-neutral-900 mb-2">
                      {pageContent.instagramTitle}
                    </h3>
                    <a
                      href={`https://instagram.com/${pageContent.instagramHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 font-sans"
                    >
                      @{pageContent.instagramHandle}
                    </a>
                  </div>
                </div>
              </StaggerItem>
            )}

            {pageContent.websiteTitle && pageContent.websiteUrl && (
              <StaggerItem>
                <div className="flex items-start space-x-6">
                  <Globe className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-sans font-medium text-neutral-900 mb-2">
                      {pageContent.websiteTitle}
                    </h3>
                    <a
                      href={`https://${pageContent.websiteUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 font-sans"
                    >
                      {pageContent.websiteUrl}
                    </a>
                  </div>
                </div>
              </StaggerItem>
            )}
          </StaggerContainer>
        </FadeInLeft>

        <FadeInRight>
          <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">
            {pageContent.mapTitle || "Bản Đồ Showroom"}
          </h2>
          <ScaleIn>
            <div className="bg-neutral-200 h-96 border border-neutral-300 mb-8 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.856168698467!2d108.24999!3d16.0544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDAzJzE1LjgiTiAxMDjCsDE0JzU5Ljk2IkU!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Trầm Hương Sơn Hồng Location"
              ></iframe>
            </div>
          </ScaleIn>

          <FadeInUp delay={0.3}>
            <div className="bg-neutral-50 border border-neutral-200 p-8">
              <h3 className="font-serif text-2xl font-light mb-6 text-neutral-900">
                {pageContent.scheduleTitle || "Đặt Lịch Tham Quan"}
              </h3>
              {pageContent.scheduleDescription && (
                <p className="text-neutral-600 font-sans mb-6">
                  {pageContent.scheduleDescription}
                </p>
              )}
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={pageContent.firstNamePlaceholder || "Họ"}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                  />
                  <input
                    type="text"
                    placeholder={pageContent.lastNamePlaceholder || "Tên"}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder={pageContent.emailPlaceholder || "Địa chỉ Email"}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                />
                <input
                  type="tel"
                  placeholder={pageContent.phonePlaceholder || "Số điện thoại"}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                />
                <textarea
                  placeholder={
                    pageContent.messagePlaceholder ||
                    "Cho chúng tôi biết về nhu cầu của bạn"
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-accent-500 font-sans transition-colors"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-accent-600 hover:bg-accent-700 text-neutral-50 font-medium py-4 transition-colors font-sans"
                >
                  {pageContent.submitButton || "Gửi Yêu Cầu"}
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
              {pageContent.consultationTitle || "Tư Vấn Riêng Tư"}
            </h2>
            <p className="font-sans text-xl text-accent-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              {pageContent.consultationDescription ||
                "Dành cho những người sưu tầm và chuyên gia muốn có sự hướng dẫn cá nhân hóa trong việc xây dựng bộ sưu tập trầm hương của họ."}
            </p>
            <ScaleIn delay={0.3}>
              <button className="bg-neutral-50 text-accent-700 font-medium px-12 py-4 hover:bg-neutral-100 transition-colors text-lg font-sans">
                {pageContent.consultationButton || "Đặt Lịch Ngay"}
              </button>
            </ScaleIn>
          </div>
        </div>
      </SlideInUp>
    </div>
  );
}

// Default export for route access
export default AtelierContent;
