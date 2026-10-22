import { L } from "../lib/i18n.js";

// AALKC's own photographs — its yard, fleet, equipment and sorted material —
// and where each one is used. Keeping the page photographs in one table means
// a route's preloaded hero image and the image its page renders can never
// drift apart. Alt text describes only what is visible in the frame.
// Sources and licences: public/assets/PHOTO-CREDITS.md.
const photo = (name, alt, focus = "center") => ({ src: `/assets/yard/${name}.webp`, alt, focus });

export const photos = {
  yardEntrance: photo("aalkc-yard-entrance-night", L("The AALKC yard entrance at night, with the company sign on the gate wall", "مدخل ساحة أمانة الكلمة ليلًا، ولوحة الشركة على جدار البوابة"), "96% 50%"),
  cableReelLoading: photo("cable-reel-loading", L("Cable reels being loaded at an industrial yard", "تحميل بكرات الكابلات في ساحة صناعية")),
  castMetal: photo("cast-metal-components", L("A worker beside large cast metal components", "عامل بجوار مكوّنات معدنية مصبوبة كبيرة")),
  weighbridge: photo("yard-weighbridge", L("The weighbridge at the recycling yard", "الميزان الأرضي في ساحة إعادة التدوير")),
  scrapTrailer: photo("scrap-trailer", L("A loaded scrap trailer on an industrial road", "مقطورة خردة محمّلة على طريق صناعي")),
  structuralScrap: photo("structural-scrap-yard", L("Structural steel scrap at the yard after rain", "خردة فولاذ إنشائي في الساحة بعد المطر")),
  truckGrapple: photo("truck-grapple-loading", L("A truck loaded by grapple at the recycling yard", "تحميل شاحنة بالكلّاب في ساحة إعادة التدوير")),
  grappleSteel: photo("grapple-steel-piles", L("A scrap handler's grapple working through steel piles", "كلّاب آلة مناولة الخردة يعمل في أكوام الفولاذ")),
  craneCableReels: photo("crane-cable-reels", L("A crane loading cable reels for dispatch", "رافعة تحمّل بكرات الكابلات للشحن")),
  steelSections: photo("steel-channels-pipes", L("Steel channels, pipes and plates", "مقاطع فولاذية وأنابيب وألواح")),
  transformers: photo("used-transformers", L("Rows of used electrical transformers", "صفوف من المحوّلات الكهربائية المستعملة")),
  generatorStator: photo("generator-stator", L("A disassembled generator stator", "جزء ثابت لمولّد مفكّك")),
  cableTrays: photo("galvanized-cable-trays", L("Stacked galvanised cable trays", "حوامل كابلات مجلفنة مكدّسة")),
  steelPlates: photo("steel-plates", L("Stacked steel plates on timber spacers", "ألواح فولاذية مكدّسة على فواصل خشبية")),
  cableReelTrucks: photo("cable-reel-trucks", L("Cable reel trucks and crew at an industrial plant", "شاحنات بكرات الكابلات وفريق العمل في منشأة صناعية")),
  flatbedCable: photo("flatbed-cable-loops", L("A flatbed truck loaded with heavy cable", "شاحنة مسطحة محمّلة بكابلات ثقيلة")),
  statorInterior: photo("stator-interior", L("The inside of a disassembled stator", "الجزء الداخلي لجزء ثابت مفكّك")),
  ferrousYard: photo("ferrous-scrap-yard", L("Ferrous scrap stockpiled at the yard", "خردة حديدية مكدّسة في الساحة")),
  beamsContainers: photo("steel-beams-containers", L("Structural steel I-beams beside shipping containers", "عوارض فولاذية إنشائية بجوار حاويات شحن")),
  gatedTransformers: photo("transformers-safety-gates", L("Electrical transformers behind safety gates", "محوّلات كهربائية خلف بوابات السلامة")),
  cableDrums: photo("cable-drums-grapple", L("Cable drums and red cable handled by grapple", "بكرات كابلات وكابلات حمراء تُناول بالكلّاب")),
  switchgear: photo("switchgear-dismantling", L("Switchgear cabinets with an extracted circuit breaker", "خزائن مفاتيح كهربائية وقاطع دائرة مُستخرج")),
  sortedCopper: photo("sorted-copper-container", L("Sorted copper scrap inside a shipping container", "خردة نحاس مفروزة داخل حاوية شحن")),
  // Licensed, not AALKC's own (Unsplash): a foundry, for the page addressed to
  // mills and foundries that buy graded scrap.
  foundry: photo("foundry-pour", L("Molten metal being poured at a foundry", "صبّ المعدن المنصهر في مسبك")),
};

// The yard, in pictures: the homepage and About page gallery, in reading
// order. The entrance photograph is left out because it opens the homepage.
export const yardGallery = [
  photos.grappleSteel,
  photos.weighbridge,
  photos.sortedCopper,
  photos.craneCableReels,
  photos.generatorStator,
  photos.flatbedCable,
  photos.gatedTransformers,
  photos.structuralScrap,
  photos.cableDrums,
];
