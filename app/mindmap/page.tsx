import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialProfile } from "@/lib/initial-profile";
import Link from "next/link";

const MindMapsPage = async () => {
  const profile: any = InitialProfile();
  if (!profile) redirect("/");

  const mindMaps = await db.mindMap.findMany({
    where: {
      profileId: profile.id,
    },
  });

  return (
    <div className="grid gap-10">
      {mindMaps.map((mindMap, key) => (
        <div key={`mindmap-${key}`}>
          {mindMap.name}
          <Link href={`/mindmap/${mindMap.id}`}>view</Link>
        </div>
      ))}
    </div>
  );
};

export default MindMapsPage;
