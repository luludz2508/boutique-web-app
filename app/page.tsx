"use client"

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

export default function HomePage() {
  return (
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
              Since 1985, we have been quietly perfecting our craft in the heart of the city. What began as a small
              workshop has evolved into something more profound—a sanctuary where time-honored techniques meet
              contemporary vision.
            </p>
            <p>
              Each piece we create carries within it the whispers of tradition, the precision of modern innovation, and
              the soul of true artisanship. We do not simply make products; we craft experiences, memories, and
              heirlooms.
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
              description: "We create pieces that transcend trends, focusing on enduring beauty and functionality.",
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
  )
}
