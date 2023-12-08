"use client";

import { useState } from "react";

//ui
import { FlipCard } from "@/components/ui/flip-card";

import { LcardType } from "@/lib/types";
import { FilledBox, LinedBox } from "@/components/ui/svg";

const Lcard = ({ lcard }: { lcard: LcardType }) => {
  // const boxNumber = strToBoxNumber(lcard.box);
  return (
    <FlipCard question={lcard.question} answer={lcard.answer} box={lcard.box} />
  );
};

export default Lcard;
