/**
 * Server-side backend connectivity check.
 *
 * Calls the NestJS backend's `GET /` root route directly using the base URL
 * configured via `NEXT_PUBLIC_API_URL` (see `.env.example`). Never throws —
 * any failure (backend not running, network error, non-2xx status, timeout,
 * empty/unexpected body, missing config, etc.) is caught and reported as
 * `{ ok: false }` so callers (e.g. `TopBar`) can render a fallback without
 * needing their own try/catch.
 */
export type BackendStatus = { ok: true; text: string } | { ok: false };

export async function getBackendStatus(): Promise<BackendStatus> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    return { ok: false };
  }

  try {
    const res = await fetch(baseUrl, { cache: "no-store" });
    if (!res.ok) {
      return { ok: false };
    }

    const text = await res.text();
    if (!text) {
      return { ok: false };
    }

    return { ok: true, text };
  } catch {
    return { ok: false };
  }
}
