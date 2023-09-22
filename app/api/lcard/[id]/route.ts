import { NextResponse } from "next/server";
import { Boxes } from "@prisma/client";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";


export const PATCH = async (request: Request, {params}: {params: {id:string}}) => {
}

export const GET = async(params: {id: string}) => {
    const profile = currentProfile();
    if(!profile) return new NextResponse("status Unauthorized", {status: 401})


    const lcard = db.lcard.findUnique({
        where: {
            id: params.id,
            profileId: profile.id,
        }
    })

    if(!lcard) return new NextResponse("Error", {status: 404})
    return NextResponse.json(lcard)
}