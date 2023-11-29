//server
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialProfile } from "@/lib/initial-profile";

// personal method
import LeitnerCards from "@/components/leitner/leitner-cards";

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

  return <LeitnerCards lcards={lcards} />;
};

export default LeitnerPage;
