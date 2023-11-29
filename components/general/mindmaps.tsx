import { db } from "@/lib/db";
import { InitialProfile } from "@/lib/initial-profile";
import Image from "next/image";
import Container from "@/components/general/container";

// This is for the dashboard that why is in general

const Mindmaps = async () => {
  const profile = await InitialProfile();
  const mindmaps = await db.mindMap.findMany({
    where: {
      profileId: profile.id,
    },
    take: 4,
  });
  return (
    <Container>
      <div className="flex w-full items-center justify-center ">
        {mindmaps.map((mindmap, idx) => (
          <div key={idx} className=" overflow-hidden pr-8  last:pr-0">
            <div className="lg: relative h-12 w-24 rounded-lg border-2 border-[#2E2E32] shadow-[-2px_-2px_4px_rgba(223,223,223,0.15)] md:h-[72px] md:w-32 lg:h-24  lg:w-48  xl:h-32 xl:w-60">
              <Image
                src="https://images.unsplash.com/photo-1493612276216-ee3925520721"
                fill={true}
                alt={`thumbnail of ${mindmap.name}`}
                quality={100}
                style={{ objectFit: "cover", borderRadius: "0.5rem" }}
              />
            </div>
            <p className="pt-2">{mindmap.name}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};
export default Mindmaps;
