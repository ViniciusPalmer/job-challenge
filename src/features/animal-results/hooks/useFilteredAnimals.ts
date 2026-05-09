import { useMemo } from "react";
import { IAnimal } from "../../../shared/types/animal";

export function useFilteredAnimals(animalsData: ReadonlyArray<Readonly<IAnimal>>, searchInput: string) {
  const filteredAnimals = useMemo(() => {
    const lowerSearch = searchInput.toLowerCase();

    return animalsData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerSearch) ||
        item.type.toLowerCase().includes(lowerSearch)
    );
  }, [animalsData, searchInput]);

  const suggestionList = useMemo(() => {
    const types = animalsData.map((item) => item.type);
    return [...new Set(types)].slice(0, 5);
  }, [animalsData]);

  const foundResults = filteredAnimals.length > 0 && searchInput.length > 0;

  return {
    filteredAnimals,
    foundResults,
    suggestionList,
  };
}
