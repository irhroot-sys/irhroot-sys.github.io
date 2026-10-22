import { collectionTimings, materials } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export const MIXED_MATERIAL = "Mixed or other metals";

// Optional structured details shared by the quote dialog and the contact form.
// They map onto fields the quote API already accepts (material, weightTons);
// location and timing are folded into the message by composeEnquiryMessage.
// A buyer's enquiry asks for the material only; quantity, destination and
// timing go in the requirement text, because supply lots can exceed the
// 1,000-tonne field and collection site and timing do not apply.
export function QuoteDetailsFields({ defaultMaterial, variant = "supply" }) {
  const { t } = useLanguage();
  const buying = variant === "buy";
  return (
    <>
      <div className="form-row">
        <label>{t("Material")} <span className="field-status">{t("Optional")}</span>
          <select name="material" defaultValue={defaultMaterial || ""}>
            <option value="">{t("Select a material")}</option>
            {materials.map(({ id, name }) => <option key={id} value={name}>{t(name)}</option>)}
            <option value={MIXED_MATERIAL}>{t(MIXED_MATERIAL)}</option>
          </select>
        </label>
        {!buying && <label>{t("Estimated weight (tonnes)")} <span className="field-status">{t("Optional")}</span>
          <input name="weightTons" type="number" inputMode="decimal" min="0.1" max="1000" step="0.1" dir="ltr" />
        </label>}
      </div>
      {!buying && <div className="form-row">
        <label>{t("Site location")} <span className="field-status">{t("Optional")}</span>
          <input name="location" autoComplete="address-level2" maxLength="80" placeholder={t("e.g. Dammam 2nd Industrial City")} />
        </label>
        <label>{t("Collection timing")} <span className="field-status">{t("Optional")}</span>
          <select name="timing" defaultValue="">
            <option value="">{t("Select timing")}</option>
            {collectionTimings.map((timing) => <option key={timing} value={timing}>{t(timing)}</option>)}
          </select>
        </label>
      </div>}
    </>
  );
}
