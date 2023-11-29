import { useState, useEffect } from "react";
import { MindmapType, LcardType } from "../types";

const useSort = (
  values: any[],
  firstMethod: (val: any[]) => any[],
  secondMethod: (val: any[]) => any[],
) => {
  const [firstSortState, setFirstSortState] = useState<boolean>(false);
  const [secondSortState, setSecondSortState] = useState<boolean>(false);
  const [toSortValues, setToSortValues] = useState(values);

  useEffect(() => {
    if (firstSortState === false && secondSortState === false) return;

    const sortedValues = firstSortState
      ? firstMethod(toSortValues)
      : secondMethod(toSortValues);
    setToSortValues(sortedValues);

    setFirstSortState(false);
    setSecondSortState(false);
  }, [firstSortState, secondSortState]);

  return [
    firstSortState,
    setFirstSortState,
    secondSortState,
    setSecondSortState,
    toSortValues,
  ];
};

export default useSort;
