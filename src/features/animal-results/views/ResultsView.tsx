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
}

export function ResultsView({ animalsData, searchInput }: ResultsViewProps) {
  const [selectedCard, setSelectedCard] = useState<Readonly<IAnimal> | null>(null);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > 800);
  const [currentPage, setCurrentPage] = useState(0);
  const { filteredAnimals, foundResults, suggestionList } = useFilteredAnimals(animalsData, searchInput);
  const { currentItems, pageCount, handlePageChange } = usePaginatedAnimals(filteredAnimals, 4);

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
    return <NoResultsFound searchText={searchInput} suggestionList={suggestionList} />;
  }

  return (
    <>
      <div className="flex flex-row items-start w-screen h-full p-6 cursor-pointer overflow-auto overflow-x-hidden">
        {isDesktop ? (
          <>
            <section className="mr-12 flex w-full max-w-3xl flex-col items-start">
              {currentItems.map((animal) => (
                <ResultCard
                  key={animal.id}
                  animal={animal}
                  isActive={selectedCard?.id === animal.id}
                  onSelect={() => setSelectedCard(animal)}
                />
              ))}
            </section>
            <section className="w-full max-w-[32rem]">
              {selectedCard && <ResultContent animal={selectedCard} />}
            </section>
          </>
        ) : (
          <section className="flex w-full flex-col items-start">
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
          </section>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        forcePage={currentPage}
        nextLabel=">"
        onPageChange={(event) => onPageChange(event.selected)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="flex flex-nowrap text-lg cursor-pointer mt-4"
        pageClassName="w-[30px] h-[30px] flex items-center justify-center border border-gray-100 m-0 mx-2 hover:bg-gray-100 transition-all duration-1000"
        activeClassName="bg-gray-100 border border-gray-100 font-bold"
      />
    </>
  );
}
