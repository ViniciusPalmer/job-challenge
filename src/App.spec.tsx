import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { App } from "./app/App";

describe("App", () => {
  it("renders the home route", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(screen.getByRole("status", { name: /loading page content/i })).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByRole("status", { name: /loading page content/i }));

    expect(screen.getByRole("heading", { name: "Find animals instantly" })).toBeInTheDocument();
    expect(screen.getByText("Minimal input. Instant discovery. Built for curious minds.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit search" })).toBeInTheDocument();
  });

  it("renders the results route", async () => {
    window.history.pushState({}, "", "/results");

    render(<App />);

    expect(screen.getByRole("status", { name: /loading page content/i })).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByRole("status", { name: /loading page content/i }));

    expect(screen.getByRole("button", { name: /go to home/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByText(/Try one of these animal types:/i)).toBeInTheDocument();
  });

  it("submits search from home and navigates to results", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(await screen.findByRole("heading", { name: "Find animals instantly" })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Search"), { target: { value: "lion" } });
    fireEvent.click(screen.getByRole("button", { name: /submit search/i }));

    expect(await screen.findByLabelText("African Lion details")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue("lion");
  });

  it("updates the shown results when the search changes on the results route", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(await screen.findByRole("heading", { name: "Find animals instantly" })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Search"), { target: { value: "lion" } });
    fireEvent.click(screen.getByRole("button", { name: /submit search/i }));

    expect(await screen.findByLabelText("African Lion details")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox", { name: "Search" }), { target: { value: "dog" } });

    expect(screen.queryByLabelText("African Lion details")).not.toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Golden Retriever" })).toBeInTheDocument();
    expect(screen.getByLabelText("Golden Retriever details")).toBeInTheDocument();
  });
});
