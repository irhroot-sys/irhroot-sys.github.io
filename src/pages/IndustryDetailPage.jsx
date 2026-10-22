import { PageHero } from "../components/PageHero.jsx";
import { GuideBody } from "../components/Guide.jsx";
import { RelatedLinks } from "../components/LongForm.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { findIndustry, guideLinks, industryImages, industryMeta } from "../data/knowledge/index.js";
import { industryGuides } from "../data/knowledge/industries.js";
import { materials, services } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { L, translate } from "../lib/i18n.js";

const linked = (label, to) => L(`[${label.en}](${to})`, `[${label.ar}](${to})`);

// A run of inline links in both languages, e.g. the materials a sector
// produces, each pointing at its own page.
const linkList = (items) => L(
  items.map(({ label, to }) => `[${label}](${to})`).join(", "),
  items.map(({ label, to }) => `[${translate(label, "ar")}](${to})`).join("، "),
);
const materialIdByName = Object.fromEntries(materials.map((material) => [material.name, material.id]));
const serviceTitleBySlug = Object.fromEntries(services.map((service) => [service.slug, service.title]));

// The scrap a sector produces, set out as a table that links each stream to
// the guide for its grade, followed by how to separate and collect it.
function streamBlocks(streams) {
  return [
    { type: "h2", id: "streams", text: L("What the sector produces", "ما ينتجه القطاع") },
    {
      type: "table",
      caption: L("Typical scrap streams and the grades they fall into", "تيارات الخردة المعتادة والدرجات التي تندرج تحتها"),
      head: [L("Stream", "التيار"), L("Usual grade", "الدرجة المعتادة")],
      rows: streams.map(([stream, grade, to]) => [stream, linked(grade, to)]),
    },
  ];
}

export function IndustryDetailPage({ slug }) {
  const industry = findIndustry(slug);
  const guide = { ...industryMeta[slug], ...industryGuides[slug] };
  const { image, alt, focus } = industryImages[slug];
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow="Sector guide"
        title={guide.title}
        copy={guide.standfirst}
        image={image}
        alt={alt}
        focus={focus}
        trail={industry.title}
        parent={{ label: "Industries", to: "/industries" }}
      />
      <section className="content-section guide-section" aria-label={t(guide.title)}>
        <GuideBody
          brief={guide.brief}
          blocks={[...streamBlocks(guide.streams), ...guide.blocks]}
          faq={guide.faq}
          register={[
            { term: "Typical materials", text: linkList(industry.materials.map((name) => ({ label: name, to: `/materials/${materialIdByName[name]}` }))) },
            { term: "Relevant services", text: linkList(industry.services.map((serviceSlug) => ({ label: serviceTitleBySlug[serviceSlug], to: `/services/${serviceSlug}` }))) },
          ]}
        />
      </section>
      <section className="content-section surface-mist guide-onward">
        <div className="container">
          <RelatedLinks title="Keep reading" items={guideLinks({ services: industry.services, insights: guide.insights })} />
        </div>
      </section>
      <CtaBand title="Plan collection for your site" copy="Describe the material and the site, and our team will recommend the right approach." action="contact" />
    </>
  );
}
