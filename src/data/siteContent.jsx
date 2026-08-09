import {
  FaAward,
  FaBalanceScale,
  FaBolt,
  FaCertificate,
  FaCheckCircle,
  FaCogs,
  FaCube,
  FaGlobe,
  FaIndustry,
  FaMapMarkerAlt,
  FaRecycle,
  FaShieldAlt,
  FaShippingFast,
  FaTruck,
} from "react-icons/fa";

export const navigation = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Materials", to: "/materials" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const features = [
  {
    icon: FaCertificate,
    title: "Licensed & Compliant",
    copy: "A licensed dealer aligned with environmental regulations and responsible practice.",
  },
  {
    icon: FaBalanceScale,
    title: "Competitive Pricing",
    copy: "Transparent, market-aware pricing supported by precise grading and certified weights.",
  },
  {
    icon: FaShippingFast,
    title: "Reliable Logistics",
    copy: "Prompt collection and industrial logistics across the Eastern Province.",
  },
  {
    icon: FaAward,
    title: "Established 2017",
    copy: "A proven track record supporting industrial partners across Saudi Arabia.",
  },
];

export const services = [
  {
    slug: "container-service",
    icon: FaTruck,
    title: "Container Service",
    category: "Collection",
    copy: "10 to 40-yard roll-off containers, flatbeds, and specialized transport designed around site requirements.",
    image: "/assets/service-container-handling.webp",
    focalPosition: "56% 48%",
    alt: "Scrap metal collection and container service at an industrial yard",
    capabilities: ["10 to 40-yard roll-off containers", "Flatbeds and specialized transport", "Site-specific collection planning", "Container swap coordination"],
  },
  {
    slug: "industrial-demolition",
    icon: FaIndustry,
    title: "Industrial Demolition",
    category: "Processing",
    copy: "Asset recovery and dismantling for obsolete machinery, structural steel, and industrial facilities.",
    image: "/assets/service-industrial-dismantling.webp",
    focalPosition: "55% 48%",
    alt: "Industrial material recovery and dismantling operation",
    capabilities: ["Obsolete machinery recovery", "Structural steel dismantling", "Industrial facility clearance", "Recoverable asset coordination"],
  },
  {
    slug: "scrap-purchasing",
    icon: FaRecycle,
    title: "Scrap Purchasing",
    category: "Trading",
    copy: "Competitive, market-aware purchasing for ferrous and non-ferrous metals to maximize material value.",
    image: "/assets/service-scrap-metal.webp",
    focalPosition: "50% 52%",
    alt: "Sorted ferrous and non-ferrous scrap metal",
    capabilities: ["Ferrous and non-ferrous metals", "Market-aware quotations", "Certified weight process", "Material inspection and grading"],
  },
  {
    slug: "heavy-logistics",
    icon: FaShippingFast,
    title: "Heavy Logistics",
    category: "Collection",
    copy: "Fleet coordination for industrial relocations and bulk scrap transport across the Kingdom.",
    image: "data:image/webp;base64,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",
    focalPosition: "50% 45%",
    alt: "Port cranes and city skyline silhouetted at dusk in Jeddah, Saudi Arabia",
    capabilities: ["Bulk scrap transport", "Industrial relocation support", "Fleet coordination", "Eastern Province coverage"],
  },
  {
    slug: "metal-sorting",
    icon: FaCogs,
    title: "Metal Sorting",
    category: "Processing",
    copy: "Laser and XRF-supported identification for complex alloys and mixed-metal loads.",
    image: "/assets/service-metal-sorting.webp",
    focalPosition: "58% 48%",
    alt: "Industrial metal stock prepared for sorting and grading",
    capabilities: ["Alloy identification", "Mixed-metal classification", "Grade verification", "Documented acceptance review"],
  },
  {
    slug: "global-export",
    icon: FaGlobe,
    title: "Global Export",
    category: "Trading",
    copy: "Supply-chain access to international foundries and mills through coordinated global trade channels.",
    image: "/assets/service-global-trade.webp",
    focalPosition: "50% 46%",
    alt: "Industrial recovery yard supporting regional and global trade",
    capabilities: ["International buyer network", "Foundry and mill supply", "Commercial coordination", "Export-channel support"],
  },
];

export const statistics = [
  { icon: FaAward, label: "Year Established", value: "2017" },
  { icon: FaMapMarkerAlt, label: "Headquarters", value: "Dammam, KSA" },
  { icon: FaCertificate, label: "Operating Status", value: "Licensed Dealer" },
  { icon: FaTruck, label: "Service Coverage", value: "Eastern Province" },
];

export const values = [
  { icon: FaShieldAlt, title: "Integrity", copy: "Transparent weighing, clear grading, and honest commercial communication on every load." },
  { icon: FaCheckCircle, title: "Efficiency", copy: "Responsive collection, processing, and payment coordination tailored to industrial operations." },
  { icon: FaBalanceScale, title: "Fair Value", copy: "Market-aware pricing designed to deliver competitive value for verified materials." },
  { icon: FaRecycle, title: "Sustainability", copy: "Responsible recycling that returns valuable industrial materials to productive use." },
];

export const materials = [
  {
    id: "copper",
    name: "Copper",
    category: "Non-Ferrous",
    image: "/assets/service-scrap-metal.webp",
    alt: "Copper and non-ferrous recyclable metal",
    icon: FaBolt,
    summary: "Premium copper material for electrical and power applications.",
    details: ["Grade #1 Millberry", "≥ 99.9% purity", "Electrical & Power"],
  },
  {
    id: "heavy-melt-steel",
    name: "Heavy Melt Steel",
    category: "Ferrous",
    image: "/assets/service-scrap-metal.webp",
    alt: "Heavy melt steel scrap ready for industrial recycling",
    icon: FaRecycle,
    summary: "Industrial-grade heavy melting steel for infrastructure and casting.",
    details: ["HMS 1 & 2 (80:20)", "Industrial grade", "Infrastructure & Casting"],
  },
  {
    id: "aluminum",
    name: "Aluminum",
    category: "Non-Ferrous",
    image: "/assets/service-scrap-metal.webp",
    alt: "Sorted aluminum recyclable material",
    icon: FaCube,
    summary: "Aluminum alloy material used across aerospace and automotive applications.",
    details: ["6061 / 6063 alloys", "≥ 99.5% purity", "Aerospace & Automotive"],
  },
  {
    id: "rebar",
    name: "Rebar",
    category: "Ferrous",
    image: "/assets/service-construction-materials.webp",
    alt: "Deformed steel reinforcement bars",
    icon: FaIndustry,
    summary: "Deformed steel bars for structural concrete applications.",
    details: ["Deformed steel bars", "Grade 60/75", "Structural Concrete"],
  },
  {
    id: "brass",
    name: "Brass",
    category: "Non-Ferrous",
    image: "/assets/service-scrap-metal.webp",
    alt: "Brass and mixed non-ferrous recyclable metal",
    icon: FaCogs,
    summary: "Copper-zinc alloy material for marine and plumbing use.",
    details: ["Honey brass & shells", "Cu-Zn alloy", "Marine & Plumbing"],
  },
  {
    id: "cast-iron",
    name: "Cast Iron",
    category: "Ferrous",
    image: "/assets/service-global-trade.webp",
    alt: "Industrial cast iron machinery material",
    icon: FaCogs,
    summary: "High-carbon grey and ductile iron for automotive and pipe applications.",
    details: ["Grey & ductile iron", "High carbon", "Automotive & Pipes"],
  },
  {
    id: "stainless-steel",
    name: "Stainless Steel",
    category: "Ferrous",
    image: "/assets/service-construction-materials.webp",
    alt: "Stainless steel industrial stock",
    icon: FaIndustry,
    summary: "Chromium-nickel stainless grades for food and chemical applications.",
    details: ["304 & 316 grades", "18/8 Cr-Ni", "Food & Chemical"],
  },
  {
    id: "plate-structural",
    name: "Plate & Structural",
    category: "Ferrous",
    image: "/assets/service-construction-materials.webp",
    alt: "Structural carbon steel plate and sections",
    icon: FaIndustry,
    summary: "Carbon-steel plate and structural material for bridges and buildings.",
    details: ["A36 & equivalent", "Carbon steel", "Bridges & Building"],
  },
];

export const gradingStandards = [
  {
    material: "Copper",
    acceptable: ["Bare bright wire (uncoated, unalloyed)", "Clean copper tubing (no solder or paint)", "#1 heavy copper"],
    downgrades: ["Insulated wire requiring processing", "Burnt copper wire", "Material mixed with brass or steel"],
  },
  {
    material: "Steel",
    acceptable: ["Heavy melt steel (HMS 1 & 2)", "Structural beams cut to size", "Clean automotive scrap"],
    downgrades: ["Sealed tanks or cylinders", "Excessive rust or corrosion", "Non-depleted hazardous containers"],
  },
  {
    material: "Aluminum",
    acceptable: ["Clean extruded aluminum", "Clean aluminum rims without tires", "Clean sheet aluminum"],
    downgrades: ["Die cast with steel attachments", "Irony aluminum with excessive screws or bolts", "Litho plates with paper"],
  },
];

export const certifications = [
  { title: "ISO 9001:2015", label: "Quality Management", copy: "Workflow controls supporting weight calibration, metal grading accuracy, and transaction security." },
  { title: "ISO 14001:2015", label: "Environmental Systems", copy: "Processing procedures designed to mitigate site run-off, optimize fuel cycles, and support ecological conservation." },
  { title: "ISO 45001:2018", label: "Health & Safety Standard", copy: "Heavy-material handling safeguards supporting secure container swap cycles and safe operating rules." },
  { title: "MOC Verified", label: "Saudi Ministry of Commerce", copy: "Commercial registry and corporate-entity verification supporting lawful corporate trade." },
];

export const frequentlyAskedQuestions = [
  {
    question: "What types of scrap metal do you accept?",
    answer: "We purchase a wide variety of ferrous and non-ferrous metals including copper, aluminum, brass, stainless steel, cast iron, heavy melt steel, and structural steel. If you have a specific material, contact us for verification.",
  },
  {
    question: "Do you offer collection services from industrial sites?",
    answer: "Yes. We provide prompt collection services and logistics. For high-volume producers, we offer container swap coordination and dedicated account management across the Eastern Province.",
  },
  {
    question: "How do you determine the price for scrap materials?",
    answer: "Pricing is transparent and tied to current market conditions. Materials are graded using industrial analysis equipment and weighed on certified scales to support honest, market-competitive value.",
  },
  {
    question: "Are your facilities environmentally compliant?",
    answer: "Yes. AALKC operates with environmental and safety controls aligned with responsible recycling practice, including the ISO 14001 environmental-management standard.",
  },
  {
    question: "What is your typical payment process for suppliers?",
    answer: "We provide reliable payment processing tailored to the supplier relationship. After materials are analyzed and weighed, the agreed payment process is initiated.",
  },
];

export const processSteps = [
  { number: "01", title: "Share the material", copy: "Provide the material type, estimated quantity, site location, and collection needs." },
  { number: "02", title: "Inspection and grading", copy: "Our team reviews quality, safety, grade, logistics, and current market conditions." },
  { number: "03", title: "Certified weighing", copy: "Accepted material is weighed through the documented industrial-scale process." },
  { number: "04", title: "Commercial close-out", copy: "Final value and the agreed payment or collection process are completed." },
];

export const companyServices = [
  "Scrap Metal Buying and Selling",
  "Ferrous and Non-Ferrous Scrap Trading",
  "Industrial Scrap Collection and Sorting",
  "Large-Scale Recycling Support",
  "Purchasing of Copper, Aluminum, and Steel",
  "Purchasing of Iron, Brass, and Stainless Steel",
];

export const legalContent = {
  privacy: {
    title: "Privacy Policy",
    intro: "At Amanat Al-Kalima Company (AALKC), we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or use our services.",
    sections: [
      { title: "Information Collection", copy: "With your explicit consent, we collect the name, email address, phone number, company, and message you provide in the Request a Spot Quote form. Anti-abuse services may process limited technical data to prevent abuse. We do not store raw IP addresses with quote requests." },
      { title: "Use of Information", copy: "We use quote details only to process and respond to your request and for necessary operational follow-up. Records are retained for no longer than 90 days, then removed through an automated retention process. We do not sell or share your personal data for third-party marketing." },
      { title: "Data Security", copy: "We use security measures intended to protect your personal information. Data is stored on access-controlled systems and is limited to authorized personnel required to keep it confidential." },
      { title: "Contact Us", copy: "If you have questions regarding this Privacy Policy, contact us at contact@aalkc.com." },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "By accessing or using the services provided by Amanat Al-Kalima Company (AALKC), you agree to be bound by these Terms of Service and all applicable laws and regulations in the Kingdom of Saudi Arabia.",
    sections: [
      { title: "Service Terms", copy: "AALKC provides professional scrap metal recycling and trading services. All material weights are determined by certified industrial scales, and we reserve the right to inspect all materials for quality and safety compliance before purchase." },
      { title: "Pricing & Quotes", copy: "Estimates provided through our website or by email are based on current market conditions and are subject to change until materials are physically inspected and weighed at our Dammam facility." },
      { title: "Compliance & Safety", copy: "Suppliers are responsible for ensuring that all scrap metal is free from hazardous materials, including explosive, radioactive, or pressurized containers. Suppliers must also confirm legal ownership of all materials sold to AALKC." },
      { title: "Governing Law", copy: "These terms are governed by the laws of the Kingdom of Saudi Arabia. Disputes relating to these terms are subject to the exclusive jurisdiction of the courts of Saudi Arabia." },
    ],
  },
};

export const contactDetails = {
  phoneLabel: "+966 55 181 1700",
  phoneHref: "tel:+966551811700",
  whatsappHref: "https://wa.me/966551811700",
  email: "contact@aalkc.com",
  website: "www.aalkc.com",
  addressLine1: "3508 Al Qatif 1, Unit 7260",
  addressLine2: "Dammam 32517, Eastern Province",
  addressCountry: "Kingdom of Saudi Arabia",
  address: "3508 Al Qatif 1, Unit 7260, Dammam 32517, Eastern Province, Kingdom of Saudi Arabia",
  addressArabic: "القطيف ٣٥٠٨ ١، وحدة ٧٢٦٠، الدمام ٣٢٥١٧، المنطقة الشرقية، المملكة العربية السعودية",
};
