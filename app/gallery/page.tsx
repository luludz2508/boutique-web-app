import { FadeInUp, FadeIn, DrawLine, TextReveal } from "@/components/animations/viewport-animations"
import appConfig from "@/config/app-config"

export default function GalleryPage() {
  const currentLocale = "en"
  const gallerySection = appConfig[currentLocale].sections.find((section) => section.id === "gallery")

  if (!gallerySection) {
    return <div>Gallery section not found.</div>
  }

  return (
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

      {gallerySection.component}
    </div>
  )
}
