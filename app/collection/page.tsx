import {
  FadeInUp,
  FadeIn,
  SlideInUp,
  StaggerContainer,
  StaggerItem,
  DrawLine,
  TextReveal,
} from '@/components/animations/viewport-animations';
import content from '@/config/content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Export the content component for the accordion layout
export function CollectionContent() {
  const currentLocale = 'vi';
  const pageContent = content[currentLocale].collection;

  // Collection items data
  const collectionItems = [
    {
      title: 'Trầm Hương Cao Cấp',
      description: 'Những tác phẩm trầm hương được chọn lọc kỹ lưỡng từ nguồn nguyên liệu tốt nhất',
      image: '/tramhuong-sonhong/gallery-1.jpg',
    },
    {
      title: 'Nghệ Thuật Truyền Thống',
      description:
        'Kỹ thuật chế tác được truyền từ đời này sang đời khác, giữ gìn tinh hoa văn hóa',
      image: '/tramhuong-sonhong/gallery-2.jpg',
    },
    {
      title: 'Tinh Túy Đất Trời',
      description:
        'Mỗi sản phẩm đều mang trong mình hương thơm tự nhiên và giá trị tinh thần sâu sắc',
      image: '/tramhuong-sonhong/gallery-3.jpg',
    },
  ];

  return (
    <div className="space-y-20">
      <div className="pt-12 text-center">
        <TextReveal>
          <h1 className="font-serif text-6xl font-light mb-8 tracking-tight leading-none text-white">
            {pageContent.title}
            <br />
            <span className="font-normal text-white/80">{pageContent.subtitle}</span>
          </h1>
        </TextReveal>
        <FadeIn delay={0.5}>
          <DrawLine className="w-32 mx-auto mb-8 bg-white/60" />
        </FadeIn>
        <FadeInUp delay={0.8}>
          <p className="font-sans text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            {pageContent.description}
          </p>
        </FadeInUp>

        {/* Products Button - Prominent */}
        <div className="flex gap-4 justify-center mt-10">
          <Button
            asChild
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
          >
            <Link href="/products" className="flex items-center gap-3">
              <span>Xem Tất Cả Sản Phẩm</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Collection Showcase */}
      <div className="mt-20">
        <FadeInUp>
          <h2 className="font-serif text-4xl font-light mb-12 text-center text-white">
            Bộ Sưu Tập
          </h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {collectionItems && collectionItems.length > 0 ? (
            collectionItems.map((item, index) => (
              <StaggerItem key={`collection-item-${index}`}>
                <Link href="/products">
                  <div className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-xl hover:shadow-white/10 rounded-lg overflow-hidden cursor-pointer">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-light mb-2 text-white group-hover:text-white/90 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg font-semibold text-white">
                          Xem Sản Phẩm
                        </span>
                        <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))
          ) : (
            <div className="col-span-full text-center text-white/60">
              <p>Không có sản phẩm nào để hiển thị.</p>
            </div>
          )}
        </StaggerContainer>
      </div>
    </div>
  );
}

// Default export for route access
export default CollectionContent;
