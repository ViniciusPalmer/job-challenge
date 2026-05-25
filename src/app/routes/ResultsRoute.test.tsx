import { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ResultsRoute } from "./ResultsRoute";
import { AnimalsDataContext } from "../../features/animal-data/state/animalData";
import { SearchInputContext } from "../../features/animal-search/state/searchInput";

const animalsData = [
  {
    id: 1,
    title: "Snow Leopard",
    type: "species",
    image: "snow-leopard.png",
    description: "A mountain predator.",
    url: "https://example.com/snow-leopard",
    habitat: "Mountain ranges",
    lifespan: "15 years",
    diet: "Carnivore",
    summaryTag: "Elusive alpine hunter",
  },
  {
    id: 2,
    title: "Red Fox",
    type: "species",
    image: "red-fox.png",
    description: "A swift woodland omnivore.",
    url: "https://example.com/red-fox",
    habitat: "Forests",
    lifespan: "6 years",
    diet: "Omnivore",
    summaryTag: "Adaptable forest runner",
  },
];

function ResultsRouteWithSearchState({ initialSearchInput }: { initialSearchInput: string }) {
  const [searchInput, setSearchInput] = useState(initialSearchInput);

  return (
    <MemoryRouter initialEntries={["/results"]}>
      <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
        <AnimalsDataContext.Provider value={{ animalsData }}>
          <ResultsRoute />
        </AnimalsDataContext.Provider>
      </SearchInputContext.Provider>
    </MemoryRouter>
  );
}

describe("ResultsRoute", () => {
  it("renders the redesigned results shell with search and result content", () => {
    render(
      <MemoryRouter initialEntries={["/results"]}>
        <SearchInputContext.Provider
          value={{ searchInput: "snow", setSearchInput: jest.fn() }}
        >
          <AnimalsDataContext.Provider value={{ animalsData }}>
            <ResultsRoute />
          </AnimalsDataContext.Provider>
        </SearchInputContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole("textbox", { name: "Search" })).toBeInTheDocument();
    expect(screen.queryByText(/version 0\.1\.0/i)).not.toBeInTheDocument();

    const details = screen.getByLabelText("Snow Leopard details");
    const activeButton = screen.getByRole("button", { name: "Snow Leopard" });

    expect(screen.getByRole("status")).toHaveTextContent("About 1 result");
    expect(within(details).getByRole("heading", { name: "Snow Leopard" })).toBeInTheDocument();
    expect(within(details).getByText("Mountain ranges")).toBeInTheDocument();
    expect(activeButton).toHaveAttribute("aria-pressed", "true");
    expect(activeButton).toHaveAttribute("aria-controls", details.id);
  });

  it("recovers from no results by composing suggestion selection through search state", () => {
    render(<ResultsRouteWithSearchState initialSearchInput="penguin" />);

    expect(screen.getByText("No matches found for penguin.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "species" }));

    expect(screen.getByDisplayValue("species")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("About 2 results");
    expect(screen.queryByText("No matches found for penguin.")).not.toBeInTheDocument();
  });
});
