'use client';

import { MapComponent } from '@/components/MapComponent';
import { Clock, Mail, MapPin, Phone, Instagram, Globe } from 'lucide-react';
import content from '@/config/content';
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from '@/components/animations/viewport-animations';

export function Footer() {
  const currentLocale = 'vi';
  const atelierContent = content[currentLocale].atelier;

  return (
    <footer className="bg-neutral-900 text-neutral-50 w-full">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <StaggerContainer className="grid md:grid-cols-2 gap-12 lg:gap-16" staggerDelay={0.1}>
          {/* Contact Information */}
          <FadeInUp>
            <div>
              <h2 className="font-serif text-3xl font-light mb-8 text-neutral-50">
                {atelierContent.locationTitle || 'Liên Hệ'}
              </h2>
              <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                {atelierContent.mainAtelierTitle && atelierContent.mainAtelierAddress && (
                  <StaggerItem>
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-5 h-5 text-accent-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-100 mb-1">
                          {atelierContent.mainAtelierTitle}
                        </h3>
                        <p className="text-neutral-300 font-sans leading-relaxed text-sm">
                          {atelierContent.mainAtelierAddress}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                )}

                {atelierContent.visitingHoursTitle &&
                  atelierContent.visitingHours &&
                  atelierContent.visitingHours.length > 0 && (
                    <StaggerItem>
                      <div className="flex items-start space-x-4">
                        <Clock className="w-5 h-5 text-accent-400 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-sans font-medium text-neutral-100 mb-2">
                            {atelierContent.visitingHoursTitle}
                          </h3>
                          <div className="text-neutral-300 space-y-1 font-sans text-sm">
                            {atelierContent.visitingHours.map((hour, index) => (
                              <p key={index}>{hour}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  )}

                {atelierContent.contactTitle && atelierContent.contactNumber && (
                  <StaggerItem>
                    <div className="flex items-start space-x-4">
                      <Phone className="w-5 h-5 text-accent-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-100 mb-1">
                          {atelierContent.contactTitle}
                        </h3>
                        <a
                          href={`tel:${atelierContent.contactNumber.replace(/\s/g, '')}`}
                          className="text-accent-400 hover:text-accent-300 font-sans text-sm transition-colors"
                        >
                          {atelierContent.contactNumber}
                        </a>
                      </div>
                    </div>
                  </StaggerItem>
                )}

                {atelierContent.emailTitle && atelierContent.emailAddress && (
                  <StaggerItem>
                    <div className="flex items-start space-x-4">
                      <Mail className="w-5 h-5 text-accent-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-100 mb-1">
                          {atelierContent.emailTitle}
                        </h3>
                        <a
                          href={`mailto:${atelierContent.emailAddress}`}
                          className="text-accent-400 hover:text-accent-300 font-sans text-sm transition-colors"
                        >
                          {atelierContent.emailAddress}
                        </a>
                      </div>
                    </div>
                  </StaggerItem>
                )}

                {atelierContent.instagramTitle && atelierContent.instagramHandle && (
                  <StaggerItem>
                    <div className="flex items-start space-x-4">
                      <Instagram className="w-5 h-5 text-accent-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-100 mb-1">
                          {atelierContent.instagramTitle}
                        </h3>
                        <a
                          href={`https://instagram.com/${atelierContent.instagramHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-400 hover:text-accent-300 font-sans text-sm transition-colors"
                        >
                          @{atelierContent.instagramHandle}
                        </a>
                      </div>
                    </div>
                  </StaggerItem>
                )}

                {atelierContent.websiteTitle && atelierContent.websiteUrl && (
                  <StaggerItem>
                    <div className="flex items-start space-x-4">
                      <Globe className="w-5 h-5 text-accent-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-100 mb-1">
                          {atelierContent.websiteTitle}
                        </h3>
                        <a
                          href={`https://${atelierContent.websiteUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-400 hover:text-accent-300 font-sans text-sm transition-colors"
                        >
                          {atelierContent.websiteUrl}
                        </a>
                      </div>
                    </div>
                  </StaggerItem>
                )}
              </StaggerContainer>
            </div>
          </FadeInUp>

          {/* Map */}
          <FadeInUp delay={0.2}>
            <div>
              <h2 className="font-serif text-3xl font-light mb-8 text-neutral-50">
                {atelierContent.mapTitle || 'Bản Đồ Showroom'}
              </h2>
              <div className="aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden border border-neutral-700">
                <MapComponent
                  address={'680 Võ Nguyên Giáp, P.Khuê Mỹ, quận Ngũ Hành Sơn, Đà Nẵng, Việt Nam'}
                  title="Trầm Hương Sơn Hồng - Showroom Location"
                />
              </div>
            </div>
          </FadeInUp>
        </StaggerContainer>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-700 text-center">
          <p className="text-neutral-400 font-sans text-sm">
            © {new Date().getFullYear()} Trầm Hương Sơn Hồng. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
