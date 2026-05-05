import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

import { SearchInputProvider } from "./contexts/searchInput";
import { AnimalsDataProvider } from "./contexts/animalData";

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
