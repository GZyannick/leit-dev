"use client";
import { MindmapType } from "@/lib/types";
import useSort from "@/lib/hooks/useSort";
import Link from "next/link";
import Image from "next/image";
import BtnAndSort from "@/components/general/btn-and-sort";
import { Button } from "@/components/ui/button";

import { sortByMindmapName, sortByCreatedAt } from "@/lib/sort";

const Mindmaps = ({ mindmaps }: { mindmaps: MindmapType[] }) => {
  const [
    isSortByName,
    setIsSortByName,
    isSortByCreatedAt,
    setIsSortByCreatedAt,
    sortMindmaps,
  ] = useSort(mindmaps, sortByMindmapName, sortByCreatedAt);

  const sortingMethods = [
    {
      name: "Last added",
      state: isSortByCreatedAt,
      setState: setIsSortByCreatedAt,
    },
    {
      name: "Name",
      state: isSortByName,
      setState: setIsSortByName,
    },
  ];
  return (
    <div className="mx-auto mt-10 grid gap-6 md:container">
      {/*
      // @ts-ignore */}
      <BtnAndSort sortingMethods={sortingMethods}>
        <Button>New Mindmap</Button>
      </BtnAndSort>
      <div className="lg-grid-cols-4 mx-auto flex flex-col justify-center gap-10  sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/*
          // @ts-ignore */}
        {sortMindmaps.map((mindMap, key) => {
          const src = mindMap.imageUrl ? mindMap.imageUrl : "";
          return (
            <div key={`mindmap-${key}`}>
              <Link href={`/mindmap/${mindMap.id}`}>
                <Image
                  src={src}
                  alt={mindMap.name}
                  width={300}
                  height={171}
                  style={{
                    borderRadius: "0.5rem",
                    boxShadow: "0px 2px 8px 0px rgba(136, 136, 136, 0.14);",
                  }}
                />
                <p className="mt-2 text-[#4E4E4E]">{mindMap.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mindmaps;

// const [isSortByName, setIsSortByName] = useState<boolean>(false);
// const [isSortByCreatedAt, setIsSortByCreatedAt] = useState<boolean>(false);
// const [sortMindmaps, setSortMindmaps] = useState(mindmaps);

// useEffect(() => {
//   if (isSortByName === false && isSortByCreatedAt === false) return;
//   const sortedMindmaps = isSortByName
//     ? sortByMindmapName(sortMindmaps)
//     : sortByCreatedAt(sortMindmaps);
//   setSortMindmaps(sortedMindmaps);

//   setIsSortByName(false);
//   setIsSortByCreatedAt(false);
// }, [isSortByName, isSortByCreatedAt]);
