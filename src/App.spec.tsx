import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { App } from "./App";

describe("App", () => {
  it("renders the home page", async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(screen.getByAltText("Logo Google")).toBeTruthy();
  });
});
