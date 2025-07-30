import type { ReactNode } from "react"
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

interface SectionConfig {
  id: string
  title: string
  path: string
  color: string
  textColor: string
  component: ReactNode // This will be the JSX content for the section
}

interface AppConfig {
  [locale: string]: {
    sections: SectionConfig[]
  }
}

const appConfig: AppConfig = {
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
            <div className="pt-12">
              <TextReveal className="text-center">
                <h1 className="font-serif text-8xl font-light mb-8 tracking-tight leading-none text-neutral-900">
                  Crafting
                  <br />
                  <span className="font-normal text-accent-600">Excellence</span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto text-center">
                  A legacy of artisanal craftsmanship, refined through generations of dedication to perfection.
                </p>
              </FadeInUp>
            </div>

            <div className="grid md:grid-cols-2 gap-20 py-16">
              <FadeInLeft>
                <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">Our Heritage</h2>
                <div className="space-y-6 text-neutral-600 leading-relaxed">
                  <p>
                    Since 1985, we have been quietly perfecting our craft in the heart of the city. What began as a
                    small workshop has evolved into something more profound—a sanctuary where time-honored techniques
                    meet contemporary vision.
                  </p>
                  <p>
                    Each piece we create carries within it the whispers of tradition, the precision of modern
                    innovation, and the soul of true artisanship. We do not simply make products; we craft experiences,
                    memories, and heirlooms.
                  </p>
                </div>
                <ScaleIn delay={0.3}>
                  <div className="mt-12 p-8 bg-accent-50 border-l-2 border-accent-400">
                    <p className="font-serif text-lg text-accent-800 italic leading-relaxed">
                      "In every grain of wood, every curve of metal, we find the story waiting to be told."
                    </p>
                    <p className="text-sm text-accent-600 mt-3 font-sans">— Master Craftsman, 1985</p>
                  </div>
                </ScaleIn>
              </FadeInLeft>
              <FadeInRight>
                <div className="bg-neutral-200 h-96 border border-neutral-300" />
              </FadeInRight>
            </div>

            <div className="py-16">
              <FadeInUp>
                <h2 className="font-serif text-5xl font-light mb-16 text-center text-neutral-900">Philosophy</h2>
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
                    description: "Every step is considered, every detail contemplated, every choice deliberate.",
                    symbol: "◯",
                  },
                  {
                    title: "Authentic Materials",
                    description: "We source only the finest materials, respecting their natural character and origin.",
                    symbol: "△",
                  },
                ].map((principle, index) => (
                  <StaggerItem key={index} className="text-center">
                    <div className="text-6xl font-light text-accent-500 mb-6">{principle.symbol}</div>
                    <h3 className="font-serif text-2xl font-light mb-4 text-neutral-900">{principle.title}</h3>
                    <p className="text-neutral-600 leading-relaxed font-sans">{principle.description}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <SlideInUp>
              <div className="py-16 bg-neutral-100 -mx-12 px-12 border-t border-b border-neutral-200">
                <div className="text-center">
                  <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">By the Numbers</h2>
                  <StaggerContainer className="grid md:grid-cols-4 gap-8" staggerDelay={0.15}>
                    <StaggerItem>
                      <div className="font-mono text-4xl font-light text-accent-600 mb-2">38</div>
                      <p className="text-neutral-600 font-sans">Years of Mastery</p>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="font-mono text-4xl font-light text-accent-600 mb-2">2.4K</div>
                      <p className="text-neutral-600 font-sans">Pieces Created</p>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="font-mono text-4xl font-light text-accent-600 mb-2">99.8%</div>
                      <p className="text-neutral-600 font-sans">Client Satisfaction</p>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="font-mono text-4xl font-light text-accent-600 mb-2">∞</div>
                      <p className="text-neutral-600 font-sans">Lifetime Value</p>
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
        title: "COLLECTION",
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
                  <span className="font-normal text-primary-400">Collection</span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.5}>
                <DrawLine className="w-32 mx-auto mb-8 bg-neutral-600" />
              </FadeIn>
              <FadeInUp delay={0.8}>
                <p className="font-sans text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                  Curated pieces that embody our commitment to excellence, each telling its own story of craftsmanship
                  and care.
                </p>
              </FadeInUp>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
              {[
                {
                  name: "Heritage Series",
                  price: "From $1,200",
                  description: "Timeless pieces inspired by classical design principles and traditional techniques.",
                  details: ["Hand-selected materials", "Traditional joinery", "Lifetime guarantee"],
                },
                {
                  name: "Modern Minimalist",
                  price: "From $800",
                  description: "Clean lines and purposeful design for contemporary living spaces.",
                  details: ["Sustainable sourcing", "Precision engineering", "Modular design"],
                },
                {
                  name: "Artisan Collection",
                  price: "From $2,000",
                  description: "One-of-a-kind pieces showcasing the pinnacle of our craftspeople's skill.",
                  details: ["Unique designs", "Master crafted", "Signed & numbered"],
                },
                {
                  name: "Custom Commissions",
                  price: "Quote on request",
                  description: "Bespoke creations tailored to your vision and space requirements.",
                  details: ["Personal consultation", "3D visualization", "White-glove delivery"],
                },
                {
                  name: "Restoration Services",
                  price: "Assessment required",
                  description: "Bringing cherished pieces back to their original glory with expert care.",
                  details: ["Damage assessment", "Period-appropriate methods", "Documentation included"],
                },
                {
                  name: "Limited Editions",
                  price: "From $3,500",
                  description: "Exclusive pieces available in very limited quantities for discerning collectors.",
                  details: ["Collector's certificate", "Exclusive materials", "Investment grade"],
                },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="border border-neutral-700 bg-neutral-800 hover:border-neutral-600 transition-colors">
                    <div className="bg-neutral-700 h-48 border-b border-neutral-600"></div>
                    <div className="p-8">
                      <h3 className="font-serif text-2xl font-light mb-3 text-neutral-50">{item.name}</h3>
                      <p className="font-mono text-lg text-primary-400 mb-4">{item.price}</p>
                      <p className="text-neutral-300 leading-relaxed mb-6 font-sans">{item.description}</p>
                      <div className="space-y-2 mb-8">
                        {item.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-1 h-1 bg-primary-400"></div>
                            <span className="text-neutral-400 text-sm font-sans">{detail}</span>
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
                  <h2 className="font-serif text-5xl font-light mb-8 text-neutral-900">Bespoke Service</h2>
                  <p className="font-sans text-xl text-neutral-800 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Every piece can be customized to your exact specifications. Our artisans work closely with you to
                    bring your vision to life.
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
                  Beyond creation, we offer comprehensive services to ensure your pieces remain treasured for
                  generations.
                </p>
              </FadeInUp>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 gap-16" staggerDelay={0.2}>
              {[
                {
                  title: "Design Consultation",
                  price: "Complimentary",
                  description: "Personal guidance from our design experts to realize your vision.",
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
                  description: "Professional installation and setup service for your peace of mind.",
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
                  description: "Preserve the beauty and integrity of your pieces with expert care.",
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
                  description: "Expert restoration services to return pieces to their original condition.",
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
                    <h3 className="font-serif text-3xl font-light mb-4 text-neutral-900">{service.title}</h3>
                    <p className="font-mono text-lg text-accent-600 mb-6">{service.price}</p>
                    <p className="text-neutral-600 leading-relaxed mb-8 font-sans">{service.description}</p>
                    <div className="space-y-4 mb-10">
                      <h4 className="font-sans font-medium text-neutral-900">Process:</h4>
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
                      Learn More
                    </button>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <SlideInUp>
              <div className="bg-neutral-900 -mx-12 px-12 py-20 border-t border-neutral-800">
                <div className="text-center">
                  <h2 className="font-serif text-5xl font-light mb-8 text-neutral-50">Service Packages</h2>
                  <p className="font-sans text-xl text-neutral-300 mb-16 max-w-2xl mx-auto leading-relaxed">
                    Comprehensive care packages designed to protect your investment and maintain its beauty over time.
                  </p>
                  <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto" staggerDelay={0.15}>
                    {[
                      {
                        name: "Essential Care",
                        price: "$299/year",
                        features: ["Annual maintenance", "Basic repairs", "Phone consultation"],
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
                            pkg.highlight ? "border-primary-400 bg-primary-50" : "border-neutral-700 bg-neutral-800"
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
                                  pkg.highlight ? "text-neutral-700" : "text-neutral-300"
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
                  Visit our workshop and showroom to experience our craft firsthand and meet the artisans behind each
                  piece.
                </p>
              </FadeInUp>
            </div>

            <div className="grid md:grid-cols-2 gap-20">
              <FadeInLeft>
                <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">Location & Hours</h2>
                <StaggerContainer className="space-y-8" staggerDelay={0.15}>
                  <StaggerItem>
                    <div className="flex items-start space-x-6">
                      <MapPin className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">Main Atelier</h3>
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
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">Visiting Hours</h3>
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
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">Contact</h3>
                        <p className="text-neutral-600 font-sans">(212) 555-0127</p>
                        <p className="text-sm text-neutral-500 font-sans">Appointments recommended</p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start space-x-6">
                      <Mail className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-sans font-medium text-neutral-900 mb-2">Email</h3>
                        <p className="text-neutral-600 font-sans">atelier@craftworks.com</p>
                        <p className="text-sm text-neutral-500 font-sans">Response within 24 hours</p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </FadeInLeft>

              <FadeInRight>
                <h2 className="font-serif text-4xl font-light mb-8 text-neutral-900">Workshop Map</h2>
                <ScaleIn>
                  <div className="bg-neutral-200 h-96 border border-neutral-300 mb-8 flex items-center justify-center">
                    <p className="text-neutral-500 font-sans">Interactive Workshop Map</p>
                  </div>
                </ScaleIn>

                <FadeInUp delay={0.3}>
                  <div className="bg-neutral-50 border border-neutral-200 p-8">
                    <h3 className="font-serif text-2xl font-light mb-6 text-neutral-900">Schedule a Visit</h3>
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
                  <h2 className="font-serif text-5xl font-light mb-8 text-neutral-50">Private Consultations</h2>
                  <p className="font-sans text-xl text-accent-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Book an exclusive one-on-one session with our master craftspeople to discuss your vision and explore
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
                  A curated collection of our work, process, and the spaces where craftsmanship comes to life.
                </p>
              </FadeInUp>
            </div>

            <div>
              <FadeInUp>
                <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">The Workshop</h2>
              </FadeInUp>
              <StaggerContainer className="grid md:grid-cols-3 gap-4" staggerDelay={0.05}>
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
                <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">Craftsmanship Process</h2>
              </FadeInUp>
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.08}>
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
                <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">Featured Pieces</h2>
              </FadeInUp>
              <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.15}>
                {Array.from({ length: 6 }, (_, i) => (
                  <StaggerItem key={i}>
                    <div className="bg-neutral-800 border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer hover:scale-105 duration-300">
                      <div className="h-64 bg-neutral-700 border-b border-neutral-600 flex items-center justify-center text-neutral-500 font-sans">
                        Featured {i + 1}
                      </div>
                      <div className="p-8">
                        <h3 className="font-serif text-2xl font-light mb-3 text-neutral-50">Masterpiece {i + 1}</h3>
                        <p className="text-neutral-300 text-sm font-sans leading-relaxed">
                          A testament to our commitment to excellence, this piece showcases the harmony between
                          traditional techniques and contemporary vision.
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div>
              <FadeInUp>
                <h2 className="font-serif text-4xl font-light mb-12 text-neutral-50">Behind the Scenes</h2>
              </FadeInUp>
              <StaggerContainer className="grid md:grid-cols-5 gap-3" staggerDelay={0.03}>
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
                  <h2 className="font-serif text-5xl font-light mb-8 text-neutral-900">Commission Documentation</h2>
                  <p className="font-sans text-xl text-neutral-800 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Every commissioned piece is documented from conception to completion, creating a visual story of its
                    creation.
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
}

export default appConfig
