import { IAnimal } from "../../../../shared/types/animal";
import { ResultCard } from "../ResultCard";
import { ResultContent } from "../ResultContent";

interface IResultCard {
  animal: Readonly<IAnimal>;
  isActive: boolean;
  onToggle: () => void;
}

export function ResultContentMobile({ animal, isActive, onToggle }: IResultCard) {
  const contentId = `animal-details-${animal.id}`;

  return (
    <div className="mb-4 w-full">
      <ResultCard
        animal={animal}
        isActive={isActive}
        onSelect={onToggle}
        ariaControls={isActive ? contentId : undefined}
        ariaExpanded={isActive}
      />
      {isActive && (
        <div className="mt-4">
          <ResultContent animal={animal} id={contentId} />
        </div>
      )}
    </div>
  );
}
