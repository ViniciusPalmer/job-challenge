import { useContext } from "react";
import { AnimalsDataContext } from "../../features/animal-data/state/animalData";
import { ResultsView } from "../../features/animal-results/views/ResultsView";
import { SearchInputContext } from "../../features/animal-search/state/searchInput";
import { SeoMetadata } from "../../shared/components/SeoMetadata";
import { ResultsHeader } from "./components/ResultsHeader";
import { ResultsShell } from "./components/ResultsShell";

export function ResultsRoute() {
  const { animalsData } = useContext(AnimalsDataContext);
  const { searchInput, setSearchInput } = useContext(SearchInputContext);

  return (
    <>
      <SeoMetadata
        title={`Animal Search${searchInput ? ` - ${searchInput}` : ""}`}
        description={`Search results for ${searchInput}`}
      />
      <ResultsShell>
        <ResultsHeader />
        <section className="mt-6 flex flex-1 overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.98)_0%,rgba(2,6,23,0.96)_100%)] shadow-[0_18px_56px_rgba(2,6,23,0.36)]">
          <ResultsView
            animalsData={animalsData}
            searchInput={searchInput}
            onSuggestionSelect={setSearchInput}
          />
        </section>
      </ResultsShell>
    </>
  );
}
