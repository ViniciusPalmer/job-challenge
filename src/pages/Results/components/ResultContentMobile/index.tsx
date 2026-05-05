import { ResultContent } from "../ResultContent";
import { IAnimal } from "../../../../types/animal";
import * as Dialog from "@radix-ui/react-dialog";

interface IResultCard {
  animal: IAnimal;
  setAnimal: (newState: IAnimal) => void;
}

export function ResultContentMobile({ animal, setAnimal }: IResultCard) {
  function selectAnimal() {
    setAnimal(animal);
  }

  return (
    <div className="flex flex-col max-h-[200px] items-start mb-7">
      <Dialog.Root>
        <span className="pointer-events-none text-xs text-gray-300 mb-2">{animal.url}</span>
        <Dialog.Trigger asChild>
          <button onClick={selectAnimal} className="text-2xl text-blue-300 mb-3 bg-transparent border-none cursor-pointer hover:brightness-60 transition-all">
            {animal.title}
          </button>
        </Dialog.Trigger>
        <a className="text-base text-gray-300 mb-3 hover:brightness-60 transition-all">
          {animal.description}
        </a>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/75" />
          <Dialog.Content className="min-w-8 rounded bg-gray-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ResultContent animal={animal} />
            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
