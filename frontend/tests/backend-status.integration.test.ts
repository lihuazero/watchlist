import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import { createServer } from "node:net";
import * as path from "node:path";
import { getBackendStatus } from "../src/lib/backend-status";

/**
 * End-to-end connectivity test: starts the real NestJS backend service (via
 * its own `ts-node` dev entrypoint, unmodified) on an ephemeral port, points
 * the frontend's `NEXT_PUBLIC_API_URL` at it, and then — without going
 * through a browser or rendering any UI — directly invokes
 * `getBackendStatus()` (the same function `TopBar` awaits) to call the live
 * `GET /` endpoint. This verifies real end-to-end connectivity between the
 * two services, independent of any component rendering.
 *
 * No backend source or test files are modified or added for this test.
 */

const backendDir = path.resolve(__dirname, "../../backend");

async function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, () => {
      const address = server.address();
      if (address && typeof address === "object") {
        const { port } = address;
        server.close(() => resolve(port));
      } else {
        server.close(() => reject(new Error("Could not determine a free port")));
      }
    });
  });
}

async function waitForServer(url: string, timeoutMs = 20000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not up yet, keep polling
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Backend did not become ready at ${url} within ${timeoutMs}ms`);
}

describe("backend connectivity (integration)", () => {
  let backendProcess: ChildProcess;
  let port: number;
  const originalApiUrl = process.env.NEXT_PUBLIC_API_URL;

  beforeAll(async () => {
    port = await getFreePort();

    backendProcess = spawn(
      "node",
      [
        require.resolve("ts-node/dist/bin.js"),
        "-r",
        "tsconfig-paths/register",
        "src/main.ts",
      ],
      {
        cwd: backendDir,
        env: { ...process.env, PORT: String(port) },
        stdio: "pipe",
      },
    );

    await waitForServer(`http://127.0.0.1:${port}/`);
    process.env.NEXT_PUBLIC_API_URL = `http://127.0.0.1:${port}`;
  }, 30000);

  afterAll(async () => {
    process.env.NEXT_PUBLIC_API_URL = originalApiUrl;
    if (backendProcess) {
      backendProcess.kill();
    }
  });

  it("resolves the live backend's root response through getBackendStatus", async () => {
    const result = await getBackendStatus();

    // The backend's current `GET /` handler (backend/src/app.service.ts)
    // returns the literal string "Hello World!" — assert against the
    // real, live response rather than a hardcoded guess, so this test
    // stays true to actual end-to-end backend behavior.
    expect(result).toEqual({ ok: true, text: "Hello World!" });
  });
});
