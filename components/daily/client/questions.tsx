"use client";

import React, { useEffect, useState, useTransition } from "react";
import { UpdateQuestion } from "@/app/daily-question/actions";
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import Link  from "next/link";
import { Boxes } from "@prisma/client";
type Props = {
    questions: {
        id: string,
        question: string,
        answer: string,
        box: string
    }[],

    children: any,
}

// const Questions = (props: {children: any,questions: {id: number, question: string, answer: string}[] }) => {
const Questions = (props: Props) => {

    const [currentQuestionindex, setCurrentQuestionindex] = useState(0);
    const [currentProgress, setCurrentProgress]= useState(0);
    const [showResponse, setShowResponse] = useState(false);
    const [questionResponse, setQuestionResponse] = useState("")
    let [isPending, startTransition] = useTransition();


    useEffect(() => {
        setCurrentProgress( Math.round((currentQuestionindex  / props.questions.length) * 100))
        if(!props.questions[currentQuestionindex]) return;
        setQuestionResponse(
            showResponse ? props.questions[currentQuestionindex].answer : props.questions[currentQuestionindex].question
        );
    }, [currentProgress, currentQuestionindex, showResponse]);

    const nextQuestion = (isTrue: boolean) => {

        UpdateQuestion({
            questionId: props.questions[currentQuestionindex].id,
            box: Boxes.BOX5,
            isTrue
        })

        setCurrentQuestionindex(currentQuestionindex + 1);
        setShowResponse(false);

    }



    if(currentQuestionindex <= props.questions.length - 1 ){
        return ( 
            <div className="flex flex-col justify-center items-center h-full w-full">
                <div className="py-16 w-4/6 flex flex-col justify-center items-center">
                    <p className="mb-2 text-lg">{currentProgress}%</p>
                    <Progress value={currentProgress} />
                </div>
                

                <div>
                    <Card className="h-72 w-64 bg-slate-50 flex flex-col justify-center items-center" onClick={() => setShowResponse(!showResponse)}>
                        <CardHeader className="pt-4"></CardHeader>
                        <CardContent>
                            <p className="text-center text-lg select-none">
                                {
                                    questionResponse
                                }
                            </p>
                        </CardContent>
                        <CardFooter className="pb-4 ">
                    
                        </CardFooter>
                    </Card>

                </div>
                <div className="flex justify-between items-center px-4 pt-8 w-64">
                    <Button variant={"outline"} onClick={() => startTransition(() => nextQuestion(false))} className="border-red-300 rounded-full">False</Button>
                    <Button variant={"outline"} onClick={() => startTransition(() => nextQuestion(true))} className="border-green-300 rounded-full">True</Button>
                </div>
            </div>
         );
        
    }else if( currentQuestionindex >= props.questions.length ){
        return(
            <div>
            <div>
                <p>{currentProgress}%</p>
                <Progress value={currentProgress}/>
            </div>
            
            <h1>Great job you finish it!!!!</h1>
            <Button><Link href="/leitner-box">Return</Link></Button>

        </div>
        )
    }
    else{
        return (
            <div className="p-4">
                <h1 className="text-3xl mb-4">Error Try again later</h1>
                <Button><Link href="/leitner-box">Return</Link></Button>
            </div>
        )
    }
}
 
export default Questions;


{/* 
    <p>
    {
        props.questions[currentQuestionindex].question
    }
    </p>
    <p>
        {
            props.questions[currentQuestionindex].answer
        }
    </p>
*/}



// IDEEEE https://github.com/vercel/next.js/discussions/49345

// 'use client';
// import { useState, useTransition } from 'react';

// import { useRouter } from 'next/navigation';

// export const Example = ({ serverDataList }: { serverDataList: string[] }) => {
//   const [isPending, setPending] = useState(false);
//   const [isTransitionStarted, startTransition] = useTransition();
//   const router = useRouter();

//   const isMutating = isPending || isTransitionStarted;

//   const handlePerformServerMutation = () => {
//     setPending(true);
//     // update server data here
//     //
//     // then, start a transition
//     startTransition(router.refresh);
//     setPending(false);
//   };

//   return (
//     <div>
//       <button onClick={handlePerformServerMutation}>Add item</button>
//       {isMutating
//         ? 'updating...'
//         : serverDataList.map((item) => <div key={item}>{item}</div>)}
//     </div>
//   );
// };