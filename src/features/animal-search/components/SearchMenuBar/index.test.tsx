import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SearchHero } from "../../../../app/routes/components/SearchHero";
import { SearchInputProvider } from "../../state/searchInput";
import { SearchMenuBar } from "./index";

describe("SearchMenuBar", () => {
  it("renders hero helper text by default", () => {
    render(
      <MemoryRouter>
        <SearchInputProvider>
          <SearchMenuBar />
        </SearchInputProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Try: lion, fox, dolphin")).toBeInTheDocument();
    expect(screen.getByText("Press Enter")).toBeInTheDocument();
  });

  it("hides hero helper text in the results variant", () => {
    render(
      <MemoryRouter>
        <SearchInputProvider>
          <SearchMenuBar variant="results" />
        </SearchInputProvider>
      </MemoryRouter>
    );

    expect(screen.queryByText("Try: lion, fox, dolphin")).not.toBeInTheDocument();
    expect(screen.queryByText("Press Enter")).not.toBeInTheDocument();
  });

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

  it("calls the provided submit handler when the form is submitted", () => {
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter>
        <SearchInputProvider>
          <SearchMenuBar variant="results" onSubmit={handleSubmit} />
        </SearchInputProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit search" }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("navigates to results on submit from the home route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchInputProvider>
          <Routes>
            <Route path="/" element={<SearchHero />} />
            <Route path="/results" element={<div>Results page</div>} />
          </Routes>
        </SearchInputProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit search" }));

    expect(screen.getByText("Results page")).toBeInTheDocument();
  });
});
