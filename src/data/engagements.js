import { L } from "../lib/i18n.js";
import saudiAramco from "../assets/engagements/saudi-aramco.svg";
import saudiEnergy from "../assets/engagements/saudi-energy.svg";
import yasref from "../assets/engagements/yasref.webp";
import sadara from "../assets/engagements/sadara.svg";
import saudiWaterAuthority from "../assets/engagements/saudi-water-authority.svg";
import militaryIndustries from "../assets/engagements/military-industries-corporation.svg";
import abdullaFouad from "../assets/engagements/abdulla-fouad-group.svg";
import alQahtani from "../assets/engagements/al-qahtani-auctions.webp";
import etimad from "../assets/engagements/etimad.svg";
import emazad from "../assets/engagements/emazad.svg";

// The organisations whose sales, tenders and procurement AALKC has taken
// part in, and the public platforms it bids through. Each logo is the
// organisation's own file, taken from its website (or, where the site serves
// none, from its Wikipedia infobox), optimised but never redrawn or
// recoloured; see src/assets/engagements/README.md. `ratio` is the logo's
// width over its height, used to size every mark to the same optical weight.

export const engagements = [
  { id: "saudi-aramco", name: L("Saudi Aramco", "أرامكو السعودية"), sector: L("Energy", "الطاقة"), logo: saudiAramco, ratio: 3.57 },
  { id: "saudi-energy", name: L("Saudi Energy", "السعودية للطاقة"), sector: L("Power utility, formerly Saudi Electricity Company", "مرافق الكهرباء، الشركة السعودية للكهرباء سابقًا"), logo: saudiEnergy, ratio: 1.21, optical: 1.05 },
  { id: "yasref", name: L("Yanbu Aramco Sinopec Refining Company (YASREF)", "شركة ينبع أرامكو سينوبك للتكرير (ياسرف)"), sector: L("Refining", "التكرير"), logo: yasref, ratio: 2.43, width: 560, height: 230 },
  { id: "sadara", name: L("Sadara Chemical Company", "شركة صدارة للكيميائيات"), sector: L("Petrochemicals", "البتروكيماويات"), logo: sadara, ratio: 2.85 },
  { id: "saudi-water-authority", name: L("Saudi Water Authority", "الهيئة السعودية للمياه"), sector: L("Water utility", "مرافق المياه"), logo: saudiWaterAuthority, ratio: 1.26, optical: 1.1 },
  { id: "military-industries-corporation", name: L("Military Industries Corporation", "المؤسسة العامة للصناعات العسكرية"), sector: L("Defence manufacturing", "الصناعات العسكرية"), logo: militaryIndustries, ratio: 1.69, optical: 1.05 },
  { id: "abdulla-fouad-group", name: L("Abdulla Fouad Group", "مجموعة عبدالله فؤاد"), sector: L("Diversified industrial group", "مجموعة صناعية متنوعة"), logo: abdullaFouad, ratio: 9.42, optical: 1.1 },
  { id: "al-qahtani-auctions", name: L("Al-Qahtani Auctions Company", "شركة القحطاني للمزادات"), sector: L("Industrial auctions", "المزادات الصناعية"), logo: alQahtani, ratio: 1, width: 214, height: 214, optical: 0.85 },
];

// Public platforms AALKC registers on and bids through. Platforms, not
// industrial companies, so they are shown apart from the organisations.
export const platforms = [
  {
    id: "etimad",
    name: L("Etimad", "منصة اعتماد"),
    kind: L("Government procurement and auctions", "المشتريات والمزادات الحكومية"),
    text: L(
      "The national platform through which government entities run tenders and sell surplus assets by auction. AALKC is registered on Etimad and bids through it.",
      "المنصة الوطنية التي تطرح عبرها الجهات الحكومية منافساتها وتبيع أصولها الفائضة بالمزاد. أمانة الكلمة مسجّلة في منصة اعتماد وتقدّم عطاءاتها من خلالها.",
    ),
    logo: etimad,
    ratio: 2.33,
    domain: "etimad.sa",
  },
  {
    id: "emazad",
    name: L("Saudi eMazad", "المزاد الإلكتروني"),
    kind: L("Electronic public auctions", "المزادات العامة الإلكترونية"),
    text: L(
      "Saudi Arabia's electronic auction platform for public sales. AALKC takes part in auctions run on eMazad.",
      "منصة المزادات الإلكترونية للبيوع العامة في المملكة. تشارك أمانة الكلمة في المزادات المطروحة عبر المزاد الإلكتروني.",
    ),
    logo: emazad,
    ratio: 2.4,
    domain: "emazad.sa",
  },
];

// The logo record for an organisation or platform, for use elsewhere on the
// site (the sale channels on the auctions page).
export function markFor(id) {
  return [...engagements, ...platforms].find((item) => item.id === id) ?? null;
}

// A logo's display height in rem: every mark covers about the same area, so
// a square emblem and a long wordmark read with equal weight, then the height
// is held within the plate. `optical` corrects for marks that are visually
// denser or lighter than their bounding box suggests.
const LOGO_AREA = 34; // rem², about 3.7rem tall at a 2.5:1 ratio
export function logoHeight({ ratio, optical = 1 }) {
  const height = Math.sqrt(LOGO_AREA / ratio) * optical;
  return Math.min(Math.max(height, 1.2), 5.4);
}
