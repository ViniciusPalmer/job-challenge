import { useContext } from "react";
import { AnimalsDataContext } from "../../features/animal-data/state/animalData";
import { ResultsView } from "../../features/animal-results/views/ResultsView";
import { SearchInputContext } from "../../features/animal-search/state/searchInput";
import { SeoMetadata } from "../../shared/components/SeoMetadata";
import { ResultsHeader } from "./components/ResultsHeader";
import { ResultsShell } from "./components/ResultsShell";

export function ResultsRoute() {
  const { animalsData } = useContext(AnimalsDataContext);
  const { searchInput } = useContext(SearchInputContext);

  return (
    <>
      <SeoMetadata
        title={`Animal Search${searchInput ? ` - ${searchInput}` : ""}`}
        description={`Search results for ${searchInput}`}
      />
      <ResultsShell>
        <ResultsHeader />
        <section className="mt-6 flex flex-1 overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/60 shadow-[0_24px_80px_rgba(2,6,23,0.5)] backdrop-blur">
          <ResultsView animalsData={animalsData} searchInput={searchInput} />
        </section>
      </ResultsShell>
    </>
  );
}
