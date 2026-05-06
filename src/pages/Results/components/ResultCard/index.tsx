import { IAnimal } from "../../../../shared/types/animal";

interface IResultCard {
  animal: IAnimal;
  setAnimal: (newState: IAnimal) => void;
}

export function ResultCard({ animal, setAnimal }: IResultCard) {
  function selectAnimal() {
    setAnimal(animal);
  }

  return (
    <article className="flex flex-col max-h-[200px] items-start mb-7">
      <span className="text-xs text-gray-300 mb-2">{animal.url}</span>
      <button
        onClick={selectAnimal}
        className="text-2xl text-blue-300 mb-3 bg-transparent border-none cursor-pointer hover:brightness-60 transition-all"
      >
        {animal.title}
      </button>
      <p className="text-base text-gray-300 mb-3 hover:brightness-60 transition-all">
        {animal.description}
      </p>
    </article>
  );
}
