import { ReactNode, createContext, useState, useEffect } from "react";
import data from "../data/staticAnimals";
import { IAnimal } from "../shared/types/animal";

export type { IAnimal };

interface IAnimalContextType {
  animalsData: IAnimal[];
}

interface IChildren {
  children: ReactNode;
}

export const AnimalsDataContext = createContext<IAnimalContextType>({
  animalsData: [],
});

export function AnimalsDataProvider({ children }: IChildren) {
  const [animalsData, setAnimalsData] = useState<IAnimal[]>([]);

  useEffect(() => {
    setAnimalsData(data);
  }, []);

  return (
    <AnimalsDataContext.Provider value={{ animalsData }}>
      {children}
    </AnimalsDataContext.Provider>
  );
}
