import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { ResultsView } from "./ResultsView";

function setViewportWidth(width: number) {
  act(() => {
    window.innerWidth = width;
    window.dispatchEvent(new Event("resize"));
  });
}

function createAnimal(id: number, title: string) {
  return {
    id,
    title,
    type: "species",
    image: `${id}.png`,
    description: `${title} description`,
    url: `https://animal-${id}.test`,
    habitat: `${title} habitat`,
    lifespan: `${id + 5} years`,
    diet: `${title} diet`,
    summaryTag: `${title} summary`,
  };
}

const animals = [
  createAnimal(1, "Animal 1"),
  createAnimal(2, "Animal 2"),
  createAnimal(3, "Animal 3"),
  createAnimal(4, "Animal 4"),
  createAnimal(5, "Animal 5"),
  createAnimal(6, "Zebra 6"),
  createAnimal(7, "Zebra 7"),
  createAnimal(8, "Zebra 8"),
];

describe("ResultsView", () => {
  afterEach(() => {
    setViewportWidth(1024);
  });

  it("selects the first filtered result by default on desktop", () => {
    render(<ResultsView animalsData={animals} searchInput="animal" />);

    expect(screen.getByRole("status")).toHaveTextContent("About 5 results");

    const detail = screen.getByLabelText("Animal 1 details");
    const activeButton = screen.getByRole("button", { name: "Animal 1" });

    expect(within(detail).getByText("Selected result")).toBeInTheDocument();
    expect(within(detail).getByRole("heading", { name: "Animal 1" })).toBeInTheDocument();
    expect(within(detail).getByText("Animal 1 habitat")).toBeInTheDocument();
    expect(activeButton).toHaveAttribute("aria-pressed", "true");
    expect(activeButton).toHaveAttribute("aria-controls", detail.id);
    expect(screen.getByRole("button", { name: "Animal 2" })).toHaveAttribute("aria-pressed", "false");
  });

  it("resets the active pagination page when filtering changes the dataset", () => {
    const { rerender } = render(<ResultsView animalsData={animals} searchInput="species" />);

    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));

    expect(screen.getByRole("button", { name: "Animal 5" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2 is your current page" })).toBeInTheDocument();

    rerender(<ResultsView animalsData={animals} searchInput="animal" />);

    expect(screen.getByRole("button", { name: "Animal 1" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Animal 5" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 1 is your current page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2" })).toBeInTheDocument();
  });

  it("selects the first item on the new page when pagination changes", () => {
    render(<ResultsView animalsData={animals} searchInput="species" />);

    fireEvent.click(screen.getByRole("button", { name: "Animal 2" }));
    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));

    const detail = screen.getByLabelText("Animal 5 details");
    const activeButton = screen.getByRole("button", { name: "Animal 5" });

    expect(within(detail).getByRole("heading", { name: "Animal 5" })).toBeInTheDocument();
    expect(within(detail).getByText("Animal 5 habitat")).toBeInTheDocument();
    expect(activeButton).toHaveAttribute("aria-pressed", "true");
    expect(activeButton).toHaveAttribute("aria-controls", detail.id);
    expect(screen.queryByRole("button", { name: "Animal 2" })).not.toBeInTheDocument();
  });

  it("shows rich detail metadata for the selected animal", () => {
    render(<ResultsView animalsData={animals} searchInput="animal" />);

    fireEvent.click(screen.getByRole("button", { name: "Animal 2" }));

    const detail = screen.getByLabelText("Animal 2 details");
    const activeButton = screen.getByRole("button", { name: "Animal 2" });

    expect(within(detail).getByRole("heading", { name: "Animal 2" })).toBeInTheDocument();
    expect(within(detail).getByText("Animal 2 habitat")).toBeInTheDocument();
    expect(within(detail).getByText("7 years")).toBeInTheDocument();
    expect(within(detail).getByText("Animal 2 diet")).toBeInTheDocument();
    expect(within(detail).getByText("Animal 2 summary")).toBeInTheDocument();
    expect(within(detail).getByText("Type")).toBeInTheDocument();
    expect(within(detail).getByText("Selected result")).toBeInTheDocument();
    expect(within(detail).getByRole("img", { name: "Animal 2" })).toHaveAttribute("loading", "lazy");
    expect(within(detail).getByRole("img", { name: "Animal 2" })).toHaveAttribute("decoding", "async");
    expect(activeButton).toHaveAttribute("aria-pressed", "true");
    expect(activeButton).toHaveAttribute("aria-controls", detail.id);
  });

  it("emits suggestion recovery actions when there are no matches", () => {
    const handleSuggestionSelect = jest.fn();

    render(
      <ResultsView
        animalsData={animals}
        searchInput="penguin"
        onSuggestionSelect={handleSuggestionSelect}
      />
    );

    expect(screen.getByText("No matches found for penguin.")).toBeInTheDocument();
    expect(screen.getByText("Try one of these animal types:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "species" })).toBeInTheDocument();
    expect(screen.queryByText(/API is not working/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "species" }));

    expect(handleSuggestionSelect).toHaveBeenCalledWith("species");
  });

  it("expands and collapses inline mobile details from the same trigger", () => {
    setViewportWidth(480);

    render(<ResultsView animalsData={animals} searchInput="animal" />);

    const animalButton = screen.getByRole("button", { name: "Animal 1" });

    expect(animalButton).toHaveAttribute("aria-expanded", "false");
    expect(animalButton).not.toHaveAttribute("aria-controls");
    expect(screen.queryByLabelText("Animal 1 details")).not.toBeInTheDocument();

    fireEvent.click(animalButton);

    expect(animalButton).toHaveAttribute("aria-expanded", "true");
    expect(animalButton).toHaveAttribute("aria-controls", "animal-details-1");
    expect(screen.getByLabelText("Animal 1 details")).toBeInTheDocument();

    fireEvent.click(animalButton);

    expect(animalButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByLabelText("Animal 1 details")).not.toBeInTheDocument();
  });
});
