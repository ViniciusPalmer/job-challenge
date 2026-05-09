import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchInputProvider } from "../../state/searchInput";
import { SearchMenuBar } from "./index";

describe("SearchMenuBar", () => {
  it("updates and clears the search value", () => {
    render(
      <MemoryRouter>
        <SearchInputProvider>
          <SearchMenuBar />
        </SearchInputProvider>
      </MemoryRouter>
    );

    const input = screen.getByLabelText("Search");

    fireEvent.change(input, { target: { value: "lion" } });
    expect(input).toHaveValue("lion");

    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(input).toHaveValue("");
  });
});
