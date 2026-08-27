import { Save, Share2 } from "lucide-react";

/**
 * Fixed top bar shown on every page: static board title on the left, and
 * non-functional Save/Share placeholder actions on the right.
 */
export function TopBar() {
  return (
    <header
      data-testid="top-bar"
      className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 shadow-md"
    >
      <span className="text-sm font-medium text-slate-100 select-none">
        Untitled Board
      </span>
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
