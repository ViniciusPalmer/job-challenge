import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";

import { AnimalsDataProvider } from "../features/animal-data/state/animalData";
import { SearchInputProvider } from "../features/animal-search/state/searchInput";

export function App() {
  return (
    <BrowserRouter>
      <SearchInputProvider>
        <AnimalsDataProvider>
          <Router />
        </AnimalsDataProvider>
      </SearchInputProvider>
    </BrowserRouter>
  );
}
