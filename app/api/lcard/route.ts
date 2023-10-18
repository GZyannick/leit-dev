import { currentProfile} from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const {question, answer} = await req.json()
        const profile = await currentProfile();
        if(!profile) return new NextResponse('Unauthorized', { status:401 })

        const lcard = await db.lcard.create(
            {
                data:{
                    profileId: profile.id,
                    question,
                    answer,
                }
            }
        );

        return NextResponse.json(lcard);

    } catch (error) {
        console.log("[SERVER_POST]: ", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

