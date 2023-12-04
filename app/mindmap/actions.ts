"use server";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

export const createNewMindmap = async () => {
  const profile = await currentProfile();
  if (!profile) return;

  const count = (
    await db.mindMap.findMany({
      where: {
        profile: profile,
      },
    })
  ).length;

  const mindmap = await db.mindMap.create({
    data: {
      name: `Mindmap ${count}`,
      profile: {
        connect: { id: profile.id },
      },
    },
  });

  if (mindmap && mindmap.id) {
    redirect(`/mindmap/${mindmap.id}`);
  } else {
    return "error";
  }
};
