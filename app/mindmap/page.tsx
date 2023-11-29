import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialProfile } from "@/lib/initial-profile";
import Mindmaps from "@/components/mindmap/mindmaps";
const MindMapsPage = async () => {
  const profile: any = InitialProfile();
  if (!profile) redirect("/");

  const mindMaps = await db.mindMap.findMany({
    where: {
      profileId: profile.id,
    },
  });

  return <Mindmaps mindmaps={mindMaps} />;
};

export default MindMapsPage;
