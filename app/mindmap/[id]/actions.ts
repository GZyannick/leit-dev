"use server";
import { currentUser } from "@clerk/nextjs/server";
import { NodeType, CreateNodeType, CreateEdgeType } from "@/lib/types";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

import { Node, Edge } from "reactflow";
import { v2 as cloudinary } from "cloudinary";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------- Get -------------- //

export const GetMindMap = async (id: string, profileId: string) => {
  const res = await db.mindMap.findUnique({
    where: {
      id,
      profileId,
    },
    include: {
      nodes: true,
    },
  });
  return res;
};

export const getEdge = async (mindMapId: string) => {
  const res = await db.edge.findMany({
    where: { mindMapId },
    include: { nodes: true },
  });
  return res;
};

// -------------- Create -------------- //

export const createEdge = async (req: CreateEdgeType) => {
  const res = await db.edge.create({
    data: {
      color: req.color,
      mindMap: { connect: { id: req.mindMapId } },
      nodes: {
        create: [
          {
            node: { connect: { id: req.source } },
            handle: req.sourceHandle,
          },
          {
            node: { connect: { id: req.target } },
            handle: req.targetHandle,
          },
        ],
      },
    },
  });
  return res.id;
};

export const createNode = async (req: CreateNodeType) => {
  const res = await db.node.create({
    data: {
      label: req.label,
      value: req.value,
      background: req.background,
      color: req.color,
      fontSize: req.fontSize,
      xPos: req.xPos,
      yPos: req.yPos,
      type: req.type,
      mindMap: {
        connect: { id: req.mindMapId },
      },
    },
  });
  revalidatePath("/mindmap/[id]");
  return res.id;
};

// -------------- Update -------------- //

export const updateMindMapName = async (mindMapId: string, name: string) => {
  await db.mindMap.update({
    where: {
      id: mindMapId,
    },
    data: {
      name: name,
    },
  });
};

export const updateNode = async (req: Node) => {
  await db.node.update({
    where: {
      id: req.id,
    },
    data: {
      label: req.data.label,
      value: req.data.value,
      background: req.data.background,
      color: req.data.color,
      fontSize: req.data.fontSize,
      xPos: req.position.x,
      yPos: req.position.y,
      type: req.type,
    },
  });

  console.log("updated");
};

export const updateNodePosition = async (
  id: string,
  position: { x: number; y: number },
) => {
  await db.node.update({
    where: {
      id,
    },
    data: {
      xPos: position.x,
      yPos: position.y,
    },
  });
};

// -------------- Delete -------------- //

export const deleteMindmap = async (id: string) => {
  const profile = await currentProfile();
  if (!profile) return;
  await db.mindMap.delete({
    where: {
      id: id,
      profileId: profile.id,
    },
  });
  redirect("/mindmap");
};

export const deleteEdge = async (id: number) => {
  await db.edge.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/mindmap/[id]");
};

export const deleteNode = async (id: string) => {
  await db.node.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/mindmap/[id]");
};

// -------------- Other -------------- //

export const sendToCloudinary = async (dataUrl: string, mindMapId: string) => {
  if (dataUrl === "" || mindMapId === "") return undefined;
  const user = await currentUser();

  if (!user) return undefined;
  //TODO SUPPRIMER LA RECHERCHE DE USER ICI
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (!profile) return undefined;
  const mindmap = await db.mindMap.findUnique({
    where: {
      id: mindMapId,
      profileId: profile.id,
    },
  });

  if (!mindmap) return undefined;
  cloudinary.uploader
    .upload(
      dataUrl,
      mindmap.imagePublicId ? { public_id: mindmap.imagePublicId } : {},
    )
    .then(async (res) => {
      await db.mindMap.update({
        where: {
          id: mindMapId,
          profileId: profile.id,
        },
        data: {
          imageUrl: res.secure_url,
          imagePublicId: res.public_id,
        },
      });
    });
  return undefined;
};
