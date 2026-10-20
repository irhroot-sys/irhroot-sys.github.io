import { LuAward, LuContainer, LuLayers, LuBadgeCheck, LuBox, LuBuilding2, LuCircleCheck, LuCog, LuFactory, LuGlobe, LuHardHat, LuLeaf, LuMapPin, LuRecycle, LuScale, LuShieldCheck, LuTruck, LuZap } from "react-icons/lu";

export const navigation = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Materials", to: "/materials" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "Contact", to: "/contact" },
];

export const footerCompanyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Industries", to: "/industries" },
  { label: "Materials", to: "/materials" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const features = [
  {
    icon: LuBadgeCheck,
    title: "Licensed & Compliant",
    copy: "A licensed dealer aligned with environmental regulations and responsible practice.",
  },
  {
    icon: LuScale,
    title: "Competitive Pricing",
    copy: "Transparent, market-aware pricing supported by precise grading and certified weights.",
  },
  {
    icon: LuTruck,
    title: "Reliable Logistics",
    copy: "Prompt collection and industrial logistics across the Eastern Province.",
  },
  {
    icon: LuAward,
    title: "Established 2017",
    copy: "A proven track record supporting industrial partners across Saudi Arabia.",
  },
];

export const services = [
  {
    slug: "container-service",
    overview: "AALKC places roll-off containers from 10 to 40 yards, and flatbed transport, where your scrap is generated, then swaps or collects them on a schedule that suits the site. Containers are matched to the material and the access available, so space is used well and collections stay predictable.",
    icon: LuContainer,
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
    overview: "For plant decommissioning, equipment replacement and facility clearance, AALKC recovers machinery, structural steel and other metal assets. Recoverable material is separated during dismantling, so it can be graded and valued instead of sold as mixed scrap.",
    icon: LuFactory,
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
    overview: "AALKC buys ferrous and non-ferrous scrap from industrial, commercial and construction suppliers. Every load is inspected, graded and weighed on certified scales, and quotations follow current market conditions.",
    icon: LuRecycle,
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
    overview: "Bulk scrap and heavy items need the right vehicle and a planned route. AALKC coordinates the fleet and transport for bulk collections and industrial relocations across the Eastern Province and the wider Kingdom.",
    icon: LuTruck,
    title: "Heavy Logistics",
    category: "Collection",
    copy: "Fleet coordination for industrial relocations and bulk scrap transport across the Kingdom.",
    image: "/assets/service-heavy-logistics.webp",
    focalPosition: "50% 45%",
    alt: "Port cranes and city skyline silhouetted at dusk in Jeddah, Saudi Arabia",
    capabilities: ["Bulk scrap transport", "Industrial relocation support", "Fleet coordination", "Eastern Province coverage"],
  },
  {
    slug: "metal-sorting",
    overview: "Mixed loads are worth more once they are separated. AALKC uses laser and XRF-supported identification to classify alloys and verify grades, and documents the acceptance review for every load.",
    icon: LuLayers,
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
    overview: "Some grades find their best value beyond the local market. AALKC coordinates supply to international foundries and mills through coordinated trade channels and handles the commercial coordination.",
    icon: LuGlobe,
    title: "Global Export",
    category: "Trading",
    copy: "Supply-chain access to international foundries and mills through coordinated global trade channels.",
    image: "/assets/service-global-trade.webp",
    focalPosition: "50% 46%",
    alt: "Industrial recovery yard supporting regional and global trade",
    capabilities: ["International buyer network", "Foundry and mill supply", "Commercial coordination", "Export-channel support"],
  },
];

// Sectors AALKC works with. `services` and `materials` reference the slugs
// and names above, so service pages can list the sectors they suit.
export const industries = [
  {
    slug: "construction",
    icon: LuHardHat,
    title: "Construction & Contracting",
    copy: "Rebar offcuts, structural steel, formwork hardware and demolition arisings, collected from active sites on a schedule that suits the programme.",
    materials: ["Rebar", "Heavy Melt Steel", "Plate & Structural"],
    services: ["container-service", "industrial-demolition", "heavy-logistics"],
  },
  {
    slug: "manufacturing",
    icon: LuCog,
    title: "Manufacturing & Fabrication",
    copy: "Production offcuts, turnings, sheet skeletons and rejected parts, kept separate by alloy so they are graded and valued correctly.",
    materials: ["Stainless Steel", "Aluminum", "Brass", "Copper"],
    services: ["scrap-purchasing", "metal-sorting", "container-service"],
  },
  {
    slug: "industrial-plants",
    icon: LuFactory,
    title: "Industrial Plants & Facilities",
    copy: "Decommissioning and shutdown scrap, obsolete machinery and redundant structural steel, removed safely and documented.",
    materials: ["Heavy Melt Steel", "Cast Iron", "Stainless Steel", "Copper"],
    services: ["industrial-demolition", "heavy-logistics", "scrap-purchasing"],
  },
  {
    slug: "electrical",
    icon: LuZap,
    title: "Electrical & Cabling",
    copy: "Cable, wire, busbar and conductor scrap, with copper and aluminium separated from insulated material for accurate grading.",
    materials: ["Copper", "Aluminum", "Brass"],
    services: ["scrap-purchasing", "metal-sorting"],
  },
  {
    slug: "commercial",
    icon: LuBuilding2,
    title: "Commercial & Facilities Management",
    copy: "Fit-out strip-outs, building-services metals and end-of-life equipment from offices, retail and warehousing, cleared with minimal disruption.",
    materials: ["Aluminum", "Copper", "Stainless Steel", "Plate & Structural"],
    services: ["container-service", "scrap-purchasing"],
  },
];

export const sustainabilityPillars = [
  { icon: LuRecycle, title: "Circular materials", copy: "Graded scrap goes back to mills and foundries as feedstock, so metal already in circulation is used again." },
  { icon: LuShieldCheck, title: "Responsible handling", copy: "Loads are inspected before acceptance, and sealed, pressurised or hazardous containers are not accepted." },
  { icon: LuLeaf, title: "Environmental management", copy: "Processing procedures follow the ISO 14001 environmental-management standard." },
  { icon: LuTruck, title: "Efficient logistics", copy: "Collections are planned around each site, with container swaps that avoid unnecessary trips." },
];

// Published industry figures, quoted with their source. They describe metal
// recycling in general, not AALKC's own results.
export const recyclingFacts = [
  { figure: "95%", metal: "Aluminium", copy: "less energy is needed to recycle aluminium than to produce it from ore.", source: "International Aluminium Institute" },
  { figure: "1.5 t", metal: "Steel", copy: "of CO₂ emissions are avoided for every tonne of scrap used to make steel.", source: "World Steel Association" },
  { figure: "Up to 85%", metal: "Copper", copy: "less energy is needed to recycle copper than to produce it from ore.", source: "International Copper Association" },
];

export const collectionTimings = ["Flexible", "Within a week", "Within a month", "Recurring collections"];

export const statistics = [
  { icon: LuAward, label: "Year Established", value: "2017" },
  { icon: LuMapPin, label: "Headquarters", value: "Dammam, KSA" },
  { icon: LuBadgeCheck, label: "Operating Status", value: "Licensed Dealer" },
  { icon: LuTruck, label: "Service Coverage", value: "Eastern Province" },
];

export const values = [
  { icon: LuShieldCheck, title: "Integrity", copy: "Transparent weighing, clear grading, and honest commercial communication on every load." },
  { icon: LuCircleCheck, title: "Efficiency", copy: "Responsive collection, processing, and payment coordination tailored to industrial operations." },
  { icon: LuScale, title: "Fair Value", copy: "Market-aware pricing designed to deliver competitive value for verified materials." },
  { icon: LuRecycle, title: "Sustainability", copy: "Responsible recycling that returns valuable industrial materials to productive use." },
];

export const materials = [
  {
    id: "copper",
    // Chemical symbol, or the principal elements of an alloy, and the
    // atomic number for single-element metals.
    symbol: "Cu",
    atomicNumber: 29,
    name: "Copper",
    category: "Non-Ferrous",
    image: "/assets/service-scrap-metal.webp",
    alt: "Copper and non-ferrous recyclable metal",
    icon: LuZap,
    summary: "Premium copper material for electrical and power applications.",
    details: ["Grade #1 Millberry", "≥ 99.9% purity", "Electrical & Power"],
  },
  {
    id: "heavy-melt-steel",
    symbol: "Fe",
    atomicNumber: 26,
    name: "Heavy Melt Steel",
    category: "Ferrous",
    image: "/assets/service-scrap-metal.webp",
    alt: "Heavy melt steel scrap ready for industrial recycling",
    icon: LuRecycle,
    summary: "Industrial-grade heavy melting steel for infrastructure and casting.",
    details: ["HMS 1 & 2 (80:20)", "Industrial grade", "Infrastructure & Casting"],
  },
  {
    id: "aluminum",
    symbol: "Al",
    atomicNumber: 13,
    name: "Aluminum",
    category: "Non-Ferrous",
    image: "/assets/service-scrap-metal.webp",
    alt: "Sorted aluminum recyclable material",
    icon: LuBox,
    summary: "Aluminum alloy material used across aerospace and automotive applications.",
    details: ["6061 / 6063 alloys", "≥ 99.5% purity", "Aerospace & Automotive"],
  },
  {
    id: "rebar",
    symbol: "Fe",
    atomicNumber: 26,
    name: "Rebar",
    category: "Ferrous",
    image: "/assets/service-construction-materials.webp",
    alt: "Deformed steel reinforcement bars",
    icon: LuFactory,
    summary: "Deformed steel bars for structural concrete applications.",
    details: ["Deformed steel bars", "Grade 60/75", "Structural Concrete"],
  },
  {
    id: "brass",
    symbol: "Cu–Zn",
    atomicNumber: null,
    name: "Brass",
    category: "Non-Ferrous",
    image: "/assets/service-scrap-metal.webp",
    alt: "Brass and mixed non-ferrous recyclable metal",
    icon: LuCog,
    summary: "Copper-zinc alloy material for marine and plumbing use.",
    details: ["Honey brass & shells", "Cu-Zn alloy", "Marine & Plumbing"],
  },
  {
    id: "cast-iron",
    symbol: "Fe–C",
    atomicNumber: null,
    name: "Cast Iron",
    category: "Ferrous",
    image: "/assets/service-global-trade.webp",
    alt: "Industrial cast iron machinery material",
    icon: LuCog,
    summary: "High-carbon grey and ductile iron for automotive and pipe applications.",
    details: ["Grey & ductile iron", "High carbon", "Automotive & Pipes"],
  },
  {
    id: "stainless-steel",
    symbol: "Fe–Cr–Ni",
    atomicNumber: null,
    name: "Stainless Steel",
    category: "Ferrous",
    image: "/assets/service-construction-materials.webp",
    alt: "Stainless steel industrial stock",
    icon: LuFactory,
    summary: "Chromium-nickel stainless grades for food and chemical applications.",
    details: ["304 & 316 grades", "18/8 Cr-Ni", "Food & Chemical"],
  },
  {
    id: "plate-structural",
    symbol: "Fe",
    atomicNumber: 26,
    name: "Plate & Structural",
    category: "Ferrous",
    image: "/assets/service-construction-materials.webp",
    alt: "Structural carbon steel plate and sections",
    icon: LuFactory,
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
  commercialRegistration: "7050308233",
  mapHref: "https://www.google.com/maps/search/?api=1&query=3508%20Al%20Qatif%201%2C%20Unit%207260%2C%20Dammam%2032517%2C%20Saudi%20Arabia",
  addressLine1: "3508 Al Qatif 1, Unit 7260",
  addressLine2: "Dammam 32517, Eastern Province",
  addressCountry: "Kingdom of Saudi Arabia",
  address: "3508 Al Qatif 1, Unit 7260, Dammam 32517, Eastern Province, Kingdom of Saudi Arabia",
  addressArabic: "القطيف ٣٥٠٨ ١، وحدة ٧٢٦٠، الدمام ٣٢٥١٧، المنطقة الشرقية، المملكة العربية السعودية",
};
