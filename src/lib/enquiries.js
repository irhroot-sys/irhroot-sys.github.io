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
      message: payload.message,
      material: payload.service || payload.subject || undefined,
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
