import { useCallback, useEffect, useMemo, useState } from "react";
import { IAnimal } from "../../../shared/types/animal";

export function usePaginatedAnimals(items: ReadonlyArray<Readonly<IAnimal>>, itemsPerPage = 4) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = useMemo(() => items.slice(itemOffset, endOffset), [items, itemOffset, endOffset]);
  const pageCount = useMemo(() => Math.ceil(items.length / itemsPerPage), [items.length, itemsPerPage]);

  const handlePageChange = useCallback(
    (selected: number) => {
      const safeLength = items.length === 0 ? 1 : items.length;
      const newOffset = (selected * itemsPerPage) % safeLength;

      setItemOffset(newOffset);
    },
    [items.length, itemsPerPage]
  );

  useEffect(() => {
    setItemOffset(0);
  }, [items, itemsPerPage]);

  return {
    currentItems,
    pageCount,
    handlePageChange,
  };
}
