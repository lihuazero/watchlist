/**
 * Fixed-width left sidebar rail.
 *
 * Hosts tldraw's own vertical toolbar. The whiteboard canvas (rendered in
 * the main content region) portals its `DefaultToolbar` (with
 * `orientation="vertical"`) into the `sidebar-toolbar-slot` container below
 * at runtime — see `frontend/src/components/Whiteboard.tsx`. This component
 * itself renders no tldraw code and stays a plain Server Component.
 */
export function Sidebar() {
  return (
    <aside
      data-testid="sidebar"
      aria-label="Toolbar sidebar"
      className="flex w-16 shrink-0 flex-col items-center border-r border-slate-800 bg-slate-900"
    >
      <div
        data-testid="sidebar-toolbar-slot"
        className="flex w-full flex-1 flex-col items-center overflow-y-auto py-2"
      />
    </aside>
  );
}
