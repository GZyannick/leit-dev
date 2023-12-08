import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

type FlipCardData = {
  question: String;
  answer: String;
  box: String;
};

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

export const FlipCard = ({ question, answer, box }: FlipCardData) => {
  const [isFlip, setIsFlip] = useState(false);

  const svgs = BoxNumberToSvg(box);
  const invertInnerFlip = `duration-300 transition-all ${
    isFlip ? "[transform:rotateY(-180deg)]" : "[transform:rotateY(0deg)]"
  }`;

  return (
    <Card
      className={` mb-6 cursor-pointer select-none  break-inside-avoid transition-all duration-500  [transform-style:preserve-3d] ${
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
        <p className="p-2 text-center">{isFlip ? answer : question}</p>
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
