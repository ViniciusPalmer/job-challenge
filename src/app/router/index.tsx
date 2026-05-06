import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomeRoute = lazy(() =>
  import("../routes/HomeRoute").then((module) => ({
    default: module.HomeRoute,
  }))
);

const ResultsRoute = lazy(() =>
  import("../routes/ResultsRoute").then((module) => ({
    default: module.ResultsRoute,
  }))
);

export function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/results" element={<ResultsRoute />} />
      </Routes>
    </Suspense>
  );
}
