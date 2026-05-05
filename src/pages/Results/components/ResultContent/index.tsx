import { IAnimal } from "../../../../types/animal";

interface ResultContentProps {
  animal: IAnimal;
}

export function ResultContent({ animal }: ResultContentProps) {
  return (
    <article className="flex flex-col items-start justify-center max-w-[30vw] p-8 border border-gray-150 md:max-w-full md:w-[80vw] md:p-4">
      <img className="w-full mb-4" src={animal.image} alt={animal.title} />
      <span className="text-xs text-gray-300 mb-2 max-w-[90%]">{animal.url}</span>
      <a className="text-2xl text-blue-300 mb-4 hover:brightness-60 transition-all" href={animal.url} target="_blank" rel="noopener noreferrer">
        {animal.title}
      </a>
      <span className="text-xs text-gray-300 mb-2 max-w-[90%]">{animal.description}</span>
    </article>
  );
}