import { Save, Share2 } from "lucide-react";
import { getBackendStatus } from "@/lib/backend-status";
import { StatusBadge } from "./StatusBadge";

/**
 * Fixed top bar shown on every page: static board title on the left
 * (with a backend connectivity status badge next to it), and
 * non-functional Save/Share placeholder actions on the right.
 *
 * The connectivity check is awaited directly here (server-side, as part
 * of rendering this async Server Component) so the badge content is
 * already resolved and embedded in the HTML sent to the browser. It can
 * never throw — `getBackendStatus` catches all failure modes itself — so
 * the rest of the shell always renders regardless of backend
 * availability.
 */
export async function TopBar() {
  const status = await getBackendStatus();
  const label = status.ok ? `API: ${status.text}` : "Backend unavailable";

  return (
    <header
      data-testid="top-bar"
      className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 shadow-md"
    >
      <div className="flex items-center">
        <span className="text-sm font-medium text-slate-100 select-none">
          Untitled Board
        </span>
        <StatusBadge ok={status.ok} label={label} />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Save
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share
        </button>
      </div>
    </header>
  );
}
