//server
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialProfile } from "@/lib/initial-profile";

// personal method
import LeitnerCards from "@/components/leitner/leitner-cards";
import GetQuestions from "@/components/daily/server/get-questions";
const LeitnerPage = async () => {
  const profile = InitialProfile();
  if (!profile) return redirect("/");

  const lcards = await db.lcard.findMany({
    where: {
      //@ts-ignore
      profileId: profile.id,

      NOT: {
        box: "LEARNED",
      },
    },
  });

  return (
    <LeitnerCards lcards={lcards}>
      <GetQuestions />
    </LeitnerCards>
  );
};

export default LeitnerPage;
