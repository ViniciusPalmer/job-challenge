import { ReactNode } from "react";

interface ResultsShellProps {
  children: ReactNode;
}

export function ResultsShell({ children }: ResultsShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(163,230,53,0.14),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}
