import { db } from "@/lib/db"
import { PrismaClient } from "@prisma/client";
import { Boxes } from "@prisma/client"
import axios from "axios";

import { Button } from '@/components/ui/button';

type Props = {
    questionId: string,
    box: Boxes,
    isTrue: boolean
}

const UpdateQuestion = async(props: Props) => {
    
    const prisma = new PrismaClient();

    
    // const updateLcard = await prisma.lcard.update({
    //     where: {
    //         id: props.questionId,
    //     },
    //     data: {
    //         box: props.box
    //     }
    // })

    const updateQuestion = async (questionId: number, box: Boxes, isTrue: boolean) => {
        await axios.patch("api/lcard", {questionId, props.box, isTrue})
    }

    return 

}
 
export default UpdateQuestion;

{/* <>
<Button variant={"outline"} onClick={nextQuestion} className="border-red-300 rounded-full">0</Button>
<Button variant={"outline"} onClick={nextQuestion} className="border-green-300 rounded-full">0</Button>
</> */}