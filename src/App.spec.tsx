import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "@jest/globals";
import { App } from "./app/App";

describe("App routes", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("renders the home route at the root path", async () => {
    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText(/Agile Content/i)).toBeInTheDocument();
    expect(screen.queryByText(/Try looking for:/i)).not.toBeInTheDocument();
  });

  it("renders the results route at /results", async () => {
    window.history.replaceState({}, "", "/results");

    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText(/Try looking for:/i)).toBeInTheDocument();
    expect(screen.queryByText(/Agile Content/i)).not.toBeInTheDocument();
  });
});
