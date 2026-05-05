import { useState, useContext, useEffect, useRef, useCallback, useMemo } from "react";
import {
  ResultContainer,
  ResultData,
  SearchResult,
  ResultMainContent,
  StyledReactPaginate,
} from "./styles";

import { Footer } from "../../components/Footer";
import { ResultHeader } from "./components/ResultsHeader";
import { ResultCard } from "./components/ResultCard";
import { ResultContent } from "./components/ResultContent";
import { ResultContentMobile } from "./components/ResultContentMobile";

import { NoResultsFound } from "./components/NoResultsFound";
import { AnimalsDataContext } from "../../contexts/animalData";
import { SearchInputContext } from "../../contexts/searchInput";
import { IAnimal } from "../../types/animal";
import { SeoMetadata } from "../../components/SeoMetadata";

export function Results() {
  const [itemOffset, setItemOffset] = useState(0);
  const [foundResults, setFoundResults] = useState(false);
  const [selectedCard, setSelectedCard] = useState<IAnimal | null>(null);
  const [filteredAnimalsList, setFilteredAnimalsList] = useState<IAnimal[]>([]);
  const { animalsData } = useContext(AnimalsDataContext);
  const { searchInput } = useContext(SearchInputContext);

  const windowWidth = useRef(window.innerWidth);
  const currentScreenSize = Number(windowWidth.current);
  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = useMemo(
    () => filteredAnimalsList.slice(itemOffset, endOffset),
    [filteredAnimalsList, itemOffset, endOffset]
  );
  const pageCount = useMemo(
    () => Math.ceil(filteredAnimalsList.length / itemsPerPage),
    [filteredAnimalsList.length]
  );

  const filterBySearchTerm = useCallback((searchTerm: string, data: IAnimal[]) => {
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerSearch) ||
        item.type.toLowerCase().includes(lowerSearch)
    );
  }, []);

  useEffect(() => {
    const result = filterBySearchTerm(searchInput, animalsData);
    setFilteredAnimalsList(result);
  }, [animalsData, searchInput, filterBySearchTerm]);

  useEffect(() => {
    if (filteredAnimalsList.length > 0 && searchInput) {
      setFoundResults(true);
    } else {
      setFoundResults(false);
      setSelectedCard(null);
    }
  }, [filteredAnimalsList]);

  const handleCardSelected = (newState: IAnimal) => {
    setSelectedCard(newState);
  };

  const renderSearchResultPage = () => {
    return (
      <>
        <SearchResult>
          {currentItems.map((animal) => (
            <ResultCard
              key={animal.id}
              animal={animal}
              setAnimal={handleCardSelected}
            />
          ))}
        </SearchResult>
        {selectedCard && <ResultContent animal={selectedCard} />}
      </>
    );
  };

  const renderSearchResultPageMobile = () => {
    return (
      <SearchResult>
        {currentItems.map((animal) => (
          <ResultContentMobile
            key={animal.id}
            animal={animal}
            setAnimal={handleCardSelected}
          />
        ))}
      </SearchResult>
    );
  };

  const suggestionList = useMemo(() => {
    const types = animalsData.map((item) => item.type);
    return [...new Set(types)].slice(0, 5);
  }, [animalsData]);

  const renderNoResultPage = () => {
    return <NoResultsFound searchText={searchInput} suggestionList={suggestionList} />;
  };

  const handleScreen = () => {
    if (!foundResults) return renderNoResultPage();

    if (currentScreenSize > 800) return renderSearchResultPage();
    else return renderSearchResultPageMobile();
  };

  const handlePageClick = (event: { selected: number }) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredAnimalsList.length;
    setItemOffset(newOffset);
    setSelectedCard(null);
  };

  return (
    <ResultContainer>
      <SeoMetadata 
        title={`Animal Search${searchInput ? ` - ${searchInput}` : ""}`} 
        description={`Search results for ${searchInput}`}
      />
      <ResultHeader />
      <ResultMainContent>
        <ResultData>{handleScreen()}</ResultData>
        <StyledReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </ResultMainContent>
      <Footer />
    </ResultContainer>
  );
}
