import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() =>
  import("./pages/Home").then((m) => ({ default: (m as { Home: React.ComponentType<unknown> }).Home }))
);
const Results = lazy(() =>
  import("./pages/Results").then((m) => ({ default: (m as { Results: React.ComponentType<unknown> }).Results }))
);

export function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Suspense>
  );
}
