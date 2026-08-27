import type { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";

/**
 * Persistent dark-themed page shell: fixed top bar, fixed left sidebar,
 * and a main content region that renders whatever page content is passed
 * in. Mounted once at the root layout so every route inherits it.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main
          data-testid="main-content"
          className="flex-1 overflow-hidden bg-slate-950"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
