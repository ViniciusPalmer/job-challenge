import { Route, Routes } from "react-router-dom";
import { HomeRoute } from "../routes/HomeRoute";
import { ResultsRoute } from "../routes/ResultsRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/results" element={<ResultsRoute />} />
    </Routes>
  );
}
