"use client";
import { useState, FormEvent } from "react";

const METAL_TYPES_EN = [
  "Copper",
  "Copper Wire",
  "Aluminum",
  "Steel / Iron",
  "Stainless Steel",
  "Brass / Bronze",
  "Electrical Cables",
  "Motors / Transformers",
  "Mixed Metals",
  "Other",
];

const METAL_TYPES_AR = [
  "نحاس",
  "أسلاك نحاسية",
  "ألمنيوم",
  "حديد / صلب",
  "فولاذ مقاوم للصدأ",
  "نحاس أصفر / برونز",
  "كابلات كهربائية",
  "محركات / محولات",
  "معادن مختلطة",
  "أخرى",
];

interface ContactFormProps {
  lang?: "en" | "ar";
}

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm({ lang = "en" }: ContactFormProps) {
  const isAr = lang === "ar";
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const metalTypes = isAr ? METAL_TYPES_AR : METAL_TYPES_EN;

  const validate = (data: FormData): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!data.get("name")) errs.name = isAr ? "الاسم مطلوب" : "Name is required";
    if (!data.get("phone")) errs.phone = isAr ? "رقم الهاتف مطلوب" : "Phone is required";
    if (!data.get("metalType")) errs.metalType = isAr ? "نوع المعدن مطلوب" : "Metal type is required";
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setFormState("loading");

    try {
      // TODO (Phase B): Replace the mock delay below with a real form submission.
      // Option A — Formspree: await fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: data })
      // Option B — API Route: await fetch("/api/contact", { method: "POST", body: JSON.stringify(Object.fromEntries(data)) })
      // Remove this placeholder before deploying to production.
      await new Promise((r) => setTimeout(r, 1000));
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div
        className="rounded-xl border border-green-200 bg-green-50 p-8 text-center"
        role="alert"
        aria-live="polite"
      >
        <p className="text-3xl mb-2">✅</p>
        <p className="text-lg font-bold text-green-800">
          {isAr ? "تم إرسال طلبك بنجاح!" : "Your request was sent successfully!"}
        </p>
        <p className="mt-2 text-green-700">
          {isAr
            ? "سنتواصل معك في أقرب وقت ممكن."
            : "We will get back to you as soon as possible."}
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#0f4c6b] focus:outline-none focus:ring-2 focus:ring-[#0f4c6b]/20";
  const errorClass = "mt-1 text-xs text-red-600";
  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      dir={isAr ? "rtl" : "ltr"}
      noValidate
      aria-label={isAr ? "نموذج الاستفسار" : "Inquiry form"}
    >
      <h2 className="text-xl font-bold text-[#0a1f2e] mb-5">
        {isAr ? "أرسل لنا استفسارك" : "Send Us an Inquiry"}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            {isAr ? "الاسم الكامل" : "Full Name"} <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass}
            aria-required="true"
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className={errorClass} role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="company" className={labelClass}>
            {isAr ? "اسم الشركة" : "Company Name"}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            {isAr ? "رقم الهاتف" : "Phone Number"} <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            aria-required="true"
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className={errorClass} role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Metal Type */}
        <div>
          <label htmlFor="metalType" className={labelClass}>
            {isAr ? "نوع المعدن" : "Metal Type"} <span aria-hidden="true">*</span>
          </label>
          <select
            id="metalType"
            name="metalType"
            className={inputClass}
            aria-required="true"
            aria-describedby={errors.metalType ? "metal-error" : undefined}
            defaultValue=""
          >
            <option value="" disabled>
              {isAr ? "اختر النوع..." : "Select type..."}
            </option>
            {metalTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.metalType && (
            <p id="metal-error" className={errorClass} role="alert">
              {errors.metalType}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className={labelClass}>
            {isAr ? "الكمية (تقريبًا)" : "Quantity (approx.)"}
          </label>
          <input
            id="quantity"
            name="quantity"
            type="text"
            placeholder={isAr ? "مثال: ١ طن" : "e.g. 1 ton"}
            className={inputClass}
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className={labelClass}>
            {isAr ? "المدينة" : "City"}
          </label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            className={inputClass}
          />
        </div>
      </div>

      {/* Message */}
      <div className="mt-4">
        <label htmlFor="message" className={labelClass}>
          {isAr ? "الرسالة" : "Message"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClass}
          placeholder={
            isAr
              ? "صف مواد الخردة الخاصة بك..."
              : "Describe your scrap materials..."
          }
        />
      </div>

      {formState === "error" && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700" role="alert">
          {isAr
            ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مجددًا."
            : "Something went wrong. Please try again."}
        </div>
      )}

      <button
        type="submit"
        disabled={formState === "loading"}
        className="mt-5 w-full rounded-lg bg-[#0f4c6b] py-3 text-sm font-bold text-white hover:bg-[#0a3a54] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        aria-busy={formState === "loading"}
      >
        {formState === "loading"
          ? isAr
            ? "جارٍ الإرسال..."
            : "Sending..."
          : isAr
          ? "إرسال الاستفسار"
          : "Send Inquiry"}
      </button>
    </form>
  );
}
