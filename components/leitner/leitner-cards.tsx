"use client";

import useSort from "@/lib/hooks/useSort";
import Link from "next/link";
import { ReactNode } from "react";

//types

import { LcardType } from "@/lib/types";

//ui
// import { Button } from "@/components/ui/button";
import BtnAndSort from "@/components/general/btn-and-sort";

// personal method
import Lcard from "./lcard";
import InitialLeitnerForm from "@/components/modals/initial-Leitner-Form";
import { sortByBox, sortByCreatedAt } from "@/lib/sort";
import DailyQuestionModal from "@/components/modals/daily-question-modal";

const LeitnerCards = ({
  lcards,
  children,
}: {
  lcards: LcardType[];
  children: ReactNode;
}) => {
  const [
    isSortByBox,
    setIsSortByBox,
    isSortByCreatedAt,
    setIsSortByCreatedAt,
    sortLcards,
  ] = useSort(lcards, sortByBox, sortByCreatedAt);

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
      {/*
    // @ts-ignore */}
      <BtnAndSort sortingMethods={sortingMethods}>
        <DailyQuestionModal>{children}</DailyQuestionModal>
        <InitialLeitnerForm />
      </BtnAndSort>
      <div className=" columns-1 gap-6 px-4 sm:columns-2 sm:px-2 md:columns-4 md:px-0">
        {/*
      // @ts-ignore */}
        {sortLcards?.map((lcard, key) => (
          <Lcard key={`lcard-n${key}`} lcard={lcard} />
        ))}
      </div>
    </div>
  );
};

export default LeitnerCards;
