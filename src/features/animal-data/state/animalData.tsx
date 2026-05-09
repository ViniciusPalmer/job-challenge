import { ReactNode, createContext, useState } from "react";
import data from "../data/staticAnimals";
import { IAnimal } from "../../../shared/types/animal";

interface IAnimalContextType {
  animalsData: ReadonlyArray<Readonly<IAnimal>>;
}

interface IChildren {
  children: ReactNode;
}

export const AnimalsDataContext = createContext<IAnimalContextType>({
  animalsData: [],
});

export function AnimalsDataProvider({ children }: IChildren) {
  const [animalsData] = useState<ReadonlyArray<Readonly<IAnimal>>>(() =>
    data.map((animal) => ({ ...animal }))
  );

  return (
    <AnimalsDataContext.Provider value={{ animalsData }}>
      {children}
    </AnimalsDataContext.Provider>
  );
}
