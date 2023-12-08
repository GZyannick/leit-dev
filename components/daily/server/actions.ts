"use server";

import { db } from "@/lib/db";
import { Boxes } from "@prisma/client";
import { currentProfile } from "@/lib/current-profile";

export async function UpdateQuestion(req: {
  questionId: string;
  box: Boxes | string;
  isTrue: boolean;
}) {
  const profile: any = currentProfile();
  if (!profile) return;

  let newBox;
  switch (req.box) {
    case Boxes.BOX1:
      newBox = req.isTrue ? Boxes.BOX2 : Boxes.BOX1;
      break;
    case Boxes.BOX2:
      newBox = req.isTrue ? Boxes.BOX3 : Boxes.BOX1;
      break;
    case Boxes.BOX3:
      newBox = req.isTrue ? Boxes.BOX4 : Boxes.BOX2;
      break;
    case Boxes.BOX4:
      newBox = req.isTrue ? Boxes.BOX5 : Boxes.BOX3;
      break;
    case Boxes.BOX5:
      newBox = req.isTrue ? Boxes.LEARNED : Boxes.BOX4;
      break;
    case Boxes.LEARNED:
      newBox = undefined;
      break;
  }

  if (!newBox) return;
  try {
    const lcard = await db.lcard.update({
      where: {
        id: req.questionId,
        profileId: profile.id,
      },
      data: {
        box: newBox,
      },
    });
  } catch (error) {
    console.log("ERROR:", error);
  }
}
