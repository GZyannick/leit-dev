
import { InitialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { Boxes } from "@prisma/client";
import { redirect } from "next/navigation";

import Questions from "@/components/daily/client/questions";


const GetQuestions = async () => {
    let questions: {id: number, question: string, answer:string, box: Boxes|string }[] = []
    const profile = InitialProfile();
    if(!profile) return redirect("/");

    const lcards = await db.lcard.findMany({ 
        where: {
            profileId: profile.id,
        }
    });

    if(!lcards) return redirect("/leitner-box");
    const today: Date = new Date()

    lcards.forEach((card) => {
        const dayBetween = Math.floor((today - card.updatedAt) / (1000 * 60 * 60 * 24))
        if (dayBetween === 0) return;
        switch (card.box){
            case "BOX1":
                if(dayBetween >= 1) questions.push(card)
                break;
            case "BOX2":
                if(dayBetween >= 2) questions.push(card);
                break;
            case "BOX3":
                if(dayBetween >= 4) questions.push(card);
                break;
            case "BOX4":
                if(dayBetween >= 6) questions.push(card)
                break;
            case "BOX5":
                if(dayBetween >= 8) questions.push(card)
                break;
        }
    });
    



    if(questions.length === 0) return <h1>You have any question today</h1>

    return (
        <Questions questions={questions} />
    );
}
 // je dois transferer ça dans un utils 
export default GetQuestions;