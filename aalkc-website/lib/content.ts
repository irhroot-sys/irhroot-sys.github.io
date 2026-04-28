// lib/content.ts
// Single source of truth for all site content — zero hardcoded strings in components.

export interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  canonical?: string;
}

export interface HeroContent {
  h1: string;
  h1Ar: string;
  sub: string;
  subAr: string;
  ctaQuote: string;
  ctaCall: string;
  ctaWhatsApp: string;
}

export interface TrustStat {
  number: string;
  label: string;
  labelAr: string;
}

export interface AboutContent {
  heading: string;
  headingAr: string;
  body: string;
  bodyAr: string;
}

export interface ServiceCard {
  id: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  keywordsEn: string;
  keywordsAr: string;
}

export interface ServiceArea {
  nameEn: string;
  nameAr: string;
}

export interface WhyChooseItem {
  icon: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface ProcessStep {
  step: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  whatsApp: string;
  email: string;
  addressEn: string;
  addressAr: string;
  city: string;
  cityAr: string;
  region: string;
  regionAr: string;
  country: string;
  countryAr: string;
  postalCode: string;
  lat: number;
  lng: number;
  mapUrl: string;
  businessLicense: string;
}

export interface FooterContent {
  taglineEn: string;
  taglineAr: string;
  copyright: string;
  copyrightAr: string;
}

// ─── Company Identity ────────────────────────────────────────────────────────

export const company = {
  nameEn: "Amanat Al-Kalima Company",
  nameAr: "شركة أمانات الكلمة",
  shortNameEn: "AALKC",
  domain: "aalkc.com",
  foundingYear: 2016,
  licenseNumber: "SA-2016-AALKC",
  googleRating: 5.0,
  reviewCount: 483,
  yearsActive: 8,
} as const;

// ─── Hero ────────────────────────────────────────────────────────────────────

export const hero: HeroContent = {
  h1: "Saudi Arabia's Trusted Scrap Metal Buyers — Eastern Province",
  h1Ar: "شركة شراء الخردة والمعادن في المنطقة الشرقية",
  sub: "We buy all types of scrap metal, copper wire, aluminum, steel, and industrial surplus at the best prices. Serving Dammam, Khobar, Dhahran, Jubail, and across the Eastern Province.",
  subAr:
    "نشتري جميع أنواع الخردة والمعادن، النحاس، الألمنيوم، الحديد والفائض الصناعي بأفضل الأسعار. نخدم الدمام والخبر والظهران والجبيل وجميع مناطق المنطقة الشرقية.",
  ctaQuote: "Get Free Quote",
  ctaCall: "Call Now",
  ctaWhatsApp: "WhatsApp Us",
};

// ─── Trust Bar Stats ─────────────────────────────────────────────────────────

export const trustBar: TrustStat[] = [
  { number: "8+", label: "Years in Business", labelAr: "سنوات في الخدمة" },
  { number: "5.0 ★", label: "Google Rating", labelAr: "تقييم جوجل" },
  { number: "483+", label: "Satisfied Clients", labelAr: "عميل راضٍ" },
  { number: "100%", label: "Licensed & Insured", labelAr: "مرخصون ومؤمَّنون" },
  { number: "24h", label: "Response Time", labelAr: "وقت الاستجابة" },
  { number: "Free", label: "Quotes & Pickup", labelAr: "تقدير وجمع مجاني" },
];

// ─── About ───────────────────────────────────────────────────────────────────

export const about: AboutContent = {
  heading: "About Amanat Al-Kalima Company",
  headingAr: "عن شركة أمانات الكلمة",
  body: "Amanat Al-Kalima Company is a fully licensed scrap metal purchasing and recycling company based in Dammam, Saudi Arabia. Since 2016, we have been serving factories, construction sites, demolition contractors, and private clients across the Eastern Province. We offer fair market prices, transparent weighing, and prompt payment — making the process of selling your scrap metal simple and stress-free.",
  bodyAr:
    "شركة أمانات الكلمة هي شركة مرخصة متخصصة في شراء وتدوير الخردة والمعادن، مقرها في الدمام بالمملكة العربية السعودية. منذ عام 2016، نخدم المصانع ومواقع البناء ومقاولي الهدم والعملاء الأفراد في جميع أنحاء المنطقة الشرقية. نقدم أسعارًا عادلة في السوق، ووزنًا شفافًا، ودفعًا فوريًا — مما يجعل عملية بيع الخردة بسيطة وخالية من التوتر.",
};

// ─── Services ────────────────────────────────────────────────────────────────

export const services: ServiceCard[] = [
  {
    id: "copper",
    icon: "⚡",
    titleEn: "Copper & Copper Wire",
    titleAr: "نحاس وأسلاك نحاسية",
    descriptionEn:
      "We buy all grades of copper including bare bright copper, insulated copper wire, copper pipe, and copper sheets at top market rates.",
    descriptionAr:
      "نشتري جميع درجات النحاس بما في ذلك النحاس اللامع والأسلاك النحاسية المعزولة وأنابيب النحاس والصفائح النحاسية بأعلى أسعار السوق.",
    keywordsEn: "copper scrap buyers, copper wire, copper pipe, copper sheet",
    keywordsAr: "شراء نحاس، خردة نحاس، أسلاك نحاسية",
  },
  {
    id: "aluminum",
    icon: "🔩",
    titleEn: "Aluminum Scrap",
    titleAr: "خردة الألمنيوم",
    descriptionEn:
      "Aluminum extrusions, cast aluminum, aluminum cans, window frames, and industrial aluminum profiles — we buy all types.",
    descriptionAr:
      "مقاطع الألمنيوم وألمنيوم الصب وعلب الألمنيوم وإطارات النوافذ والمقاطع الصناعية — نشتري جميع الأنواع.",
    keywordsEn: "aluminum scrap, aluminum buyers, aluminum recycling",
    keywordsAr: "خردة ألمنيوم، شراء ألمنيوم، تدوير ألمنيوم",
  },
  {
    id: "steel",
    icon: "🏗️",
    titleEn: "Steel & Iron Scrap",
    titleAr: "خردة الحديد والصلب",
    descriptionEn:
      "Structural steel, iron rebar, metal beams, plates, and general ferrous scrap from construction and industrial sites.",
    descriptionAr:
      "الصلب الإنشائي وحديد التسليح والعوارض المعدنية والألواح والخردة الحديدية العامة من مواقع البناء والصناعة.",
    keywordsEn: "steel scrap, iron scrap, ferrous scrap buyers",
    keywordsAr: "خردة حديد، خردة صلب، شراء حديد",
  },
  {
    id: "stainless",
    icon: "✨",
    titleEn: "Stainless Steel",
    titleAr: "الفولاذ المقاوم للصدأ",
    descriptionEn:
      "All grades of stainless steel including 304, 316, and 430. Kitchen equipment, industrial tanks, pipes, and fittings.",
    descriptionAr:
      "جميع درجات الفولاذ المقاوم للصدأ بما في ذلك 304 و316 و430. معدات المطابخ والخزانات الصناعية والأنابيب والتوصيلات.",
    keywordsEn: "stainless steel scrap, stainless buyers, 304 316 stainless",
    keywordsAr: "خردة فولاذ مقاوم للصدأ، شراء ستانلس",
  },
  {
    id: "brass",
    icon: "🔧",
    titleEn: "Brass & Bronze",
    titleAr: "نحاس أصفر وبرونز",
    descriptionEn:
      "Brass fittings, valves, taps, bronze bearings, and mixed yellow metals purchased at competitive prices.",
    descriptionAr:
      "تركيبات النحاس الأصفر والصمامات والحنفيات وتحامل البرونز والمعادن الصفراء المختلطة بأسعار تنافسية.",
    keywordsEn: "brass scrap, bronze scrap, yellow metals buyers",
    keywordsAr: "خردة نحاس أصفر، شراء برونز",
  },
  {
    id: "industrial",
    icon: "🏭",
    titleEn: "Industrial & Factory Surplus",
    titleAr: "الفائض الصناعي والمصنعي",
    descriptionEn:
      "Factory clear-outs, industrial machinery parts, motors, transformers, and large-scale industrial surplus materials.",
    descriptionAr:
      "تصفية المصانع وقطع الآلات الصناعية والمحركات والمحولات والمواد الصناعية الفائضة على نطاق واسع.",
    keywordsEn: "industrial scrap, factory surplus, machinery scrap",
    keywordsAr: "خردة صناعية، فائض مصنعي، شراء آلات",
  },
  {
    id: "demolition",
    icon: "🔨",
    titleEn: "Demolition Scrap",
    titleAr: "خردة الهدم",
    descriptionEn:
      "Complete demolition scrap purchases including structural steel, electrical wiring, plumbing, and mixed metals from building demolitions.",
    descriptionAr:
      "شراء خردة الهدم الكامل بما في ذلك الصلب الإنشائي والأسلاك الكهربائية والسباكة والمعادن المختلطة من هدم المباني.",
    keywordsEn: "demolition scrap, building demolition metals, scrap clearance",
    keywordsAr: "خردة هدم، مواد هدم، تصفية مباني",
  },
  {
    id: "electrical",
    icon: "🔌",
    titleEn: "Electrical Cables & Motors",
    titleAr: "كابلات كهربائية ومحركات",
    descriptionEn:
      "Electrical cables, motor windings, transformers, generators, and all types of electrical scrap accepted.",
    descriptionAr:
      "الكابلات الكهربائية ولفائف المحركات والمحولات والمولدات وجميع أنواع الخردة الكهربائية مقبولة.",
    keywordsEn: "electrical cable scrap, motor scrap, transformer scrap",
    keywordsAr: "خردة كابلات، خردة محركات، شراء محولات",
  },
];

// ─── Service Areas ────────────────────────────────────────────────────────────

export const serviceAreas: ServiceArea[] = [
  { nameEn: "Dammam", nameAr: "الدمام" },
  { nameEn: "Al Khobar", nameAr: "الخبر" },
  { nameEn: "Dhahran", nameAr: "الظهران" },
  { nameEn: "Jubail", nameAr: "الجبيل" },
  { nameEn: "Qatif", nameAr: "القطيف" },
  { nameEn: "Ras Tanura", nameAr: "رأس تنورة" },
  { nameEn: "Safwa", nameAr: "صفوى" },
  { nameEn: "Saihat", nameAr: "سيهات" },
  { nameEn: "Abqaiq", nameAr: "بقيق" },
  { nameEn: "Hafr Al-Batin", nameAr: "حفر الباطن" },
  { nameEn: "Al Ahsa", nameAr: "الأحساء" },
  { nameEn: "Khafji", nameAr: "الخفجي" },
];

// ─── Why Choose Us ────────────────────────────────────────────────────────────

export const whyChooseUs: WhyChooseItem[] = [
  {
    icon: "🏆",
    titleEn: "Best Market Prices",
    titleAr: "أفضل أسعار السوق",
    descriptionEn: "We offer competitive, up-to-date prices based on current metal market rates.",
    descriptionAr: "نقدم أسعارًا تنافسية ومحدَّثة بناءً على أسعار سوق المعادن الحالية.",
  },
  {
    icon: "📋",
    titleEn: "Licensed & Registered",
    titleAr: "مرخصون ومسجلون",
    descriptionEn: "Fully licensed scrap metal buying company registered in Saudi Arabia.",
    descriptionAr: "شركة شراء خردة مرخصة بالكامل ومسجلة في المملكة العربية السعودية.",
  },
  {
    icon: "⚖️",
    titleEn: "Transparent Weighing",
    titleAr: "وزن شفاف",
    descriptionEn: "Certified scales with clear, documented weighing process — no surprises.",
    descriptionAr: "موازين معتمدة مع عملية وزن واضحة وموثقة — لا مفاجآت.",
  },
  {
    icon: "💰",
    titleEn: "Instant Payment",
    titleAr: "دفع فوري",
    descriptionEn: "Get paid on the spot — cash or bank transfer, your choice.",
    descriptionAr: "احصل على دفعتك في الحال — نقدًا أو تحويل بنكي، حسب اختيارك.",
  },
  {
    icon: "🚛",
    titleEn: "Free Collection Service",
    titleAr: "خدمة جمع مجانية",
    descriptionEn: "We come to you — free pickup from your site anywhere in the Eastern Province.",
    descriptionAr: "نأتي إليك — جمع مجاني من موقعك في أي مكان في المنطقة الشرقية.",
  },
  {
    icon: "⏱️",
    titleEn: "Fast Response",
    titleAr: "استجابة سريعة",
    descriptionEn: "Same-day or next-day service available. Call or WhatsApp for quick quotes.",
    descriptionAr: "خدمة في نفس اليوم أو اليوم التالي. اتصل أو واتساب للحصول على عروض أسعار سريعة.",
  },
  {
    icon: "🌍",
    titleEn: "Eastern Province Coverage",
    titleAr: "تغطية المنطقة الشرقية",
    descriptionEn: "Serving all major cities and industrial zones across the Eastern Province.",
    descriptionAr: "نخدم جميع المدن الرئيسية والمناطق الصناعية في المنطقة الشرقية.",
  },
  {
    icon: "🤝",
    titleEn: "Trusted by Industry",
    titleAr: "موثوق من قبل الصناعة",
    descriptionEn: "Preferred scrap buyer for factories, contractors, and industrial companies.",
    descriptionAr: "مشتري الخردة المفضل للمصانع والمقاولين والشركات الصناعية.",
  },
  {
    icon: "♻️",
    titleEn: "Eco-Responsible",
    titleAr: "مسؤولية بيئية",
    descriptionEn: "Committed to environmentally responsible metal recycling practices.",
    descriptionAr: "ملتزمون بممارسات إعادة تدوير المعادن المسؤولة بيئيًا.",
  },
  {
    icon: "📞",
    titleEn: "Dedicated Support",
    titleAr: "دعم مخصص",
    descriptionEn: "Bilingual support in Arabic and English. Speak to a real person, not a bot.",
    descriptionAr: "دعم ثنائي اللغة بالعربية والإنجليزية. تحدث مع شخص حقيقي، وليس روبوت.",
  },
];

// ─── Process Steps ────────────────────────────────────────────────────────────

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    titleEn: "Contact Us",
    titleAr: "تواصل معنا",
    descriptionEn: "Call, WhatsApp, or fill the form to describe your scrap material.",
    descriptionAr: "اتصل أو أرسل واتساب أو أملأ النموذج لوصف مواد الخردة الخاصة بك.",
  },
  {
    step: 2,
    titleEn: "Free Assessment",
    titleAr: "تقييم مجاني",
    descriptionEn: "We assess your material type, quantity, and condition — free of charge.",
    descriptionAr: "نقيّم نوع المواد والكمية والحالة — مجانًا.",
  },
  {
    step: 3,
    titleEn: "Best Price Quote",
    titleAr: "أفضل عرض سعر",
    descriptionEn: "Receive a fair, transparent quote based on current market prices.",
    descriptionAr: "احصل على عرض سعر عادل وشفاف بناءً على أسعار السوق الحالية.",
  },
  {
    step: 4,
    titleEn: "Free Collection",
    titleAr: "جمع مجاني",
    descriptionEn: "We schedule pickup at your convenience and collect from your site for free.",
    descriptionAr: "نجدول الاستلام في الوقت المناسب لك ونجمع من موقعك مجانًا.",
  },
  {
    step: 5,
    titleEn: "Instant Payment",
    titleAr: "دفع فوري",
    descriptionEn: "Get paid immediately upon collection — cash or bank transfer.",
    descriptionAr: "احصل على الدفع فور الاستلام — نقدًا أو تحويل بنكي.",
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contact: ContactInfo = {
  phone: "+966500000000",
  phoneDisplay: "+966 50 000 0000",
  whatsApp: "+966500000000",
  email: "info@aalkc.com",
  addressEn: "Industrial Area, Dammam, Eastern Province, Saudi Arabia",
  addressAr: "المنطقة الصناعية، الدمام، المنطقة الشرقية، المملكة العربية السعودية",
  city: "Dammam",
  cityAr: "الدمام",
  region: "Eastern Province",
  regionAr: "المنطقة الشرقية",
  country: "Saudi Arabia",
  countryAr: "المملكة العربية السعودية",
  postalCode: "31411",
  lat: 26.4207,
  lng: 50.0888,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=26.4207,50.0888",
  businessLicense: "SA-2016-AALKC",
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export const footer: FooterContent = {
  taglineEn: "Your trusted scrap metal partners in the Eastern Province.",
  taglineAr: "شركاؤك الموثوقون في خردة المعادن بالمنطقة الشرقية.",
  copyright: `© ${new Date().getFullYear()} Amanat Al-Kalima Company. All Rights Reserved.`,
  copyrightAr: `© ${new Date().getFullYear()} شركة أمانات الكلمة. جميع الحقوق محفوظة.`,
};

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const seoMeta: Record<string, SeoMeta> = {
  homeEn: {
    title: "Scrap Metal Buyers in Dammam & Eastern Province | Amanat Al-Kalima",
    description:
      "Sell your scrap metal at the best prices in Dammam, Khobar, Jubail and Eastern Province. Amanat Al-Kalima — licensed scrap buyers. Call for free quote.",
    keywords:
      "scrap metal buyers Dammam, sell scrap metal Eastern Province, copper scrap buyers Saudi Arabia, aluminum scrap buyers, steel scrap, شراء خردة الدمام",
    canonical: "https://aalkc.com/en",
  },
  homeAr: {
    title: "شراء الخردة والمعادن في الدمام والمنطقة الشرقية | شركة أمانات الكلمة",
    description:
      "بيع خردتك المعدنية بأفضل الأسعار في الدمام والخبر والجبيل والمنطقة الشرقية. شركة أمانات الكلمة — مشترو خردة معتمدون. اتصل للحصول على عرض سعر مجاني.",
    keywords:
      "شراء خردة الدمام، بيع خردة المنطقة الشرقية، شراء نحاس، شراء ألمنيوم، خردة حديد، خردة الخبر",
    canonical: "https://aalkc.com/ar",
  },
  contactEn: {
    title: "Contact Us | Amanat Al-Kalima — Scrap Metal Buyers",
    description:
      "Get in touch with Amanat Al-Kalima Company. Call, WhatsApp, or email for free scrap metal quotes in Dammam and Eastern Province.",
    keywords: "contact scrap metal buyer Dammam, scrap metal quote Eastern Province",
    canonical: "https://aalkc.com/contact",
  },
};
