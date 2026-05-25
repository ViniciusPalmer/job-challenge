import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IAnimal } from "../../../shared/types/animal";
import { NoResultsFound } from "../components/NoResultsFound";
import { ResultCard } from "../components/ResultCard";
import { ResultContent } from "../components/ResultContent";
import { ResultContentMobile } from "../components/ResultContentMobile";
import { useFilteredAnimals } from "../hooks/useFilteredAnimals";
import { usePaginatedAnimals } from "../hooks/usePaginatedAnimals";

interface ResultsViewProps {
  animalsData: ReadonlyArray<Readonly<IAnimal>>;
  searchInput: string;
  onSuggestionSelect?: (value: string) => void;
}

export function ResultsView({ animalsData, searchInput, onSuggestionSelect }: ResultsViewProps) {
  const [selectedCard, setSelectedCard] = useState<Readonly<IAnimal> | null>(null);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > 800);
  const [currentPage, setCurrentPage] = useState(0);
  const { filteredAnimals, foundResults, suggestionList } = useFilteredAnimals(animalsData, searchInput);
  const { currentItems, pageCount, handlePageChange } = usePaginatedAnimals(filteredAnimals, 4);
  const resultCountLabel = `About ${filteredAnimals.length} result${filteredAnimals.length === 1 ? "" : "s"}`;
  const desktopDetailPanelId = "animal-details-panel";

  useEffect(() => {
    function updateViewport() {
      setIsDesktop(window.innerWidth > 800);
    }

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (currentItems.length === 0) {
      setSelectedCard(null);
      return;
    }

    if (!isDesktop) {
      if (selectedCard && currentItems.some((animal) => animal.id === selectedCard.id)) {
        return;
      }

      setSelectedCard(null);
      return;
    }

    if (selectedCard && currentItems.some((animal) => animal.id === selectedCard.id)) {
      return;
    }

    setSelectedCard(currentItems[0]);
  }, [currentItems, isDesktop, selectedCard]);

  useEffect(() => {
    setCurrentPage(0);
  }, [filteredAnimals]);

  function onPageChange(selected: number) {
    setCurrentPage(selected);
    handlePageChange(selected);
  }

  if (!foundResults) {
    return (
      <NoResultsFound
        searchText={searchInput}
        suggestionList={suggestionList}
        onSuggestionSelect={onSuggestionSelect}
      />
    );
  }

  return (
    <div className="flex h-full flex-col p-5 sm:p-6 lg:p-8">
      <div className="flex flex-1 flex-col gap-6 overflow-hidden lg:flex-row lg:gap-8">
        {isDesktop ? (
          <>
            <section className="flex w-full max-w-3xl flex-col items-start">
              <p role="status" aria-live="polite" className="mb-5 text-sm font-medium text-slate-300">
                {resultCountLabel}
              </p>
              {currentItems.map((animal) => (
                <ResultCard
                  key={animal.id}
                  animal={animal}
                  isActive={selectedCard?.id === animal.id}
                  onSelect={() => setSelectedCard(animal)}
                  ariaControls={desktopDetailPanelId}
                  ariaPressed={selectedCard?.id === animal.id}
                />
              ))}
              {pageCount > 1 ? (
                <ReactPaginate
                  breakLabel="..."
                  forcePage={currentPage}
                  nextLabel=">"
                  onPageChange={(event) => onPageChange(event.selected)}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-200"
                  pageClassName="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 transition hover:border-lime-300/60 hover:text-lime-200"
                  activeClassName="border-lime-300 bg-lime-300/10 font-semibold text-lime-200"
                  previousClassName="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 px-3 transition hover:border-lime-300/60 hover:text-lime-200"
                  nextClassName="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 px-3 transition hover:border-lime-300/60 hover:text-lime-200"
                  disabledClassName="opacity-40"
                />
              ) : null}
            </section>
            <section className="w-full max-w-[32rem]">
              {selectedCard && <ResultContent animal={selectedCard} id={desktopDetailPanelId} />}
            </section>
          </>
        ) : (
          <section className="flex w-full flex-col items-start">
            <p role="status" aria-live="polite" className="mb-5 text-sm font-medium text-slate-300">
              {resultCountLabel}
            </p>
            {currentItems.map((animal) => (
              <ResultContentMobile
                key={animal.id}
                animal={animal}
                isActive={selectedCard?.id === animal.id}
                onToggle={() => {
                  setSelectedCard((currentSelectedCard) => {
                    if (currentSelectedCard?.id === animal.id) {
                      return null;
                    }

                    return animal;
                  });
                }}
              />
            ))}
            {pageCount > 1 ? (
              <ReactPaginate
                breakLabel="..."
                forcePage={currentPage}
                nextLabel=">"
                onPageChange={(event) => onPageChange(event.selected)}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-200"
                pageClassName="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 transition hover:border-lime-300/60 hover:text-lime-200"
                activeClassName="border-lime-300 bg-lime-300/10 font-semibold text-lime-200"
                previousClassName="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 px-3 transition hover:border-lime-300/60 hover:text-lime-200"
                nextClassName="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 px-3 transition hover:border-lime-300/60 hover:text-lime-200"
                disabledClassName="opacity-40"
              />
            ) : null}
          </section>
        )}
      </div>
    </div>
  );
}
