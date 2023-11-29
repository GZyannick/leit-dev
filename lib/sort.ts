// this file take all the personal sort method
import { LcardType, MindmapType } from "@/lib/types";

export const sortByMindmapName = (sortMindmaps: MindmapType[]) => {
  const sortedMindmaps = [...sortMindmaps].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return sortedMindmaps;
};

export const sortByCreatedAt = (sort: any[]) => {
  const sorted = [...sort].sort(
    // @ts-ignore
    (a, b) => a.createdAt - b.createdAt,
  );
  return sorted;
};

export const sortByBox = (sortLcards: LcardType[]) => {
  const sortedLcards = [...sortLcards].sort(
    (a, b) =>
      parseInt(a.box.replace(/\D/g, "")) - parseInt(b.box.replace(/\D/g, "")),
  );
  return sortedLcards;
};
