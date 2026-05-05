import {
  ResultCardContainer,
  URLText,
  LinkText,
  DescriptionText,
} from "./styles";

import { IAnimal } from "../../../../types/animal";

interface IResultCard {
  animal: IAnimal;
  setAnimal: (newState: IAnimal) => void;
}

export function ResultCard({ animal, setAnimal }: IResultCard) {
  function selectAnimal() {
    setAnimal(animal);
  }

  return (
    <ResultCardContainer>
      <URLText>{animal.url}</URLText>
      <LinkText onClick={selectAnimal}>{animal.title}</LinkText>
      <DescriptionText>{animal.description}</DescriptionText>
    </ResultCardContainer>
  );
}
