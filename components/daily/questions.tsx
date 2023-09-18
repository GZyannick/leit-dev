"use client";

import { useEffect, useState } from "react";

import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";


const Questions = (props: {questions: {id: number, question: string, answer: string}[] }) => {
    const [currentQuestionindex, setCurrentQuestionindex] = useState(0);
    const [currentProgress, setCurrentProgress]= useState(0);

    const nextQuestion = () => {
        if(currentQuestionindex < props.questions.length - 1) setCurrentQuestionindex(currentQuestionindex + 1);
    }

    useEffect(() => {
        setCurrentProgress( Math.round((currentQuestionindex  / props.questions.length) * 100))
    }, [currentProgress, currentQuestionindex])


    return ( 
        <div>
            <div>
                <p>{currentProgress}%</p>
                <Progress value={currentProgress}/>
            </div>
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
            <Button onClick={nextQuestion}> Next </Button>
        </div>
     );
}
 
export default Questions;