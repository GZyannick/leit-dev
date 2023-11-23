import Link from "next/link";

//server
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialProfile } from "@/lib/initial-profile";

//ui
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BtnAndSort from "@/components/general/btn-and-sort";

// personal method
import InitialLeitnerForm from "@/components/modals/initial-Leitner-Form";
import Lcards from "@/components/leitner/lcards";

const LeitnerPage = async () => {
  const profile = InitialProfile();
  if (!profile) return redirect("/");

  const lcards = await db.lcard.findMany({
    where: {
      profileId: profile.id,

      NOT: {
        box: "LEARNED",
      },
    },
  });

  return (
    <div className="mx-auto mt-10 grid gap-6 md:container">
      <BtnAndSort
        sort={["Last added", "box"]}
        btn={["Daily question", "New Card"]}
      />
      {/* <div className="grid auto-rows-auto grid-cols-3 gap-6 md:grid-cols-4	"> */}
      <div className=" columns-1  gap-6 px-4 sm:columns-2 sm:px-2 md:columns-4 md:px-0">
        {lcards.map((lcard, key) => (
          <Card key={`lcard-${key}`} className="mt-4 break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-sm font-normal text-[#4E4E4E]	">
                question
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="p-2 text-center">{lcard.question}</p>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Link href={"/daily-question"}>
          <Button className="mr-4">Daily question</Button>
        </Link>
        <InitialLeitnerForm />
      </div>
    </div>
  );
};

export default LeitnerPage;

// import Link from "next/link";
// import { Boxes } from "@prisma/client";

// //ui
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import BtnAndSort from "@/components/general/btn-and-sort";

// // personal method
// import InitialLeitnerForm from "@/components/modals/initial-Leitner-Form";
// import Lcards from "@/components/leitner/lcards";

// const LeitnerPage = () => {
//   const boxes = Object.keys(Boxes);
//   return (
//     <div className="mx-auto mt-10 grid gap-6 md:container">
//       <BtnAndSort
//         sort={["Last added", "box"]}
//         btn={["Daily question", "New Card"]}
//       />
//       <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
//         {boxes.map((box) => (
//           <Card key={box} className="h-64 p-6">
//             <ul>
//               <Lcards box={box} />
//             </ul>
//           </Card>
//         ))}
//       </div>

//       <div className="mt-8">
//         <Link href={"/daily-question"}>
//           <Button className="mr-4">Daily question</Button>
//         </Link>
//         <InitialLeitnerForm />
//       </div>
//     </div>
//   );
// };

// export default LeitnerPage;
