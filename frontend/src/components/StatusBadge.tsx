/**
 * Small, presentational badge showing backend connectivity status. Kept
 * synchronous and free of any fetch/async logic so it renders standalone
 * under Vitest/RTL — the async data fetching lives in
 * `@/lib/backend-status` and is resolved by the caller (`TopBar`) before
 * this component is rendered.
 *
 * Styled as a subtle inline pill so it doesn't compete visually with the
 * project name or the Save/Share buttons: muted slate tones on success,
 * a warning/error tint on failure.
 */
export function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      data-testid="backend-status-badge"
      className={
        "ml-3 rounded-full px-2 py-0.5 text-xs font-medium select-none " +
        (ok
          ? "bg-slate-800 text-slate-400"
          : "border border-red-900 bg-red-950 text-red-400")
      }
    >
      {label}
    </span>
  );
}
