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
    if (selectedCard && !filteredAnimals.some((animal) => animal.id === selectedCard.id)) {
      setSelectedCard(null);
    }
  }, [filteredAnimals, selectedCard]);

  useEffect(() => {
    setCurrentPage(0);
  }, [filteredAnimals]);

  function onPageChange(selected: number) {
    setCurrentPage(selected);
    handlePageChange(selected);
    setSelectedCard(null);
  }

  if (!foundResults) {
    return <NoResultsFound searchText={searchInput} suggestionList={suggestionList} />;
  }

  return (
    <>
      <div className="flex flex-row items-start w-screen h-full p-6 cursor-pointer overflow-auto overflow-x-hidden">
        {isDesktop ? (
          <>
            <section className="w-[55vw] flex flex-col items-start lg:mr-12 sm:w-[99vw]">
              {currentItems.map((animal) => (
                <ResultCard key={animal.id} animal={animal} setAnimal={setSelectedCard} />
              ))}
            </section>
            {selectedCard && <ResultContent animal={selectedCard} />}
          </>
        ) : (
          <section className="w-[55vw] flex flex-col items-start lg:mr-12 sm:w-[99vw]">
            {currentItems.map((animal) => (
              <ResultContentMobile key={animal.id} animal={animal} setAnimal={setSelectedCard} />
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
