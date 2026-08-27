/**
 * Fixed-width left sidebar rail.
 *
 * This is an empty placeholder container for now — a future job will embed
 * the whiteboard library's own toolbar into this container. Do not add tool
 * icons or toolbar contents here yet.
 */
export function Sidebar() {
  return (
    <aside
      data-testid="sidebar"
      aria-label="Toolbar sidebar"
      className="w-16 shrink-0 border-r border-slate-800 bg-slate-900"
    />
  );
}
