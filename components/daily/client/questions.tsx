"use client";

import React, { useEffect, useState, useTransition } from "react";
import { UpdateQuestion } from "@/components/daily/server/actions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Props } from "@/lib/types";
import { FlipCard } from "@/components/ui/flip-card";

import Link from "next/link";
import { Boxes } from "@prisma/client";

const Questions = (props: Props) => {
  const [currentQuestionindex, setCurrentQuestionindex] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [questionResponse, setQuestionResponse] = useState("");
  let [isPending, startTransition] = useTransition();

  useEffect(() => {
    setCurrentProgress(
      Math.round((currentQuestionindex / props.questions.length) * 100),
    );
  }, [currentProgress, currentQuestionindex]);

  const nextQuestion = (isTrue: boolean) => {
    UpdateQuestion({
      questionId: props.questions[currentQuestionindex].id,
      box: props.questions[currentQuestionindex].box,
      isTrue,
    });

    setCurrentQuestionindex(currentQuestionindex + 1);
  };

  if (currentQuestionindex <= props.questions.length - 1) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center ">
        <div className="flex w-4/6 flex-col items-center justify-center py-16">
          <p className="mb-2 text-lg">{currentProgress}%</p>
          <Progress value={currentProgress} />
        </div>
        <FlipCard
          question={props.questions[currentQuestionindex].question}
          answer={props.questions[currentQuestionindex].answer}
          box={props.questions[currentQuestionindex].box}
        />

        <div className="flex w-64 items-center justify-between pt-8">
          <Button onClick={() => startTransition(() => nextQuestion(false))}>
            False
          </Button>
          <Button onClick={() => startTransition(() => nextQuestion(true))}>
            True
          </Button>
        </div>
      </div>
    );
  } else if (currentQuestionindex >= props.questions.length) {
    return (
      <div>
        <div>
          <p>{currentProgress}%</p>
          <Progress value={currentProgress} />
        </div>

        <h1>Great job you finish it!!!!</h1>
      </div>
    );
  } else {
    return (
      <div className="p-4">
        <h1 className="mb-4 text-3xl">Error Try again later</h1>
        <Button>
          <Link href="/leitner-box">Return</Link>
        </Button>
      </div>
    );
  }
};

export default Questions;
