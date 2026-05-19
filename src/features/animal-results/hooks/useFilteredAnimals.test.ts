import { renderHook } from "@testing-library/react";
import { useFilteredAnimals } from "./useFilteredAnimals";
import { IAnimal } from "../../../shared/types/animal";

const animals: IAnimal[] = [
  { id: 1, title: "Lion", type: "Mammal", image: "lion.png", description: "Lion description", url: "https://lion.test", habitat: "Savanna", lifespan: "10-14 years", diet: "Carnivore", summaryTag: "Big cat" },
  { id: 2, title: "Cobra", type: "Reptile", image: "cobra.png", description: "Cobra description", url: "https://cobra.test", habitat: "Forest", lifespan: "20 years", diet: "Carnivore", summaryTag: "Venomous" },
  { id: 3, title: "Leopard", type: "Mammal", image: "leopard.png", description: "Leopard description", url: "https://leopard.test", habitat: "Grassland", lifespan: "12-17 years", diet: "Carnivore", summaryTag: "Spotted hunter" },
];

describe("useFilteredAnimals", () => {
  it("filters by title or type and returns unique suggestions", () => {
    const { result } = renderHook(() => useFilteredAnimals(animals, "mam"));

    expect(result.current.filteredAnimals).toHaveLength(2);
    expect(result.current.foundResults).toBe(true);
    expect(result.current.suggestionList).toEqual(["Mammal", "Reptile"]);
  });
});
