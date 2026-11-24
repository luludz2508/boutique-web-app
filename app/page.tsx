import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { Story } from '@/components/home/Story';
import { FeaturedProducts, loadFeaturedProducts } from '@/components/home/FeaturedProducts';
import { Moments } from '@/components/home/Moments';
import { VisitShowroom } from '@/components/home/VisitShowroom';

// Product data comes from Supabase; refresh at most every 10 minutes.
export const revalidate = 600;

export default async function HomePage() {
  const featured = await loadFeaturedProducts();

  return (
    <main className="text-ink">
      <Hero />
      <Marquee />
      <Story />
      <FeaturedProducts products={featured} />
      <Moments />
      <VisitShowroom />
    </main>
  );
}
