import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "@jest/globals";
import { App } from "./app/App";

describe("App routes", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("renders the home route at the root path", async () => {
    render(<App />);

    expect(await screen.findByRole("heading", { name: "Animal Search Home" })).toBeInTheDocument();
    expect(screen.queryByAltText("Go to home")).not.toBeInTheDocument();
  });

  it("renders the results route at /results", async () => {
    window.history.replaceState({}, "", "/results");

    render(<App />);

    expect(await screen.findByAltText("Go to home")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Animal Search Home" })).not.toBeInTheDocument();
  });
});
