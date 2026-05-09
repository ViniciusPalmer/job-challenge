import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomeRoute = lazy(() =>
  import("../routes/HomeRoute").then((m) => ({ default: m.HomeRoute }))
);

const ResultsRoute = lazy(() =>
  import("../routes/ResultsRoute").then((m) => ({ default: m.ResultsRoute }))
);

export function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/results" element={<ResultsRoute />} />
      </Routes>
    </Suspense>
  );
}
