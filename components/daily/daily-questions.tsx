import { db } from '@/lib/db';
import { InitialProfile } from "@/lib/initial-profile";
import { Boxes } from "@prisma/client";
import { redirect } from "next/navigation";


type Props = {
    id: string;
    question: string;
    answer: string;
    box: Boxes;
    profileId: string;
    createdAt: Date;
    updatedAt: Date; 
}[]

type dailyQ = {
    id: string;
    question: string;
    answer: string;
    box: Boxes;
    profileId: string;
    createdAt: Date;
    updatedAt: Date; 
}

const isDailyQuestion = (questions: Props, today: Date) => {
    let res : Props = []

    questions.forEach((question) => {
        const dayBetween = Math.floor((today - question.updatedAt) / (1000 * 60 * 60 * 24))
        if (dayBetween === 0) return;
        switch (question.box){
            case "BOX1":
                if(dayBetween >= 1) res.push(question)
                break;
            case "BOX2":
                if(dayBetween >= 2) res.push(question);
                break;
            case "BOX3":
                if(dayBetween >= 4) res.push(question);
                break;
            case "BOX4":
                if(dayBetween >= 6) res.push(question)
                break;
            case "BOX5":
                if(dayBetween >= 8) res.push(question)
                break;
        }
    });

    return res
}

const DailyQuestion = async () => {
    const profile = InitialProfile();
    if(!profile) redirect("/leitner-box");

    const today: Date = new Date()
    let oneDaysAgo: Date = new Date(today)
    oneDaysAgo.setDate(today.getDate() - 1)

    const questions = await db.lcard.findMany({
        where: {
            profileId: profile.id,
            box: { not: Boxes.LEARNED},

            updatedAt: { lte: oneDaysAgo}
        }
    })
    if(!questions) return redirect("/leitner-box");

    const dailyQuestions = isDailyQuestion(questions, today);

    if(dailyQuestions.length === 0) return <h1>You have any question today</h1>

    
    return ( 
            <div>
                
            </div>
     );
}
 
export default DailyQuestion;