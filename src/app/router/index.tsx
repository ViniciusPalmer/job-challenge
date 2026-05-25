import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomeRoute = lazy(() =>
  import("../routes/HomeRoute").then((m) => ({ default: m.HomeRoute }))
);

const ResultsRoute = lazy(() =>
  import("../routes/ResultsRoute").then((m) => ({ default: m.ResultsRoute }))
);

const loadingFallback = (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
    <div
      role="status"
      aria-label="Loading page content"
      className="rounded-2xl border border-amber-200/20 bg-slate-900 px-5 py-4 text-sm font-medium tracking-wide shadow-lg shadow-slate-950/30"
    >
      Loading page content...
    </div>
  </div>
);

export function Router() {
  return (
    <Suspense fallback={loadingFallback}>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/results" element={<ResultsRoute />} />
      </Routes>
    </Suspense>
  );
}
