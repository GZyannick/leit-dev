"use client";

import { useState } from "react";

//ui
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LcardType } from "@/lib/types";
import { FilledBox, LinedBox } from "@/components/ui/svg";

const BoxNumberToSvg = (box: String) => {
  const res = parseInt(box.replace(/\D/g, ""));
  const svgs = [];
  for (let i = 1; i <= 5; i++) {
    if (i < res) {
      svgs.push({ icon: FilledBox, color: "#4E4E4E" });
    } else if (i === res) {
      svgs.push({ icon: LinedBox, color: "#86D47D" });
    } else if (i > res) {
      svgs.push({ icon: LinedBox, color: "#4E4E4E" });
    }
  }
  return svgs;
};

const Lcard = ({ lcard }: { lcard: LcardType }) => {
  const [isFlip, setIsFlip] = useState(false);

  const invertInnerFlip = `duration-300 transition-all ${
    isFlip ? "[transform:rotateY(-180deg)]" : "[transform:rotateY(0deg)]"
  }`;

  // const boxNumber = strToBoxNumber(lcard.box);
  const svgs = BoxNumberToSvg(lcard.box);
  return (
    <Card
      className={`mb-6 cursor-pointer select-none break-inside-avoid  transition-all duration-500  [transform-style:preserve-3d] ${
        isFlip ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
      }`}
      onClick={() => {
        setIsFlip(!isFlip);
      }}
    >
      <CardHeader className={invertInnerFlip}>
        <CardTitle className="text-sm font-normal text-[#4E4E4E]	">
          {isFlip ? "answer" : "question"}
        </CardTitle>
      </CardHeader>
      <CardContent className={invertInnerFlip}>
        <p className="p-2 text-center">
          {isFlip ? lcard.answer : lcard.question}
        </p>
      </CardContent>
      <CardFooter className={invertInnerFlip}>
        {svgs.map((svg, key) => (
          <div key={`svg-n${key}`}>
            <svg.icon color={svg.color} width="1.5rem" height="1.5rem" />
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

export default Lcard;
