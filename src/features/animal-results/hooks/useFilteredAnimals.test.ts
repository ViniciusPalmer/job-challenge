import { renderHook } from "@testing-library/react";
import { useFilteredAnimals } from "./useFilteredAnimals";
import { IAnimal } from "../../../shared/types/animal";

const animals: IAnimal[] = [
  { id: 1, title: "Lion", type: "Mammal", image: "lion.png", description: "Lion description", url: "https://lion.test" },
  { id: 2, title: "Cobra", type: "Reptile", image: "cobra.png", description: "Cobra description", url: "https://cobra.test" },
  { id: 3, title: "Leopard", type: "Mammal", image: "leopard.png", description: "Leopard description", url: "https://leopard.test" },
];

describe("useFilteredAnimals", () => {
  it("filters by title or type and returns unique suggestions", () => {
    const { result } = renderHook(() => useFilteredAnimals(animals, "mam"));

    expect(result.current.filteredAnimals).toHaveLength(2);
    expect(result.current.foundResults).toBe(true);
    expect(result.current.suggestionList).toEqual(["Mammal", "Reptile"]);
  });
});
