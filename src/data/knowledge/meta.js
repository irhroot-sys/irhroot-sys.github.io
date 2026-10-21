import { L } from "../../lib/i18n.js";

// What every page needs to know about the guides without loading them: the
// titles, descriptions and article particulars used by the route list, the
// document head, navigation and onward links. The bodies live in the guide
// modules beside this one and are loaded only on the pages that show them.

export const materialMeta = {
  copper: {
    title: L("Copper scrap", "خردة النحاس"),
    description: L(
      "How copper scrap is graded — bare bright, No. 1 and No. 2 wire, No. 1 heavy copper, insulated wire — what lowers its value, and where it goes next.",
      "كيف تُصنَّف خردة النحاس — السلك العاري اللامع، وسلك رقم 1 ورقم 2، والنحاس الثقيل رقم 1، والأسلاك المعزولة — وما الذي يخفض قيمتها، وإلى أين تتجه بعد ذلك.",
    ),
  },
  "heavy-melt-steel": {
    title: L("Heavy melting steel (HMS 1 & 2)", "الفولاذ الثقيل للصهر (HMS 1 و2)"),
    description: L(
      "What HMS 1 and HMS 2 mean, the thickness and size limits behind them, why HMS is traded as 80:20 blends, and how it feeds steelmaking.",
      "ما معنى HMS 1 وHMS 2، وحدود السماكة والمقاس التي تقوم عليها، ولماذا يُتداول الفولاذ الثقيل بخلطات 80:20، وكيف يغذّي صناعة الصلب.",
    ),
  },
  aluminum: {
    title: L("Aluminium scrap", "خردة الألمنيوم"),
    description: L(
      "Aluminium scrap grades — extrusions, old sheet, castings, wire and cable, cans — how alloys and attachments affect value, and why recycling saves up to 95% of the energy.",
      "درجات خردة الألمنيوم — المقاطع المبثوقة والصفائح القديمة والمسبوكات والأسلاك والكابلات والعلب — وكيف تؤثر السبائك والملحقات في القيمة، ولماذا يوفّر التدوير ما يصل إلى 95% من الطاقة.",
    ),
  },
  rebar: {
    title: L("Rebar scrap", "خردة حديد التسليح"),
    description: L(
      "Steel reinforcing bar from construction sites: what makes rebar scrap clean, how it is prepared, and how it returns to the long-steel mills that make new rebar.",
      "حديد التسليح من مواقع الإنشاء: ما الذي يجعل خردته نظيفة، وكيف تُجهَّز، وكيف تعود إلى مصانع الصلب الطويل التي تنتج حديد تسليح جديدًا.",
    ),
  },
  brass: {
    title: L("Brass scrap", "خردة النحاس الأصفر"),
    description: L(
      "Yellow and red brass scrap: the grades used in the trade, why brass is kept apart from copper, and what lowers its value.",
      "خردة النحاس الأصفر والأحمر: الدرجات المستخدمة في التجارة، ولماذا يُفصل النحاس الأصفر عن النحاس، وما الذي يخفض قيمته.",
    ),
  },
  "cast-iron": {
    title: L("Cast iron scrap", "خردة حديد الزهر"),
    description: L(
      "Grey and ductile cast iron scrap from machinery, pipe and equipment: how it differs from steel, how it is sized, and why foundries buy it.",
      "خردة حديد الزهر الرمادي واللدن من الآلات والأنابيب والمعدات: كيف يختلف عن الفولاذ، وكيف يُقطَّع، ولماذا تشتريه المسابك.",
    ),
  },
  "stainless-steel": {
    title: L("Stainless steel scrap", "خردة الفولاذ المقاوم للصدأ"),
    description: L(
      "Stainless steel scrap grades — 304, 316, 200 and 400 series — why nickel and molybdenum content set its value, and how grades are identified.",
      "درجات خردة الفولاذ المقاوم للصدأ — سلاسل 304 و316 و200 و400 — ولماذا يحدد محتوى النيكل والموليبدنوم قيمتها، وكيف تُعرَف الدرجات.",
    ),
  },
  "plate-structural": {
    title: L("Plate and structural steel scrap", "خردة الصفائح والهياكل الفولاذية"),
    description: L(
      "Heavy steel plate, beams, columns and sections: why clean plate and structural scrap is a premium ferrous grade and how it is prepared.",
      "الصفائح الفولاذية الثقيلة والجسور والأعمدة والمقاطع: لماذا تُعد خردة الصفائح والهياكل النظيفة درجة حديدية ممتازة وكيف تُجهَّز.",
    ),
  },
};

export const industryMeta = {
  construction: {
    title: L("Scrap metal from construction and contracting", "خردة المعادن من الإنشاءات والمقاولات"),
    description: L(
      "What scrap a construction site generates — rebar offcuts, structural steel, formwork hardware, demolition arisings — and how to separate and collect it without slowing the programme.",
      "ما الخردة التي يُنتجها موقع الإنشاء — بقايا حديد التسليح والفولاذ الإنشائي ومعدات القوالب ومخلفات الهدم — وكيف تُفصل وتُجمع دون إبطاء البرنامج الزمني.",
    ),
  },
  manufacturing: {
    title: L("Scrap metal from manufacturing and fabrication", "خردة المعادن من التصنيع والتشكيل"),
    description: L(
      "Production scrap from manufacturing and fabrication — offcuts, turnings, sheet skeletons and rejects — and why separating it by alloy at the machine protects its value.",
      "خردة الإنتاج في التصنيع والتشكيل — البقايا والبرادة وهياكل الصفائح والمرفوضات — ولماذا يحفظ فصلها بحسب السبيكة عند الآلة قيمتها.",
    ),
  },
  "industrial-plants": {
    title: L("Scrap metal from industrial plants and facilities", "خردة المعادن من المصانع والمنشآت الصناعية"),
    description: L(
      "Shutdown, turnaround and decommissioning scrap from industrial plants: structural steel, machinery, cast iron, stainless process equipment and cable — recovered safely and documented.",
      "خردة التوقفات الدورية وإيقاف التشغيل في المصانع: الفولاذ الإنشائي والآلات وحديد الزهر ومعدات المعالجة من الفولاذ المقاوم للصدأ والكابلات — مستعادة بأمان وموثّقة.",
    ),
  },
  electrical: {
    title: L("Scrap metal from electrical works and cabling", "خردة المعادن من الأعمال الكهربائية والكابلات"),
    description: L(
      "Cable, wire, busbar, transformers and switchgear scrap: how copper and aluminium conductors are graded and why separating bare, insulated and mixed cable matters.",
      "خردة الكابلات والأسلاك وقضبان التوزيع والمحولات ولوحات المفاتيح: كيف تُصنَّف موصلات النحاس والألمنيوم، ولماذا يهم فصل الكابلات العارية والمعزولة والمختلطة.",
    ),
  },
  commercial: {
    title: L("Scrap metal from commercial buildings and facilities management", "خردة المعادن من المباني التجارية وإدارة المرافق"),
    description: L(
      "Fit-out strip-outs, building-services metals and end-of-life equipment from offices, retail and warehousing: what is recoverable and how to clear it with minimal disruption.",
      "إزالة التشطيبات ومعادن أنظمة المباني والمعدات المنتهية من المكاتب والمحلات والمستودعات: ما القابل للاستعادة وكيف يُخلى بأقل إزعاج.",
    ),
  },
};

export const processMeta = {
  title: L("How we work", "كيف نعمل"),
  description: L(
    "How AALKC handles scrap metal from first enquiry to settlement: collection planning, inspection, grading, certified weighing, valuation and onward supply to mills and foundries.",
    "كيف تتعامل أمانة الكلمة مع الخردة المعدنية من أول استفسار حتى التسوية: تخطيط الجمع، والفحص، والتصنيف، والوزن المعتمد، والتقييم، والتوريد إلى مصانع الصلب والمسابك.",
  ),
};

export const PUBLISHED = "2026-10-21";

// Articles in reading order. All six were written together; an article
// revised later carries its own dateModified.
export const insightMeta = [
  {
    slug: "scrap-metal-grades-explained",
    category: L("Grades and specifications", "الدرجات والمواصفات"),
    title: L("Scrap metal grades explained: how ferrous and non-ferrous scrap is classified", "شرح درجات الخردة المعدنية: كيف تُصنَّف الخردة الحديدية وغير الحديدية"),
    description: L(
      "A plain guide to scrap metal grades: ferrous versus non-ferrous, the Scrap Specifications Circular and its code names, what decides a grade, and how grades are confirmed.",
      "دليل واضح لدرجات الخردة المعدنية: الحديدية مقابل غير الحديدية، ونشرة مواصفات الخردة وأسماؤها الرمزية، وما الذي يحدد الدرجة، وكيف تُؤكَّد الدرجات.",
    ),
    sources: ["scrapTerminology", "remaCircular", "remaRebrand", "heavyMeltingSteel"],
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  },
  {
    slug: "how-scrap-metal-is-recycled",
    category: L("Recycling and processing", "التدوير والمعالجة"),
    title: L("How scrap metal is recycled: from collection to new metal", "كيف يُعاد تدوير الخردة المعدنية: من الجمع إلى معدن جديد"),
    description: L(
      "The metal recycling chain step by step — sources of scrap, collection, sorting, shearing, baling and shredding, separation, melting — and the energy and material it saves.",
      "سلسلة تدوير المعادن خطوة بخطوة — مصادر الخردة، والجمع، والفرز، والقص والكبس والفرم، والفصل، والصهر — وما توفّره من طاقة ومواد.",
    ),
    sources: ["steelScrapFacts", "aluminiumRecycling", "copperRecycling", "scrapTerminology"],
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  },
  {
    slug: "saudi-arabia-scrap-metal-industry",
    category: L("Saudi Arabia", "المملكة العربية السعودية"),
    title: L("Saudi Arabia's scrap metal industry: history, geography and the market today", "صناعة الخردة المعدنية في المملكة العربية السعودية: التاريخ والجغرافيا والسوق اليوم"),
    description: L(
      "How Saudi Arabia's scrap metal trade grew out of the oil economy and its industrial cities, why the Eastern Province is at its centre, and how export rules and domestic steelmaking shape the market.",
      "كيف نشأت تجارة الخردة المعدنية في المملكة من اقتصاد النفط ومدنه الصناعية، ولماذا تقع المنطقة الشرقية في قلبها، وكيف تشكّل قواعد التصدير وصناعة الصلب المحلية السوق.",
    ),
    sources: ["dammamSeven", "industrialCities", "royalCommission", "hadeed", "maadenSmelter", "kingAbdulazizPort", "exportBanLifted", "nonFerrousDuty", "fastmarketsSaudi", "mwan", "wasteLaw", "recyclingLicences"],
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  },
  {
    slug: "scrap-metal-in-saudi-circular-economy",
    category: L("Saudi Arabia", "المملكة العربية السعودية"),
    title: L("Scrap metal and Saudi Arabia's circular economy", "الخردة المعدنية والاقتصاد الدائري في المملكة العربية السعودية"),
    description: L(
      "How Vision 2030, the circular carbon economy, the National Center for Waste Management, the 2021 Waste Management Law and the 2026 recycling licences shape the role of scrap metal in Saudi Arabia.",
      "كيف تشكّل رؤية 2030 والاقتصاد الدائري للكربون والمركز الوطني لإدارة النفايات ونظام إدارة النفايات لعام 2021 وتراخيص التدوير لعام 2026 دور الخردة المعدنية في المملكة.",
    ),
    sources: ["vision2030", "sirc", "mwan", "circularCarbonEconomy", "saudiGreenInitiative", "wasteLaw", "wasteLawUnep", "recyclingLicences", "aluminiumRecycling", "copperRecycling", "steelScrapFacts"],
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  },
  {
    slug: "preparing-scrap-for-grading",
    category: L("Supplier guide", "دليل المورّدين"),
    title: L("How to prepare industrial scrap for accurate grading and fair value", "كيف تجهّز الخردة الصناعية لتصنيف دقيق وقيمة عادلة"),
    description: L(
      "Practical steps for suppliers: separating metals at source, removing attachments and contamination, sizing, safety checks and the paperwork that makes grading quick and fair.",
      "خطوات عملية للمورّدين: فصل المعادن من المصدر، وإزالة الملحقات والتلوث، والتقطيع، وفحوص السلامة، والوثائق التي تجعل التصنيف سريعًا وعادلًا.",
    ),
    sources: ["scrapTerminology", "remaCircular"],
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  },
  {
    slug: "quality-and-safety-in-scrap-trading",
    category: L("Quality and safety", "الجودة والسلامة"),
    title: L("Quality and safety standards in the scrap trade", "معايير الجودة والسلامة في تجارة الخردة"),
    description: L(
      "The standards that make scrap trading reliable and safe: grade specifications, alloy verification, certified weighing, radiation awareness, hazardous items, ISO management systems and licensing in Saudi Arabia.",
      "المعايير التي تجعل تجارة الخردة موثوقة وآمنة: مواصفات الدرجات، والتحقق من السبائك، والوزن المعتمد، والوعي الإشعاعي، والمواد الخطرة، وأنظمة إدارة ISO، والترخيص في المملكة.",
    ),
    sources: ["remaCircular", "iaeaScrap", "wasteLaw", "recyclingLicences", "mwan"],
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  },
];
