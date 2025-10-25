import {
  FadeInUp,
  FadeIn,
  SlideInUp,
  StaggerContainer,
  StaggerItem,
  DrawLine,
  TextReveal,
} from "@/components/animations/viewport-animations";
import content from "@/config/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Export the content component for the accordion layout
export function CollectionContent() {
  const currentLocale = "vi";
  const pageContent = content[currentLocale].collection;

  return (
    <div className="space-y-20">
      <div className="pt-12 text-center">
        <TextReveal>
          <h1 className="font-serif text-6xl font-light mb-8 tracking-tight leading-none">
            {pageContent.title}
            <br />
            <span className="font-normal text-primary-400">
              {pageContent.subtitle}
            </span>
          </h1>
        </TextReveal>
        <FadeIn delay={0.5}>
          <DrawLine className="w-32 mx-auto mb-8 bg-neutral-600" />
        </FadeIn>
        <FadeInUp delay={0.8}>
          <p className="font-sans text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            {pageContent.description}
          </p>
        </FadeInUp>

        {/* Products Button - Prominent */}
        <div className="flex gap-4 justify-center mt-10">
          <Button
            asChild
            size="lg"
            className="bg-primary-600 hover:bg-primary-700 text-neutral-50 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
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
          <h2 className="font-serif text-4xl font-light mb-12 text-center text-neutral-50">
            Bộ Sưu Tập
          </h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Trầm Hương Cao Cấp",
              description:
                "Những tác phẩm trầm hương được chọn lọc kỹ lưỡng từ nguồn nguyên liệu tốt nhất",
              image: "/tramhuong-sonhong/gallery-1.jpg",
            },
            {
              title: "Nghệ Thuật Truyền Thống",
              description:
                "Kỹ thuật chế tác được truyền từ đời này sang đời khác, giữ gìn tinh hoa văn hóa",
              image: "/tramhuong-sonhong/gallery-2.jpg",
            },
            {
              title: "Tinh Túy Đất Trời",
              description:
                "Mỗi sản phẩm đều mang trong mình hương thơm tự nhiên và giá trị tinh thần sâu sắc",
              image: "/tramhuong-sonhong/gallery-3.jpg",
            },
          ].map((item, index) => (
            <StaggerItem key={index}>
              <Link href="/products">
                <div className="group bg-neutral-800 border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden cursor-pointer">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-light mb-2 text-neutral-100 group-hover:text-primary-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg font-semibold text-primary-400">
                        Xem Sản Phẩm
                      </span>
                      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-300 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}

// Default export for route access
export default CollectionContent;
