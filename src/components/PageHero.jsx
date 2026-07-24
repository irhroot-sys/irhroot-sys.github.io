import { FaChevronRight } from "react-icons/fa";
import { Link } from "../lib/router.jsx";

export function PageHero({ eyebrow, title, copy, image, alt, trail }) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="page-hero-media" style={{ backgroundImage: `url(${image})` }} role="img" aria-label={alt} />
      <div className="page-hero-copy content-width">
        <div className="page-breadcrumb"><Link to="/">Home</Link><FaChevronRight /> <span>{trail || title}</span></div>
        <span className="page-kicker">{eyebrow}</span>
        <h1 id="page-title">{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}
