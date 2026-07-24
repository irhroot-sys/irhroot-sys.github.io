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
    image: "/assets/service-scrap-metal.webp",
    alt: "Scrap metal collection and container service at an industrial yard",
    capabilities: ["10 to 40-yard roll-off containers", "Flatbeds and specialized transport", "Site-specific collection planning", "Container swap coordination"],
  },
  {
    slug: "industrial-demolition",
    icon: FaIndustry,
    title: "Industrial Demolition",
    category: "Processing",
    copy: "Asset recovery and dismantling for obsolete machinery, structural steel, and industrial facilities.",
    image: "/assets/hero-recycling-yard.webp",
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
    alt: "Sorted ferrous and non-ferrous scrap metal",
    capabilities: ["Ferrous and non-ferrous metals", "Market-aware quotations", "Certified weight process", "Material inspection and grading"],
  },
  {
    slug: "heavy-logistics",
    icon: FaShippingFast,
    title: "Heavy Logistics",
    category: "Collection",
    copy: "Fleet coordination for industrial relocations and bulk scrap transport across the Kingdom.",
    image: "/assets/service-machinery-equipment.webp",
    alt: "Heavy industrial equipment prepared for coordinated transport",
    capabilities: ["Bulk scrap transport", "Industrial relocation support", "Fleet coordination", "Eastern Province coverage"],
  },
  {
    slug: "metal-sorting",
    icon: FaCogs,
    title: "Metal Sorting",
    category: "Processing",
    copy: "Laser and XRF-supported identification for complex alloys and mixed-metal loads.",
    image: "/assets/service-construction-materials.webp",
    alt: "Industrial metal stock prepared for sorting and grading",
    capabilities: ["Alloy identification", "Mixed-metal classification", "Grade verification", "Documented acceptance review"],
  },
  {
    slug: "global-export",
    icon: FaGlobe,
    title: "Global Export",
    category: "Trading",
    copy: "Supply-chain access to international foundries and mills through coordinated global trade channels.",
    image: "/assets/hero-recycling-yard.webp",
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
    image: "/assets/service-machinery-equipment.webp",
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
    answer: "Yes. AALKC operates with environmental and safety controls aligned with responsible recycling practice, including the ISO 14001 environmental-management standard represented on the existing company website.",
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
