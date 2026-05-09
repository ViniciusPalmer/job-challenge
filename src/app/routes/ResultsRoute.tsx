import { useContext } from "react";
import { AnimalsDataContext } from "../../features/animal-data/state/animalData";
import { ResultsView } from "../../features/animal-results/views/ResultsView";
import { SearchInputContext } from "../../features/animal-search/state/searchInput";
import { Footer } from "../../shared/components/Footer";
import { SeoMetadata } from "../../shared/components/SeoMetadata";
import { ResultsHeader } from "./components/ResultsHeader";

export function ResultsRoute() {
  const { animalsData } = useContext(AnimalsDataContext);
  const { searchInput } = useContext(SearchInputContext);

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-start">
      <SeoMetadata
        title={`Animal Search${searchInput ? ` - ${searchInput}` : ""}`}
        description={`Search results for ${searchInput}`}
      />
      <ResultsHeader />
      <div className="w-full h-[80vh] flex flex-col items-center justify-start">
        <ResultsView animalsData={animalsData} searchInput={searchInput} />
      </div>
      <Footer />
    </main>
  );
}
