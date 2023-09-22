import { currentProfile} from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NextResponse } from "next/server";


// export async function GET() {
//     try {
//         const profile = await currentProfile();
//         if(!profile) return new NextResponse('Unauthorized', { status:401 })
//         const lcards = db.lcard.findMany({
//         where: {
//             profileId: profile.id
//         }})
//         if(!lcards) return NextResponse.json([], {status: 200})

//   } catch (error) {
//     console.log("[SERVER_GET]: ", error)
//   }  
// }

// export async function PATCH(req: Request) {
//   try {
//     // const {id, box, question, answer} = await req.json();
//     const data: any = await req.json();
//     console.log("data:", data)

//     const profile = await currentProfile();
//     if(!profile) return new NextResponse('Unauthorized', { status:401 })

//     // const lcard = await db.lcard.update({
//     //     where: {
//     //         id,
//     //         profileId: profile.id
//     //     },
//     //     data: {
//     //         box,
//     //     }
//     // })

//     return NextResponse.json("updated successfully", {status: 200})

//   } catch (error) {
//     console.log("[SERVER_PATCH]  daa: ", error)
//     return new NextResponse("Internal Error", {status: 500})
//   }  
// }

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

