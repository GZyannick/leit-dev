"use client";

// IDEE TROUVER UN MOYEN DE CHANGER DE Question a l'aide du server est nom le client
// mais utiliser le client pour le progressBar est les onclick tout ça tu coco


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

type Props = {
    questions: {
        id: number,
        question: string,
        answer: string,
        box: string
    }[],

    children: any,
}

// const Questions = (props: {children: any,questions: {id: number, question: string, answer: string}[] }) => {
const Questions = (props: Props) => {


    // const renderChildren : any = () => {
    //     console.log(props.questions[currentQuestionindex])
    //     if(!props.children) return <div></div>;

    //     console.log(props.children)
    //     // const data =  Children.map(props.children.value, (child: any) => {
    //     const test = React.cloneElement(props.children, {
    //         box: props.questions[currentQuestionindex].box,
    //         id: props.questions[currentQuestionindex].id
    //     })
    //     // })

    //     return
    // }




    return ( 
        <div className="flex flex-col justify-center items-center h-full w-full">
            <div className="py-16 w-4/6 flex flex-col justify-center items-center">
            </div>
            

            <div>
                <Card className="h-72 w-64 bg-slate-50 flex flex-col justify-center items-center">
                    <CardHeader className="pt-4"></CardHeader>
                    <CardContent>
                        <p className="text-center text-lg select-none">
                
                        </p>
                    </CardContent>
                    <CardFooter className="pb-4 ">
                    </CardFooter>
                </Card>

            </div>
                {props.children}
        </div>
        );
    
}
 
export default Questions;

