import { useContext } from "react";
import { render, screen } from "@testing-library/react";
import data from "../data/staticAnimals";
import { AnimalsDataContext, AnimalsDataProvider } from "./animalData";

function Probe() {
  const { animalsData } = useContext(AnimalsDataContext);
  const firstAnimal = animalsData[0];

  return (
    <>
      <span data-testid="animals-count">{animalsData.length}</span>
      <span data-testid="first-animal-title">{firstAnimal?.title ?? ""}</span>
      <span data-testid="second-animal-title">{animalsData[1]?.title ?? ""}</span>
      <span data-testid="first-animal-reference-match">
        {String(firstAnimal === data[0])}
      </span>
    </>
  );
}

describe("AnimalsDataProvider", () => {
  it("hydrates the context with copied static animals in the original order on first render", () => {
    render(
      <AnimalsDataProvider>
        <Probe />
      </AnimalsDataProvider>
    );

    expect(screen.getByTestId("animals-count")).toHaveTextContent(
      String(data.length)
    );
    expect(screen.getByTestId("first-animal-title")).toHaveTextContent(
      data[0].title
    );
    expect(screen.getByTestId("second-animal-title")).toHaveTextContent(
      data[1].title
    );
    expect(screen.getByTestId("first-animal-reference-match")).toHaveTextContent(
      "false"
    );
  });
});
