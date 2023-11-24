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

type LcardType = {
  id: String;
  question: String;
  answer: String;
  box: String;
  profileId: String;
  createdAt: Date;
  updatedAt: Date;
};

const Lcard = ({ lcard }: { lcard: LcardType }) => {
  const [isFlip, setIsFlip] = useState(false);

  const invertInnerFlip = `duration-300 transition-all ${
    isFlip ? "[transform:rotateY(-180deg)]" : "[transform:rotateY(0deg)]"
  }`;
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
      <CardFooter className={invertInnerFlip}></CardFooter>
    </Card>
  );
};

export default Lcard;
