import { ResultCardContainer, SpanContent, TittleText } from "./styles";
import { IAnimal } from "../../../../types/animal";

interface IResultContent {
  animal: IAnimal;
}

export function ResultContent({ animal }: IResultContent) {
  return (
    <ResultCardContainer>
      <img src={animal.image} alt={animal.title} />
      <SpanContent>{animal.url}</SpanContent>
      <TittleText as="a" href={animal.url} target="_blank" rel="noopener noreferrer">
        {animal.title}
      </TittleText>
      <SpanContent>{animal.description}</SpanContent>
    </ResultCardContainer>
  );
}
