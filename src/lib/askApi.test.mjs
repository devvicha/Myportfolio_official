import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { ASK_MAX_LENGTH, getAskEndpoint, requestAnswer } from "./askApi.js";

afterEach(() => mock.restoreAll());

test("normalizes service origins and complete API endpoints", () => {
  assert.equal(getAskEndpoint(" https://portfolio.example/ "), "https://portfolio.example/api/ask");
  assert.equal(getAskEndpoint("https://portfolio.example/api/ask///"), "https://portfolio.example/api/ask");
  assert.equal(getAskEndpoint(" "), null);
});

test("keeps the backend request contract and handles malformed optional metadata", async () => {
  const fetchMock = mock.method(globalThis, "fetch", async () => new Response(JSON.stringify({
    answer: "  A grounded answer.  ",
    sources: ["project.md", null, { invalid: true }, ""],
    tools: "invalid metadata",
  })));
  const answer = await requestAnswer("https://portfolio.example", "  What has he built? ");
  const [url, options] = fetchMock.mock.calls[0].arguments;
  assert.equal(url, "https://portfolio.example/api/ask");
  assert.equal(options.method, "POST");
  assert.deepEqual(JSON.parse(options.body), { question: "What has he built?" });
  assert.deepEqual(answer, { answer: "A grounded answer.", sources: ["project.md"], tools: [], grounded: false, mode: "unknown", model: null });
});

test("preserves live model provenance and does not upgrade mock or static responses", async () => {
  for (const mode of ["live", "mock", "static"]) {
    mock.method(globalThis, "fetch", async () => new Response(JSON.stringify({ answer: "A response.", mode, grounded: mode === "live", model: mode === "live" ? "gemini-3.8-flash" : null })));
    const result = await requestAnswer("https://portfolio.example", "A question");
    assert.equal(result.mode, mode);
    assert.equal(result.grounded, mode === "live");
    assert.equal(result.model, mode === "live" ? "gemini-3.8-flash" : null);
    mock.restoreAll();
  }
});

test("rejects malformed or missing answers instead of showing empty success", async () => {
  for (const data of [null, {}, { answer: "  " }, { answer: { text: "not a string" } }]) {
    mock.method(globalThis, "fetch", async () => new Response(JSON.stringify(data)));
    await assert.rejects(requestAnswer("https://portfolio.example", "A question"), /incomplete answer/);
    mock.restoreAll();
  }
});

test("rejects server errors before reading a successful answer", async () => {
  mock.method(globalThis, "fetch", async () => new Response("Server failure", { status: 500 }));
  await assert.rejects(requestAnswer("https://portfolio.example", "A question"), /HTTP 500/);
});

test("enforces the live backend's 500-character limit before making a request", async () => {
  const fetchMock = mock.method(globalThis, "fetch", async () => new Response(JSON.stringify({ answer: "At the limit." })));
  await assert.rejects(requestAnswer("https://portfolio.example", "x".repeat(ASK_MAX_LENGTH + 1)), /500 characters/);
  await assert.rejects(requestAnswer("https://portfolio.example", "  "), /500 characters/);
  assert.equal(fetchMock.mock.calls.length, 0);
  await requestAnswer("https://portfolio.example", "x".repeat(ASK_MAX_LENGTH));
  assert.equal(fetchMock.mock.calls.length, 1);
});

test("aborts a stalled request at its deadline", async () => {
  let fetchSignal;
  mock.method(globalThis, "fetch", async (_url, { signal }) => {
    fetchSignal = signal;
    return new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError"))));
  });
  await assert.rejects(requestAnswer("https://portfolio.example", "A question", { timeoutMs: 10 }), /too long/);
  assert.equal(fetchSignal.aborted, true);
});

test("propagates cancellation when the assistant unmounts", async () => {
  const controller = new AbortController();
  mock.method(globalThis, "fetch", async (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
  }));
  const request = requestAnswer("https://portfolio.example", "A question", { signal: controller.signal });
  controller.abort();
  await assert.rejects(request, { name: "AbortError" });
});
