export const ASK_MAX_LENGTH = 1000;

// Accept the configured service origin or its complete endpoint.
export function getAskEndpoint(apiUrl) {
  const base = typeof apiUrl === "string" ? apiUrl.trim().replace(/\/+$/, "") : "";
  if (!base) return null;
  return base.endsWith("/api/ask") ? base : `${base}/api/ask`;
}

const stringList = (value) =>
  Array.isArray(value) ? value.filter((item) => typeof item === "string" && item.trim()) : [];

export async function requestAnswer(apiUrl, question, { signal, timeoutMs = 25000 } = {}) {
  const endpoint = getAskEndpoint(apiUrl);
  const cleanQuestion = question.trim();
  if (!endpoint) throw new Error("The assistant is not configured.");
  if (!cleanQuestion || cleanQuestion.length > ASK_MAX_LENGTH) {
    throw new Error("Please enter a question of up to 1,000 characters.");
  }

  const controller = new AbortController();
  const cancel = () => controller.abort(signal?.reason);
  if (signal?.aborted) cancel();
  signal?.addEventListener("abort", cancel, { once: true });
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: cleanQuestion }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`The assistant returned HTTP ${response.status}.`);
    const data = await response.json();
    if (!data || typeof data.answer !== "string" || !data.answer.trim()) {
      throw new Error("The assistant returned an incomplete answer.");
    }
    return {
      answer: data.answer.trim(),
      sources: stringList(data.sources),
      tools: stringList(data.tools),
    };
  } catch (error) {
    if (timedOut) throw new Error("The assistant took too long to respond.");
    throw error;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", cancel);
  }
}
