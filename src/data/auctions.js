import { L } from "../lib/i18n.js";
import { markFor } from "./engagements.js";

// AALKC's record of industrial scrap auctions and tenders.
//
// Publication rules — every entry must keep to them:
// - An entry is listed only when AALKC holds documents for it (the sale's
//   invitation, catalogue or conditions, or the platform's own notices), and
//   it claims only the stage those documents prove.
// - Bid amounts, deposits, guarantees, auction numbers and outcomes are never
//   published, and neither is any statement that AALKC won or lost a sale.
// - A seller is named only where its own sale documents name it. A sale whose
//   seller is not yet confirmed is described by its sector and region instead.
// - Names identify who ran each sale; they never imply an award, a contract,
//   a partnership or an endorsement. The only logos are those of the sale
//   channels, shown to identify them (src/data/engagements.js).
// - One entry per seller: repeat sales by the same seller are one record.
// Sales still awaiting confirmation are kept out of this file entirely until
// they are confirmed (tests/lib/auctions.test.ts enforces the rules above).

// The stages of a sale, in the order a sale runs. Each record lists only the
// stages its documents prove — a public auction can be bid on without a
// personal invitation, and a direct sale can be inspected without a
// catalogue — and is labelled by the furthest of them.
export const auctionStages = [
  {
    id: "reviewed",
    label: L("Sale documents reviewed", "مراجعة وثائق البيع"),
    definition: L(
      "The catalogue and conditions of sale were received and assessed against the materials we handle.",
      "استلمنا كتالوج البيع وشروطه وقيّمناهما مقابل المواد التي نتعامل معها.",
    ),
  },
  {
    id: "invited",
    label: L("Invited to bid", "دعوة للمزايدة"),
    definition: L(
      "The organiser invited AALKC to inspect the lots and bid.",
      "دعت الجهة المنظِّمة أمانة الكلمة إلى معاينة المجموعات والمزايدة عليها.",
    ),
  },
  {
    id: "inspected",
    label: L("Site inspection", "معاينة الموقع"),
    definition: L(
      "Our representatives inspected the assets in person before any price was set.",
      "عاين ممثلونا الأصول ميدانيًا قبل تحديد أي سعر.",
    ),
  },
  {
    id: "offered",
    label: L("Offer submitted", "تقديم عرض"),
    definition: L(
      "A priced bid or offer was formally submitted under the sale's terms.",
      "قُدِّم عطاء أو عرض مسعَّر رسميًا وفق شروط البيع.",
    ),
  },
];

const ORGANISER_QAHTANI = L("Al-Qahtani Auctions, sealed envelope", "شركة القحطاني للمزادات، بالظرف المختوم");
const SURPLUS = L("Surplus materials and scrap", "مواد فائضة وخردة");

// Furthest stage first; within a stage, the most recent sale first.
export const auctionRecord = [
  {
    id: "government-etimad",
    seller: L("Government auction, Madinah", "مزاد حكومي، المدينة المنورة"),
    sector: L("Public sector", "القطاع الحكومي"),
    channel: L("Etimad, the government procurement platform", "منصة اعتماد للمشتريات الحكومية"),
    scope: L("Used water meters", "عدادات مياه مستعملة"),
    region: L("Madinah", "المدينة المنورة"),
    period: L("2026", "2026"),
    stages: ["reviewed", "offered"],
    note: L("Registered on Etimad and bid under the platform's terms.", "سجّلنا في منصة اعتماد وقدّمنا عطاءنا وفق شروط المنصة."),
  },
  {
    id: "plant-assets",
    seller: L("Polysilicon plant assets", "أصول مصنع بولي سيليكون"),
    sector: L("Industrial plant", "منشأة صناعية"),
    channel: L("Direct sale", "بيع مباشر"),
    scope: L("Copper and control cable, aluminium and compressor scrap", "كابلات نحاسية وكابلات تحكم، وخردة ألمنيوم وضواغط"),
    period: L("2026", "2026"),
    stages: ["inspected", "offered"],
    note: L("Our representatives inspected the site before the offer was priced.", "عاين ممثلونا الموقع قبل تسعير العرض."),
  },
  {
    id: "yasref",
    seller: L("YASREF — Yanbu Aramco Sinopec Refining Company", "ياسرف — شركة ينبع أرامكو سينوبك للتكرير"),
    sector: L("Refining", "التكرير"),
    channel: ORGANISER_QAHTANI,
    scope: L("Eight tender lots", "ثماني مجموعات مناقصة"),
    region: L("Yanbu", "ينبع"),
    period: L("September 2026", "سبتمبر 2026"),
    stages: ["reviewed", "invited"],
  },
  {
    id: "saudi-electricity",
    seller: L("Saudi Electricity Company (now Saudi Energy)", "الشركة السعودية للكهرباء (السعودية للطاقة)"),
    sector: L("Power generation and distribution", "توليد الكهرباء وتوزيعها"),
    channel: ORGANISER_QAHTANI,
    scope: L("Transformers, cables, poles and power-station materials", "محولات وكابلات وأعمدة ومواد محطات"),
    region: L("Central, Eastern, Western, Northern and Southern regions", "المناطق الوسطى والشرقية والغربية والشمالية والجنوبية"),
    period: L("Several sales, 2025–2026", "عدة مزادات، 2025–2026"),
    stages: ["reviewed"],
  },
  {
    id: "olayan",
    seller: L("Arabian Olayan Company", "الشركة العربية العليان"),
    channel: ORGANISER_QAHTANI,
    scope: SURPLUS,
    period: L("September 2026", "سبتمبر 2026"),
    stages: ["reviewed"],
  },
  {
    id: "mobily",
    seller: L("Mobily", "موبايلي"),
    sector: L("Telecommunications", "الاتصالات"),
    channel: ORGANISER_QAHTANI,
    scope: SURPLUS,
    period: L("Several sales, 2026", "عدة مزادات، 2026"),
    stages: ["reviewed"],
  },
  {
    id: "saudi-aramco",
    seller: L("Saudi Aramco", "أرامكو السعودية"),
    sector: L("Oil and gas", "النفط والغاز"),
    channel: L("Sealed bid sale by the company", "بيع بالظرف المختوم من الشركة"),
    scope: L("Ten lots at four company sites", "عشر مجموعات في أربعة مواقع للشركة"),
    period: L("2026", "2026"),
    stages: ["reviewed"],
  },
  {
    id: "sanad",
    seller: L("Saudi Aramco Nabors Drilling (SANAD)", "أرامكو السعودية نابورز للحفر (سند)"),
    sector: L("Drilling", "الحفر"),
    channel: ORGANISER_QAHTANI,
    scope: SURPLUS,
    period: L("April 2026", "أبريل 2026"),
    stages: ["reviewed"],
  },
];

const stageOrder = auctionStages.map(({ id }) => id);

// The furthest stage a record reached.
export function furthestStage(record) {
  const index = Math.max(...record.stages.map((id) => stageOrder.indexOf(id)));
  return auctionStages[index];
}

// Where industrial sales reach AALKC.
export const auctionChannels = [
  {
    name: L("Al-Qahtani Auctions", "شركة القحطاني للمزادات"),
    mark: markFor("al-qahtani-auctions"),
    text: L(
      "Sealed-envelope sales of surplus and scrap for utilities, energy, drilling and telecom companies across the Kingdom.",
      "مزادات بالظرف المختوم للفوائض والخردة لشركات المرافق والطاقة والحفر والاتصالات في أنحاء المملكة.",
    ),
  },
  {
    name: L("Etimad", "منصة اعتماد"),
    mark: markFor("etimad"),
    text: L(
      "The government platform through which public entities sell surplus assets by auction.",
      "المنصة الحكومية التي تبيع عبرها الجهات العامة أصولها الفائضة بالمزاد.",
    ),
  },
  {
    name: L("Saudi eMazad", "المزاد الإلكتروني"),
    mark: markFor("emazad"),
    text: L(
      "The Kingdom's electronic auction platform for public sales.",
      "منصة المزادات الإلكترونية للبيوع العامة في المملكة.",
    ),
  },
  {
    name: L("Direct from asset owners", "مباشرة من مالكي الأصول"),
    text: L(
      "Sealed bid and private sales offered by the owner of the assets or its contractor.",
      "البيع بالظرف المختوم والبيع الخاص الذي يطرحه مالك الأصول أو مقاوله.",
    ),
  },
];

// What a seller can expect when AALKC takes part. Each line restates a
// capability the site already publishes, linked to where it is described.
export const auctionCapabilities = [
  {
    term: L("Inspection before price", "المعاينة قبل التسعير"),
    text: L(
      "Lots are inspected by AALKC's own representatives before an offer is priced, so the offer reflects the material as it stands.",
      "يعاين ممثلو أمانة الكلمة المجموعات قبل تسعير العرض، ليعكس العرض حالة المادة كما هي.",
    ),
  },
  {
    term: L("Dismantling and clearance", "التفكيك والإخلاء"),
    text: L(
      "Plant and equipment are dismantled with recoverable metal separated on site. See [industrial demolition](/services/industrial-demolition).",
      "تُفكَّك المنشآت والمعدات مع فصل المعادن القابلة للاسترداد في الموقع. اطّلع على [الهدم الصناعي](/services/industrial-demolition).",
    ),
  },
  {
    term: L("Heavy transport", "النقل الثقيل"),
    text: L(
      "Fleet and routes planned for bulk loads and heavy items. See [heavy logistics](/services/heavy-logistics).",
      "أسطول ومسارات مخطَّطة للحمولات الكبيرة والقطع الثقيلة. اطّلع على [الخدمات اللوجستية الثقيلة](/services/heavy-logistics).",
    ),
  },
  {
    term: L("Grading and weighing", "التصنيف والوزن"),
    text: L(
      "Laser and XRF-supported identification, and certified industrial scales. See [how we work](/process).",
      "تعرّف مدعوم بالليزر وتقنية XRF، وموازين صناعية معتمدة. اطّلع على [كيف نعمل](/process).",
    ),
  },
  {
    term: L("Management standards", "معايير الإدارة"),
    text: L(
      "ISO 9001, ISO 14001 and ISO 45001, recorded in the [company register](/about#credentials).",
      "ISO 9001 وISO 14001 وISO 45001، مدوَّنة في [سجل الشركة](/about#credentials).",
    ),
  },
];

// What the record leaves out, and why.
export const auctionDisclosures = [
  L("Every entry is supported by sale documents or platform notices held by AALKC.", "كل إدخال مدعوم بوثائق بيع أو إشعارات منصات محفوظة لدى أمانة الكلمة."),
  L("Bid amounts, deposits, guarantees and outcomes are confidential and are never published.", "قيم العطاءات والعرابين والضمانات والنتائج سرّية ولا تُنشر أبدًا."),
  L("Organisations are named only to identify the sale. No contract award, partnership or endorsement is implied.", "تُذكر الجهات للتعريف بالبيع فقط، ولا يعني ذلك ترسية عقد أو شراكة أو تزكية."),
  L("Logos are the trademarks of their owners and appear only to identify them.", "الشعارات علامات تجارية مملوكة لأصحابها، وتظهر للتعريف بهم فقط."),
  L("Sales still awaiting confirmation are not listed.", "لا تُدرج المزادات التي لا تزال بانتظار التأكيد."),
];

export const auctionsGuide = {
  title: L("Auctions & tenders", "المزادات والمناقصات"),
  // The document title: the search phrase, where the breadcrumb and footer
  // use the short name.
  seoTitle: L("Industrial Scrap Auctions & Tenders", "مزادات ومناقصات الخردة الصناعية"),
  description: L(
    "AALKC's record of industrial scrap auctions and tenders in Saudi Arabia: the government, utility, energy and telecom sales we have bid in, inspected or reviewed, and what we bring to a sale.",
    "سجل أمانة الكلمة في مزادات ومناقصات الخردة الصناعية في المملكة: المزادات الحكومية ومزادات شركات المرافق والطاقة والاتصالات التي قدّمنا فيها عروضًا أو عايناها أو راجعناها، وما نقدّمه في كل بيع.",
  ),
  heading: L("Industrial auctions and tenders, on the record.", "المزادات والمناقصات الصناعية، موثّقة."),
  standfirst: L(
    "The sales AALKC has bid in, inspected and studied — each marked by how far we went, and nothing more.",
    "المزادات التي قدّمت فيها أمانة الكلمة عروضها أو عاينتها أو درستها — ولكلٍّ منها المرحلة التي بلغناها، لا أكثر.",
  ),
  faq: [
    {
      question: L("Does AALKC take part in industrial scrap auctions?", "هل تشارك أمانة الكلمة في مزادات الخردة الصناعية؟"),
      answer: L(
        "Yes. AALKC has submitted offers in government and direct sales, and follows the sealed-envelope sales held for Saudi utility, energy, drilling and telecom companies. Each entry on this page shows the stage we reached in that sale.",
        "نعم. قدّمت أمانة الكلمة عروضًا في مزادات حكومية وبيوع مباشرة، وتتابع المزادات بالظرف المختوم التي تُطرح لشركات المرافق والطاقة والحفر والاتصالات السعودية. ويبيّن كل إدخال في هذه الصفحة المرحلة التي بلغناها في ذلك البيع.",
      ),
    },
    {
      question: L("Does a listing mean AALKC won the sale or works with that company?", "هل يعني الإدراج أن أمانة الكلمة رست عليها الصفقة أو أنها تعمل مع تلك الجهة؟"),
      answer: L(
        "No. A listing records AALKC's own part in a sale — reviewing it, inspecting it or bidding in it. It does not state or imply a contract award, a partnership or an endorsement.",
        "لا. يوثّق الإدراج دور أمانة الكلمة في البيع فقط — مراجعته أو معاينته أو المزايدة فيه. ولا يعني ولا يوحي بترسية عقد أو شراكة أو تزكية.",
      ),
    },
    {
      question: L("Why are bid amounts and results not shown?", "لماذا لا تُعرض قيم العطاءات ونتائجها؟"),
      answer: L(
        "Bid amounts, deposits and outcomes are commercially confidential to AALKC and to each seller, so they are never published.",
        "قيم العطاءات والعرابين والنتائج معلومات تجارية سرّية لأمانة الكلمة ولكل بائع، لذلك لا تُنشر أبدًا.",
      ),
    },
    {
      question: L("Can we invite AALKC to bid on our surplus assets?", "هل يمكننا دعوة أمانة الكلمة للمزايدة على أصولنا الفائضة؟"),
      answer: L(
        "Yes. Send the catalogue or lot list, the site location, the inspection window and the closing date, and we will confirm whether we will inspect and bid.",
        "نعم. أرسل الكتالوج أو قائمة المجموعات وموقع الأصول وفترة المعاينة وتاريخ الإغلاق، وسنؤكد ما إذا كنا سنعاين ونزايد.",
      ),
    },
  ],
};
