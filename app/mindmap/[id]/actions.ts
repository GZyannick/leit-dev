"use server";
import { currentUser } from "@clerk/nextjs/server";
//TODO creer un fichier qui contient tout les types
import { NodeType, CreateNodeType, CreateEdgeType } from "@/lib/types";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { Node, Edge } from "reactflow";
import { create } from "domain";
import { connect } from "http2";
import { v2 as cloudinary } from "cloudinary";
import { MutableRefObject } from "react";
import { Akaya_Telivigala } from "next/font/google";
import { redirect } from "next/navigation";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const newGetMindMap = async (id: string, profileId: string) => {
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
  return res.id;
};

export const deleteNode = async (id: string) => {
  await db.node.delete({
    where: {
      id: id,
    },
  });
};

export const getEdge = async (mindMapId: string) => {
  const res = await db.edge.findMany({
    where: { mindMapId },
    include: { nodes: true },
  });
  return res;
};

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

export const deleteEdge = async (id: number) => {
  await db.edge.delete({
    where: {
      id: id,
    },
  });
};

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
      console.log(res);
      if (mindmap.imagePublicId) return;
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
