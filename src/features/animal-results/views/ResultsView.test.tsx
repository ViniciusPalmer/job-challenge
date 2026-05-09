import { fireEvent, render, screen } from "@testing-library/react";
import { ResultsView } from "./ResultsView";
import { IAnimal } from "../../../shared/types/animal";

const animals: ReadonlyArray<Readonly<IAnimal>> = [
  { id: 1, title: "Animal 1", type: "species", image: "1.png", description: "Animal 1 description", url: "https://animal-1.test" },
  { id: 2, title: "Animal 2", type: "species", image: "2.png", description: "Animal 2 description", url: "https://animal-2.test" },
  { id: 3, title: "Animal 3", type: "species", image: "3.png", description: "Animal 3 description", url: "https://animal-3.test" },
  { id: 4, title: "Animal 4", type: "species", image: "4.png", description: "Animal 4 description", url: "https://animal-4.test" },
  { id: 5, title: "Animal 5", type: "species", image: "5.png", description: "Animal 5 description", url: "https://animal-5.test" },
  { id: 6, title: "Zebra 6", type: "species", image: "6.png", description: "Zebra 6 description", url: "https://animal-6.test" },
  { id: 7, title: "Zebra 7", type: "species", image: "7.png", description: "Zebra 7 description", url: "https://animal-7.test" },
  { id: 8, title: "Zebra 8", type: "species", image: "8.png", description: "Zebra 8 description", url: "https://animal-8.test" },
];

describe("ResultsView", () => {
  it("resets the active pagination page when filtering changes the dataset", () => {
    const { rerender } = render(<ResultsView animalsData={animals} searchInput="species" />);

    fireEvent.click(screen.getByText("2"));

    expect(screen.getByRole("button", { name: "Animal 5" })).toBeInTheDocument();
    expect(screen.getByText("2").closest("li")).toHaveClass("bg-gray-100");

    rerender(<ResultsView animalsData={animals} searchInput="animal" />);

    expect(screen.getByRole("button", { name: "Animal 1" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Animal 5" })).not.toBeInTheDocument();
    expect(screen.getByText("1").closest("li")).toHaveClass("bg-gray-100");
    expect(screen.getByText("2").closest("li")).not.toHaveClass("bg-gray-100");
  });
});
