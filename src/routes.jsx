import { HomePage } from "./pages/HomePage.jsx";
import { HERO_IMAGE as HOME_HERO_IMAGE } from "./components/Hero.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ServicesPage } from "./pages/ServicesPage.jsx";
import { MaterialsPage } from "./pages/MaterialsPage.jsx";
import { FaqPage } from "./pages/FaqPage.jsx";
import { LegalPage } from "./pages/LegalPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { ServiceDetailPage } from "./pages/ServiceDetailPage.jsx";
import { IndustriesPage } from "./pages/IndustriesPage.jsx";
import { SustainabilityPage } from "./pages/SustainabilityPage.jsx";
import { industries, legalContent, materials, services } from "./data/siteContent.jsx";
import { ARTICLE_IMAGE, industryImages, industryMeta, insightMeta, materialMeta, processMeta, resolveSources } from "./data/knowledge/index.js";
import { KnowledgePage } from "./lib/knowledge.jsx";
import { splitLocalePath } from "./lib/i18n.js";
import { HOME_HERO_SIZES, PAGE_HERO_SIZES } from "./data/imageSizes.js";

const DEFAULT_IMAGE = "/assets/service-industrial-dismantling.webp";

// The single list of pages. The client router, the document head, the sitemap
// and the build-time prerender all read from here, so a page added once is
// routed, indexed and prerendered in both languages.
export const routes = [
  {
    path: "/",
    element: () => <HomePage />,
    title: "Scrap Metal Buyer & Recycling in Dammam",
    description: "Amanat Al-Kalima Company is a licensed scrap metal dealer in Dammam providing recycling, trading, collection, sorting, and industrial logistics services.",
    image: DEFAULT_IMAGE,
    heroImage: HOME_HERO_IMAGE,
    changefreq: "monthly",
    priority: "1.0",
  },
  {
    path: "/about",
    element: () => <AboutPage />,
    title: "About Us",
    description: "Learn about Amanat Al-Kalima Company, a licensed scrap metal dealer established in 2017 in Dammam, Saudi Arabia.",
    image: DEFAULT_IMAGE,
    heroImage: DEFAULT_IMAGE,
    changefreq: "yearly",
    priority: "0.8",
  },
  {
    path: "/services",
    element: () => <ServicesPage />,
    title: "Services",
    description: "Explore AALKC container service, industrial demolition, scrap purchasing, heavy logistics, metal sorting, and global export support.",
    image: "/assets/service-scrap-metal.webp",
    heroImage: "/assets/service-scrap-metal.webp",
    changefreq: "monthly",
    priority: "0.9",
  },
  // One page per service, generated from the service list.
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    element: () => <ServiceDetailPage slug={service.slug} />,
    title: service.title,
    description: service.overview,
    image: service.image,
    heroImage: service.image,
    parent: { title: "Services", path: "/services" },
    service,
    changefreq: "monthly",
    priority: "0.8",
  })),
  {
    path: "/industries",
    element: () => <IndustriesPage />,
    title: "Industries",
    description: "AALKC scrap metal collection, grading and purchasing for construction, manufacturing, industrial plants, electrical and commercial operations in the Eastern Province.",
    image: "/assets/service-construction-materials.webp",
    heroImage: "/assets/service-construction-materials.webp",
    changefreq: "monthly",
    priority: "0.8",
  },
  // One guide per sector.
  ...industries.map(({ slug }) => ({
    path: `/industries/${slug}`,
    element: () => <KnowledgePage name="IndustryDetailPage" slug={slug} />,
    knowledge: { kind: "industry", key: slug },
    title: industryMeta[slug].title,
    description: industryMeta[slug].description,
    image: industryImages[slug].image,
    heroImage: industryImages[slug].image,
    parent: { title: "Industries", path: "/industries" },
    changefreq: "yearly",
    priority: "0.7",
  })),
  {
    path: "/process",
    element: () => <KnowledgePage name="ProcessPage" />,
    knowledge: { kind: "process" },
    title: processMeta.title,
    description: processMeta.description,
    image: "/assets/service-metal-sorting.webp",
    heroImage: "/assets/service-metal-sorting.webp",
    changefreq: "yearly",
    priority: "0.8",
  },
  {
    path: "/sustainability",
    element: () => <SustainabilityPage />,
    title: "Sustainability",
    description: "How AALKC keeps industrial metal in productive use: circular materials, responsible handling, ISO 14001 environmental management and efficient logistics.",
    image: "/assets/service-metal-sorting.webp",
    heroImage: "/assets/service-metal-sorting.webp",
    changefreq: "yearly",
    priority: "0.7",
  },
  {
    path: "/materials",
    element: () => <MaterialsPage />,
    title: "Materials",
    description: "Review the ferrous and non-ferrous materials AALKC purchases, including copper, steel, aluminium, brass, cast iron, stainless steel, and structural plate.",
    image: "/assets/service-construction-materials.webp",
    heroImage: "/assets/service-construction-materials.webp",
    changefreq: "monthly",
    priority: "0.9",
  },
  // One guide per material family.
  ...materials.map(({ id, image }) => ({
    path: `/materials/${id}`,
    element: () => <KnowledgePage name="MaterialDetailPage" id={id} />,
    knowledge: { kind: "material", key: id },
    title: materialMeta[id].title,
    description: materialMeta[id].description,
    image,
    heroImage: image,
    parent: { title: "Materials", path: "/materials" },
    changefreq: "yearly",
    priority: "0.8",
  })),
  {
    path: "/insights",
    element: () => <KnowledgePage name="InsightsPage" />,
    knowledge: { kind: "hub" },
    title: "Insights",
    description: "Articles and guides on the scrap metal trade: grades and specifications, how metal is recycled, Saudi Arabia's scrap industry and circular economy, and practical advice for suppliers.",
    image: ARTICLE_IMAGE,
    heroImage: ARTICLE_IMAGE,
    changefreq: "monthly",
    priority: "0.8",
  },
  // Articles open on type, so they carry no hero image to preload.
  ...insightMeta.map((article) => ({
    path: `/insights/${article.slug}`,
    element: () => <KnowledgePage name="ArticlePage" slug={article.slug} />,
    knowledge: { kind: "insight", key: article.slug },
    title: article.title,
    description: article.description,
    image: ARTICLE_IMAGE,
    parent: { title: "Insights", path: "/insights" },
    article: { ...article, citations: resolveSources(article.sources).map(({ url }) => url) },
    changefreq: "yearly",
    priority: "0.7",
  })),
  {
    path: "/faq",
    element: () => <FaqPage />,
    title: "Frequently Asked Questions",
    description: "Answers about AALKC accepted scrap materials, industrial collection, grading, pricing, environmental controls, and supplier payments.",
    image: "/assets/service-scrap-metal.webp",
    heroImage: "/assets/service-scrap-metal.webp",
    changefreq: "yearly",
    priority: "0.7",
  },
  {
    path: "/contact",
    element: () => <ContactPage />,
    title: "Contact",
    description: "Contact Amanat Al-Kalima Company at 3508 Al Qatif 1 in Dammam for scrap-metal purchasing, collection, sorting, and industrial recycling enquiries.",
    image: "/assets/service-container-handling.webp",
    heroImage: "/assets/service-container-handling.webp",
    changefreq: "yearly",
    priority: "0.8",
  },
  {
    path: "/privacy",
    element: () => <LegalPage documentKey="privacy" />,
    title: legalContent.privacy.title,
    description: legalContent.privacy.intro,
    image: DEFAULT_IMAGE,
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/terms",
    element: () => <LegalPage documentKey="terms" />,
    title: legalContent.terms.title,
    description: legalContent.terms.intro,
    image: DEFAULT_IMAGE,
    changefreq: "yearly",
    priority: "0.3",
  },
];

// Each hero image is displayed at a size the layout fixes; the prerender
// preloads it with the same `sizes`, so the preload and the <img> agree.
for (const route of routes) {
  if (route.heroImage) route.heroSizes = route.path === "/" ? HOME_HERO_SIZES : PAGE_HERO_SIZES;
}

// Old URLs that now live elsewhere. The edge Worker answers these with a 301;
// the client follows the same table for in-app navigation.
export const redirects = {
  "/products": "/materials",
};

export const notFoundRoute = {
  path: null,
  element: () => <NotFoundPage />,
  title: "Page not found",
  description: "The requested AALKC page could not be found.",
  image: DEFAULT_IMAGE,
  noindex: true,
};

const routesByPath = new Map(routes.map((route) => [route.path, route]));

export function findRoute(path) {
  return routesByPath.get(path) ?? null;
}

// Identifies exactly which document a URL renders. The prerender stamps it on
// #root, and the client only hydrates when the URL it booted on produces the
// same key — otherwise it renders fresh rather than adopt mismatched markup.
export function renderKeyFor(pathname) {
  const { language, route } = splitLocalePath(pathname);
  if (redirects[route]) return `${language}:redirect`;
  return `${language}:${findRoute(route) ? route : "404"}`;
}
