// this file take all the personal sort method
import { LcardType } from "@/lib/types";
export const sortByCreatedAt = (sortLcards: LcardType[]) => {
  const sortedLcards = [...sortLcards].sort(
    // @ts-ignore
    (a, b) => a.createdAt - b.createdAt,
  );
  return sortedLcards;
};

export const sortByBox = (sortLcards: LcardType[]) => {
  const sortedLcards = [...sortLcards].sort(
    (a, b) =>
      parseInt(a.box.replace(/\D/g, "")) - parseInt(b.box.replace(/\D/g, "")),
  );
  return sortedLcards;
};
