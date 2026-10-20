import { certifications, contactDetails } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

// The facts a procurement team checks first, set as a company register.
// Every entry is taken from the company's own registration and contact
// details already published on the site.
export function CompanyRegister({ index, commitments }) {
  const { t, isArabic } = useLanguage();
  const standards = certifications.filter(({ title }) => title.startsWith("ISO"));
  return (
    <section className="company-register content-section surface-white" aria-label={t("Company register")}>
      <div className="container register-layout">
        <div className="register-intro">
          <SectionHeading
            index={index}
            eyebrow="Company register"
            title="A registered, certified counterpart."
            copy="The details a procurement team checks first, in one place."
            compact
          />
          {commitments && (
            <ol className="commitments">
              {commitments.map(({ icon: Icon, title, copy }) => (
                <li key={title}>
                  <Icon aria-hidden="true" />
                  <div><h3>{t(title)}</h3><p>{t(copy)}</p></div>
                </li>
              ))}
            </ol>
          )}
        </div>
        <dl className="register">
          <div><dt>{t("Legal name")}</dt><dd><span dir="ltr">Amanat Al-Kalima Company</span><small lang="ar" dir="rtl">شركة أمانة الكلمة</small></dd></div>
          <div><dt>{t("Commercial registration")}</dt><dd dir="ltr" className="is-mono">{contactDetails.commercialRegistration}</dd></div>
          <div><dt>{t("Year Established")}</dt><dd>2017</dd></div>
          <div><dt>{t("Operating Status")}</dt><dd>{t("Licensed scrap metal dealer")}</dd></div>
          <div><dt>{t("Headquarters")}</dt><dd>{isArabic ? contactDetails.addressArabic : contactDetails.address}</dd></div>
          <div><dt>{t("Service Coverage")}</dt><dd><span>{t("Eastern Province")}</span><small>{t("Kingdom of Saudi Arabia")}</small></dd></div>
          <div><dt>{t("Management standards")}</dt><dd dir="ltr" className="is-mono">{standards.map(({ title }) => title).join(" · ")}</dd></div>
          <div><dt>{t("Registry")}</dt><dd>{t("Saudi Ministry of Commerce")}<small>{t("Verified")}</small></dd></div>
        </dl>
      </div>
    </section>
  );
}
