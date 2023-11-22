import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialProfile } from "@/lib/initial-profile";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const MindMapsPage = async () => {
  const profile: any = InitialProfile();
  if (!profile) redirect("/");

  const mindMaps = await db.mindMap.findMany({
    where: {
      profileId: profile.id,
    },
  });

  return (
    <div className="mx-auto mt-10 grid gap-6 md:container">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-[#4E4E4E]">
          <p>Last updated</p>
          <p>Name</p>
        </div>
        <Button className="px-12">New Mindmap</Button>
      </div>
      <div className="lg-grid-cols-4 mx-auto flex flex-col justify-center gap-10  sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mindMaps.map((mindMap, key) => (
          <div key={`mindmap-${key}`}>
            <Link href={`/mindmap/${mindMap.id}`}>
              <Image
                src={mindMap.imageUrl}
                alt={mindMap.name}
                width={300}
                height={171}
                style={{
                  borderRadius: "0.5rem",
                  boxShadow: "0px 2px 8px 0px rgba(136, 136, 136, 0.14);",
                }}
              />
              <p className="mt-2 text-[#4E4E4E]">{mindMap.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MindMapsPage;
