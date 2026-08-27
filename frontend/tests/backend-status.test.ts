import { afterEach, describe, expect, it, vi } from "vitest";
import { getBackendStatus } from "../src/lib/backend-status";

// These tests exercise `getBackendStatus`'s success/failure branching using
// a mocked `fetch` — no real network call is made here (that is covered by
// the separate `backend-status.integration.test.ts`, which hits the real,
// live NestJS backend).
describe("getBackendStatus", () => {
  const originalApiUrl = process.env.NEXT_PUBLIC_API_URL;

  afterEach(() => {
    vi.restoreAllMocks();
    process.env.NEXT_PUBLIC_API_URL = originalApiUrl;
  });

  it("returns ok:true with the resolved text on a successful response", async () => {
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3100";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Hello World", { status: 200 }),
    );

    const result = await getBackendStatus();

    expect(result).toEqual({ ok: true, text: "Hello World" });
  });

  it("returns ok:false when the fetch rejects (network error)", async () => {
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3100";
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new Error("ECONNREFUSED"),
    );

    const result = await getBackendStatus();

    expect(result).toEqual({ ok: false });
  });

  it("returns ok:false on a non-2xx response", async () => {
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3100";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Internal Server Error", { status: 500 }),
    );

    const result = await getBackendStatus();

    expect(result).toEqual({ ok: false });
  });

  it("returns ok:false on an empty response body", async () => {
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3100";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("", { status: 200 }),
    );

    const result = await getBackendStatus();

    expect(result).toEqual({ ok: false });
  });

  it("returns ok:false when NEXT_PUBLIC_API_URL is not configured", async () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const result = await getBackendStatus();

    expect(result).toEqual({ ok: false });
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
