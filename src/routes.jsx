import { HomePage } from "./pages/HomePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ServicesPage } from "./pages/ServicesPage.jsx";
import { MaterialsPage } from "./pages/MaterialsPage.jsx";
import { FaqPage } from "./pages/FaqPage.jsx";
import { LegalPage } from "./pages/LegalPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { legalContent } from "./data/siteContent.jsx";
import { splitLocalePath } from "./lib/i18n.js";

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
    heroImage: DEFAULT_IMAGE,
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
  {
    path: "/materials",
    element: () => <MaterialsPage />,
    title: "Materials",
    description: "Review the ferrous and non-ferrous materials AALKC purchases, including copper, steel, aluminum, brass, cast iron, stainless steel, and structural plate.",
    image: "/assets/service-construction-materials.webp",
    heroImage: "/assets/service-construction-materials.webp",
    changefreq: "monthly",
    priority: "0.9",
  },
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
