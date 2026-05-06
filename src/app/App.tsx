import { BrowserRouter } from "react-router-dom";
import { AnimalsDataProvider } from "../contexts/animalData";
import { SearchInputProvider } from "../contexts/searchInput";
import { AppRouter } from "./router";

export function App() {
  return (
    <BrowserRouter>
      <SearchInputProvider>
        <AnimalsDataProvider>
          <AppRouter />
        </AnimalsDataProvider>
      </SearchInputProvider>
    </BrowserRouter>
  );
}
