const MESSAGE_LIMIT = 2000;

// Location, timing and what the enquiry concerns travel inside the message,
// labelled in English for the operations team, ahead of the visitor's text.
export function composeEnquiryMessage({ message = "", location, timing, service }) {
  const details = [
    service && `Regarding: ${service}`,
    location && `Site location: ${location}`,
    timing && `Collection timing: ${timing}`,
  ].filter(Boolean);
  const text = String(message).trim();
  const composed = details.length ? `${details.join("\n")}\n\n${text}` : text;
  return composed.slice(0, MESSAGE_LIMIT);
}

// Empty or out-of-range input is left out rather than rejected: the weight is
// an optional estimate, and the API accepts 0.1 to 1000 tonnes.
export function parseWeightTons(value) {
  const weight = Number.parseFloat(String(value ?? "").replace(",", "."));
  if (!Number.isFinite(weight) || weight < 0.1 || weight > 1000) return undefined;
  return Math.round(weight * 10) / 10;
}

export function readQuoteDetails(formData) {
  return {
    material: formData.get("material") || undefined,
    weightTons: parseWeightTons(formData.get("weightTons")),
    location: String(formData.get("location") || "").trim() || undefined,
    timing: formData.get("timing") || undefined,
  };
}

export async function submitEnquiry(payload, { signal } = {}) {
  if (payload.website) return { status: "ok" };

  const response = await fetch("/api/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      company: payload.company || undefined,
      email: payload.email,
      phone: payload.phone,
      message: composeEnquiryMessage(payload),
      material: payload.material || payload.service || payload.subject || undefined,
      weightTons: payload.weightTons,
      consent: payload.consent,
      turnstileToken: payload.turnstileToken,
    }),
    signal,
  });

  let result;
  try {
    result = await response.json();
  } catch {
    result = { error: "The server returned an unexpected response." };
  }

  if (!response.ok) {
    throw new Error(result.error || "We could not send your enquiry. Please try again.");
  }

  return result;
}
