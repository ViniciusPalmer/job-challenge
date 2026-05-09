import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { App } from "./app/App";

describe("App", () => {
  it("renders the home route", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    expect(screen.getByRole("heading", { name: /agile content/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Submit search")).toBeInTheDocument();
  });

  it("renders the results route", async () => {
    window.history.pushState({}, "", "/results");

    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    expect(screen.getByRole("button", { name: /go to home/i })).toBeInTheDocument();
    expect(screen.getByText(/Try looking for:/i)).toBeInTheDocument();
  });

  it("submits search from home and navigates back home from results", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(await screen.findByRole("heading", { name: /agile content/i })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Search"), { target: { value: "lion" } });
    fireEvent.click(screen.getByRole("button", { name: /submit search/i }));

    expect(await screen.findByText("African Lion")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /go to home/i }));

    expect(await screen.findByRole("heading", { name: /agile content/i })).toBeInTheDocument();
  });

  it("clears the selected result detail when the results filter changes", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(await screen.findByRole("heading", { name: /agile content/i })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Search"), { target: { value: "lion" } });
    fireEvent.click(screen.getByRole("button", { name: /submit search/i }));

    const selectedResultButton = await screen.findByRole("button", { name: "African Lion" });

    fireEvent.click(selectedResultButton);

    expect(await screen.findByRole("link", { name: "African Lion" })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Search"), { target: { value: "dog" } });

    expect(screen.queryByRole("link", { name: "African Lion" })).not.toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Golden Retriever" })).toBeInTheDocument();
  });
});
