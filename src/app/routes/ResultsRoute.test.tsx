import { render, screen, within } from "@testing-library/react";
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
];

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

    expect(within(details).getByRole("heading", { name: "Snow Leopard" })).toBeInTheDocument();
    expect(within(details).getByText("Mountain ranges")).toBeInTheDocument();
  });
});
