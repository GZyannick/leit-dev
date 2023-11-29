"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

//types

import { LcardType } from "@/lib/types";

//ui
import { Button } from "@/components/ui/button";
import BtnAndSort from "@/components/general/btn-and-sort";

// personal method
import Lcard from "./lcard";
import InitialLeitnerForm from "@/components/modals/initial-Leitner-Form";
import { sortByBox, sortByCreatedAt } from "@/lib/sort";

const LeitnerCards = ({ lcards }: { lcards: LcardType[] }) => {
  const [isSortByBox, setIsSortByBox] = useState<boolean>(false);
  const [isSortByCreatedAt, setIsSortByCreatedAt] = useState<boolean>(false);
  const [sortLcards, setSortLcards] = useState(lcards);

  useEffect(() => {
    if (isSortByBox === false && isSortByCreatedAt === false) return;
    const sortedLcards = isSortByBox
      ? sortByBox(sortLcards)
      : sortByCreatedAt(sortLcards);
    setSortLcards(sortedLcards);

    setIsSortByBox(false);
    setIsSortByCreatedAt(false);
  }, [isSortByBox, isSortByCreatedAt]);

  const sortingMethods = [
    {
      name: "Last added",
      state: isSortByCreatedAt,
      setState: setIsSortByCreatedAt,
    },
    {
      name: "Box",
      state: isSortByBox,
      setState: setIsSortByBox,
    },
  ];

  return (
    <div className="mx-auto mt-10 grid gap-6 md:container">
      <BtnAndSort sortingMethods={sortingMethods}>
        <Link href={"/daily-question"}>
          <Button>Daily question</Button>
        </Link>
        <InitialLeitnerForm />
      </BtnAndSort>
      <div className=" columns-1 gap-6 px-4 sm:columns-2 sm:px-2 md:columns-4 md:px-0">
        {sortLcards?.map((lcard, key) => (
          <Lcard key={`lcard-n${key}`} lcard={lcard} />
        ))}
      </div>
    </div>
  );
};

export default LeitnerCards;
