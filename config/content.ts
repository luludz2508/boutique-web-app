/**
 * Content Configuration
 *
 * This file contains ONLY content data (strings, arrays, objects)
 * NO components or JSX should be in this file
 *
 * Components/UI are defined in the page files themselves
 */

export interface CollectionItem {
  name: string;
  price: string;
  description: string;
  details: string[];
}

export interface ServiceItem {
  title: string;
  price: string;
  description: string;
  process: string[];
}

export interface PackageItem {
  name: string;
  price: string;
  features: string[];
  highlight: boolean;
}

export interface PageContent {
  // Header
  title: string;
  subtitle?: string;
  description: string;

  // Collection specific
  items?: CollectionItem[];
  bespokeTitle?: string;
  bespokeDescription?: string;
  bespokeEmailPlaceholder?: string;
  bespokeButtonText?: string;

  // Services specific
  services?: ServiceItem[];
  packages?: PackageItem[];

  // Atelier specific
  locationTitle?: string;
  mainAtelierTitle?: string;
  mainAtelierAddress?: string;
  visitingHoursTitle?: string;
  visitingHours?: string[];
  contactTitle?: string;
  contactNumber?: string;
  contactRecommendation?: string;
  emailTitle?: string;
  emailAddress?: string;
  emailResponseTime?: string;
}

export interface BackgroundConfig {
  image?: string;
  repeat?: boolean;
  opacity?: number;
  position?: string;
  size?: string;
  gradient?: string;
}

export interface NavItem {
  id: string;
  title: string;
  path: string;
  color?: string;
  textColor?: string;
  background?: BackgroundConfig;
}

export interface CollectionPageContent {
  title: string;
  subtitle: string;
  description: string;
  items: CollectionItem[];
  bespokeTitle: string;
  bespokeDescription: string;
  bespokeEmailPlaceholder: string;
  bespokeButtonText: string;
}

export interface ProductPageContent {
  title: string;
  subtitle: string;
  description: string;
}

export interface ServicesPageContent {
  title: string;
  subtitle: string;
  description: string;
  services?: ServiceItem[];
  packages?: PackageItem[];
}

export interface AtelierPageContent {
  title: string;
  subtitle: string;
  description: string;
  locationTitle?: string;
  mainAtelierTitle?: string;
  mainAtelierAddress?: string;
  visitingHoursTitle?: string;
  visitingHours?: string[];
  contactTitle?: string;
  contactNumber?: string;
  contactRecommendation?: string;
  emailTitle?: string;
  emailAddress?: string;
  emailResponseTime?: string;
  instagramTitle?: string;
  instagramHandle?: string;
  websiteTitle?: string;
  websiteUrl?: string;
  mapTitle?: string;
  scheduleTitle?: string;
  scheduleDescription?: string;
  firstNamePlaceholder?: string;
  lastNamePlaceholder?: string;
  emailPlaceholder?: string;
  phonePlaceholder?: string;
  messagePlaceholder?: string;
  submitButton?: string;
  consultationTitle?: string;
  consultationDescription?: string;
  consultationButton?: string;
}

export interface LocaleContent {
  navigation: NavItem[];
  home: PageContent;
  collection: CollectionPageContent;
  products: ProductPageContent;
  services: ServicesPageContent;
  gallery: PageContent;
  atelier: AtelierPageContent;
}

export interface ContentConfig {
  [locale: string]: LocaleContent;
}

const content: ContentConfig = {
  vi: {
    navigation: [
      {
        id: 'home',
        title: 'TRANG CHỦ',
        path: '/',
        color: 'bg-neutral-50',
        textColor: 'text-neutral-900',
        background: {
          image: '/tramhuong-sonhong/homepage-bg.png',
          repeat: true,
          opacity: 0.08,
          position: 'center',
          size: 'cover',
        },
      },
      {
        id: 'collection',
        title: 'SẢN PHẨM',
        path: '/collection',
        color: 'bg-brown-600',
        textColor: 'text-accent-400',
      },
      {
        id: 'services',
        title: 'DỊCH VỤ',
        path: '/services',
        color: 'bg-accent-400',
        textColor: 'text-neutral-100',
        background: {
          gradient:
            'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #404040 50%, #2d2d2d 75%, #1a1a1a 100%)',
        },
      },
      {
        id: 'gallery',
        title: 'HÌNH ẢNH',
        path: '/gallery',
        color: 'bg-brown-800',
        textColor: 'text-accent-400',
      },
      {
        id: 'atelier',
        title: 'VỀ CHÚNG TÔI',
        path: '/atelier',
        color: 'bg-neutral-100',
        textColor: 'text-neutral-900',
      },
    ],
    home: {
      title: 'Tinh Túy',
      subtitle: 'Trầm Hương',
      description:
        'Tinh túy của đất trời trong từng thớ gỗ trầm. Nghệ thuật trầm hương cao cấp với truyền thống và tâm huyết nghệ nhân.',
    },

    collection: {
      title: 'Bộ Sưu Tập',
      subtitle: 'Trầm Hương',
      description:
        'Những tác phẩm được tuyển chọn kỹ lưỡng thể hiện cam kết của chúng tôi về sự xuất sắc, mỗi tác phẩm đều kể câu chuyện riêng về sự khéo léo và tâm huyết.',
      items: [
        {
          name: 'Thác Khói Trầm Hương',
          price: '2.800.000₫',
          description:
            'Một tác phẩm điêu khắc tinh xảo, tạo ra dòng khói trầm hương chảy ngược đầy mê hoặc, mang lại sự bình yên và thanh tịnh cho không gian của bạn.',
          details: [
            'Chất liệu: Gốm sứ cao cấp',
            'Kích thước: 20cm x 15cm',
            'Thủ công tinh xảo',
            'Tặng kèm 1 hộp nụ trầm hương',
          ],
        },
        {
          name: 'Vòng Tay Trầm Hương Tự Nhiên',
          price: '1.500.000₫',
          description:
            'Vòng tay được chế tác từ trầm hương tự nhiên, mang lại hương thơm dịu nhẹ và những lợi ích phong thủy, giúp tâm an tịnh và thu hút năng lượng tích cực.',
          details: [
            'Chất liệu: Trầm hương tự nhiên',
            'Kích thước hạt: 8mm, 10mm, 12mm',
            'Mùi hương: Ngọt dịu, thanh thoát',
            'Thiết kế: Đơn giản, tinh tế',
          ],
        },
        {
          name: 'Nhang Trầm Hương Cao Cấp',
          price: '850.000₫',
          description:
            'Nhang trầm hương được làm từ bột trầm nguyên chất, không hóa chất, mang đến hương thơm thanh khiết, giúp thư giãn tinh thần và thanh lọc không khí.',
          details: [
            'Thành phần: Bột trầm hương nguyên chất',
            'Thời gian cháy: Khoảng 30 phút/nén',
            'Số lượng: 100 nén/hộp',
            'Công dụng: Thiền định, thờ cúng, thư giãn',
          ],
        },
        {
          name: 'Tượng Phật Trầm Hương',
          price: '5.000.000₫',
          description:
            'Tượng Phật được điêu khắc từ khối trầm hương quý hiếm, toát lên vẻ trang nghiêm và thanh tịnh, là vật phẩm phong thủy mang lại may mắn và bình an.',
          details: [
            'Chất liệu: Trầm hương nguyên khối',
            'Kích thước: 15cm x 10cm',
            'Điêu khắc thủ công',
            'Ý nghĩa: Bình an, may mắn, tài lộc',
          ],
        },
        {
          name: 'Trầm Miếng Xông Nhà',
          price: '1.200.000₫',
          description:
            'Trầm miếng dùng để xông nhà, thanh tẩy không gian, mang lại vượng khí và hương thơm ấm cúng, giúp xua đuổi tà khí và thu hút tài lộc.',
          details: [
            'Chất liệu: Trầm hương miếng tự nhiên',
            'Trọng lượng: 50g/hộp',
            'Cách dùng: Xông bằng lò điện hoặc than',
            'Công dụng: Thanh lọc không khí, phong thủy',
          ],
        },
        {
          name: 'Tinh Dầu Trầm Hương',
          price: '950.000₫',
          description:
            'Tinh dầu trầm hương nguyên chất, được chiết xuất từ gỗ trầm, có mùi hương nồng ấm, giúp giảm căng thẳng, cải thiện giấc ngủ và tăng cường sức khỏe.',
          details: [
            'Thành phần: 100% tinh dầu trầm hương',
            'Dung tích: 10ml',
            'Cách dùng: Xông hương, massage, pha loãng',
            'Công dụng: Thư giãn, trị liệu, làm đẹp',
          ],
        },
      ],
      bespokeTitle: 'Dịch Vụ Thiết Kế Riêng',
      bespokeDescription:
        'Mỗi tác phẩm đều có thể được tùy chỉnh theo yêu cầu chính xác của bạn. Các nghệ nhân của chúng tôi làm việc chặt chẽ với bạn để biến tầm nhìn của bạn thành hiện thực.',
      bespokeEmailPlaceholder: 'Địa chỉ email của bạn',
      bespokeButtonText: 'Bắt Đầu Tư Vấn',
    },

    products: {
      title: 'Danh Mục',
      subtitle: 'Sản Phẩm',
      description:
        'Khám phá bộ sưu tập trầm hương cao cấp từ Sơn Hồng. Mỗi sản phẩm đều mang trong mình câu chuyện riêng và hương thơm đặc trưng.',
    },

    services: {
      title: 'Dịch Vụ',
      subtitle: 'Của Chúng Tôi',
      description:
        'Từ tư vấn đến sáng tạo, chúng tôi cung cấp dịch vụ toàn diện để biến tầm nhìn của bạn thành hiện thực với nghệ thuật trầm hương thượng hạng.',
      services: [
        {
          title: 'Tư Vấn Thiết Kế Riêng',
          price: 'Miễn phí',
          description:
            'Bắt đầu hành trình của bạn với buổi tư vấn cá nhân hóa, nơi chúng tôi khám phá tầm nhìn và sở thích của bạn.',
          process: [
            'Thảo luận ý tưởng ban đầu',
            'Hướng dẫn lựa chọn nguyên liệu',
            'Phát triển ý tưởng thiết kế',
            'Đề xuất thời gian và giá cả',
          ],
        },
        {
          title: 'Chế Tác Theo Yêu Cầu',
          price: 'Từ 80.000.000₫',
          description:
            'Các nghệ nhân bậc thầy của chúng tôi chế tác tác phẩm độc nhất phù hợp với yêu cầu của bạn, sử dụng nguyên liệu cao cấp.',
          process: [
            'Tìm nguồn và lựa chọn nguyên liệu',
            'Quy trình thủ công truyền thống',
            'Kiểm tra chất lượng',
            'Hoàn thiện và trình bày cuối cùng',
          ],
        },
        {
          title: 'Dịch Vụ Phục Hồi',
          price: 'Từ 18.000.000₫',
          description:
            'Thổi hồn mới vào những tác phẩm quý giá với dịch vụ phục hồi và bảo quản chuyên nghiệp của chúng tôi.',
          process: [
            'Đánh giá tình trạng',
            'Đề xuất phương án phục hồi',
            'Công việc phục hồi cẩn thận',
            'Xử lý bảo quản',
          ],
        },
      ],
      packages: [
        {
          name: 'Cơ Bản',
          price: '56.000.000₫',
          features: [
            'Một tác phẩm theo yêu cầu',
            'Nguyên liệu tiêu chuẩn',
            'Thời gian 3 tháng',
            'Bao gồm chứng chỉ',
          ],
          highlight: false,
        },
        {
          name: 'Cao Cấp',
          price: '123.000.000₫',
          features: [
            'Hai tác phẩm theo yêu cầu',
            'Nguyên liệu cao cấp',
            'Ưu tiên chế tác',
            'Dịch vụ chăm sóc trọn đời',
            'Lễ trao sản phẩm',
          ],
          highlight: true,
        },
        {
          name: 'Sưu Tập',
          price: '270.000.000₫',
          features: [
            'Bộ sưu tập hoàn chỉnh theo yêu cầu',
            'Nguyên liệu quý hiếm lâu năm',
            'Thời gian nhanh',
            'Tư vấn riêng tư',
            'Bảo trì hàng năm',
            'Cơ hội triển lãm',
          ],
          highlight: false,
        },
      ],
    },

    atelier: {
      title: 'Ghé Thăm',
      subtitle: 'Showroom Của Chúng Tôi',
      description:
        'Hơn 30 năm kinh nghiệm, Trầm Hương Sơn Hồng cam kết đem đến cho khách hàng những sản phẩm Trầm Hương 100% tự nhiên, nguồn gốc rõ ràng và chất lượng cao cùng giá thành hợp lý.',
      locationTitle: 'Địa Điểm',
      mainAtelierTitle: 'Showroom Chính',
      mainAtelierAddress: '680 Võ Nguyên Giáp, P.Khuê Mỹ, quận Ngũ Hành Sơn, Đà Nẵng, Việt Nam',
      visitingHoursTitle: 'Giờ Mở Cửa',
      visitingHours: [
        'Thứ Hai - Thứ Bảy: 08:00 - 20:00',
        'Chủ Nhật: 09:00 - 19:00',
        'Luôn mở cửa phục vụ quý khách',
      ],
      contactTitle: 'Điện Thoại',
      contactNumber: '093 703 34 68',
      contactRecommendation:
        'Chúng tôi luôn sẵn sàng tư vấn và hỗ trợ quý khách. Vui lòng liên hệ trước khi đến để được phục vụ tốt nhất.',
      emailTitle: 'Email',
      emailAddress: 'tramhuong.sonhong.2022@gmail.com',
      emailResponseTime: 'Chúng tôi thường phản hồi trong vòng 24 giờ.',
      instagramTitle: 'Instagram',
      instagramHandle: 'tramhuongsonhongvn',
      websiteTitle: 'Website',
      websiteUrl: 'tramhuongsonhong.com',
      mapTitle: 'Bản Đồ Showroom',
      scheduleTitle: 'Đặt Lịch Tham Quan',
      scheduleDescription: 'Liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất',
      firstNamePlaceholder: 'Họ',
      lastNamePlaceholder: 'Tên',
      emailPlaceholder: 'Địa chỉ Email',
      phonePlaceholder: 'Số điện thoại',
      messagePlaceholder: 'Cho chúng tôi biết về nhu cầu của bạn',
      submitButton: 'Gửi Yêu Cầu',
      consultationTitle: 'Tư Vấn Riêng Tư',
      consultationDescription:
        'Dành cho những người sưu tầm và chuyên gia muốn có sự hướng dẫn cá nhân hóa trong việc xây dựng bộ sưu tập trầm hương của họ.',
      consultationButton: 'Đặt Lịch Ngay',
    },

    gallery: {
      title: 'Hình Ảnh',
      subtitle: 'Trầm Hương',
      description:
        'Bộ sưu tập hình ảnh được tuyển chọn về tác phẩm, quy trình sản xuất và không gian nơi nghệ thuật trầm hương được tạo nên.',
    },
  },

  en: {
    navigation: [
      { id: 'home', title: 'HOME', path: '/' },
      { id: 'collection', title: 'COLLECTION', path: '/collection' },
      { id: 'services', title: 'SERVICES', path: '/services' },
      { id: 'gallery', title: 'GALLERY', path: '/gallery' },
      { id: 'atelier', title: 'ATELIER', path: '/atelier' },
    ],
    home: {
      title: 'The Essence',
      subtitle: 'of Agarwood',
      description:
        'Discover the timeless art of Vietnamese agarwood craftsmanship, where tradition meets excellence.',
    },
    collection: {
      title: 'Our',
      subtitle: 'Collection',
      description: 'Curated agarwood pieces showcasing traditional craftsmanship.',
      items: [],
      bespokeTitle: 'Bespoke Service',
      bespokeDescription: 'Custom creations tailored to your vision.',
      bespokeEmailPlaceholder: 'Your email',
      bespokeButtonText: 'Get Started',
    },
    products: {
      title: 'Our',
      subtitle: 'Products',
      description: 'Explore our premium agarwood collection.',
    },
    services: {
      title: 'Our',
      subtitle: 'Services',
      description: 'Comprehensive agarwood services.',
    },
    gallery: {
      title: 'Our',
      subtitle: 'Gallery',
      description: 'Visual stories of agarwood craftsmanship.',
    },
    atelier: {
      title: 'Our',
      subtitle: 'Atelier',
      description: 'Visit our workshop and showroom.',
    },
  },
};

export default content;
