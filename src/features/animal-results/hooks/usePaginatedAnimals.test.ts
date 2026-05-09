import { act, renderHook } from "@testing-library/react";
import { usePaginatedAnimals } from "./usePaginatedAnimals";
import { IAnimal } from "../../../shared/types/animal";

const animals: IAnimal[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: `Animal ${index + 1}`,
  type: "Species",
  image: `image-${index + 1}.png`,
  description: `Description ${index + 1}`,
  url: `https://animal-${index + 1}.test`,
}));

describe("usePaginatedAnimals", () => {
  it("returns the correct page and page count", () => {
    const { result } = renderHook(() => usePaginatedAnimals(animals, 4));

    expect(result.current.currentItems.map((item) => item.id)).toEqual([1, 2, 3, 4]);
    expect(result.current.pageCount).toBe(2);

    act(() => {
      result.current.handlePageChange(1);
    });

    expect(result.current.currentItems.map((item) => item.id)).toEqual([5, 6]);
  });
});
