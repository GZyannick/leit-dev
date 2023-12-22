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

export const GetMindmapNodeAndEdge = async (id: string) => {
  const profile = await currentProfile();
  if (!profile) return;
  const res = await db.mindMap.findUnique({
    where: {
      id,
      profileId: profile.id,
    },
    include: {
      nodes: {
        include: {
          edges: true,
        },
      },
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

// {
//     "id": "8832a89b-638a-4596-8579-1777958d88dc",
//     "type": "mindMap",
//     "position": {
//         "x": 1632.5581366783715,
//         "y": -427.2549467729588
//     },
//     "data": {
//         "label": "mindMap node 1",
//         "value": "When Leaving",
//         "style": {
//             "color": "#023047",
//             "fontSize": "1rem",
//             "background": "#4e84b1"
//         }
//     },
//     "width": 187,
//     "height": 42,
//     "selected": false,
//     "positionAbsolute": {
//         "x": 1632.5581366783715,
//         "y": -427.2549467729588
//     },
//     "dragging": false
// }
export const CreateMany = async (
  req: Node[],
  mindmapId: string,
  toCreateEdgeWithNode: Edge[],
) => {
  if (!req || req.length === 0) return;
  let filteredEdgesWithBakendNodeId: Edge[] = [];
  await Promise.all(
    req.map(async (node) => {
      // res of data of node
      const res = await db.node.create({
        data: {
          label: node.data.label,
          value: node.data.value,
          background: node.data.style.background,
          color: node.data.style.color,
          fontSize: node.data.style.fontSize,
          xPos: node.position.x,
          yPos: node.position.y,
          type: node.type ? node.type : "background",
          mindMap: {
            connect: { id: mindmapId },
          },
        },
      });
      if (toCreateEdgeWithNode.length > 0) {
        filteredEdgesWithBakendNodeId = toCreateEdgeWithNode.map((edge) => {
          if (node.id === edge.source) edge.source = res.id;
          if (node.id === edge.target) edge.target = res.id;
          return edge;
        });
      }
    }),
  );

  if (filteredEdgesWithBakendNodeId.length > 0)
    await createManyEdge(filteredEdgesWithBakendNodeId, mindmapId);
};

export const UpdateMany = async (req: Node[], mindmapId: string) => {
  if (!req || req.length === 0) return;
  req.map(async (node) => {
    await db.node.update({
      where: {
        id: node.id,
        mindMapId: mindmapId,
      },
      data: {
        label: node.data.label,
        value: node.data.value,
        background: node.data.style.background,
        color: node.data.style.color,
        fontSize: node.data.style.fontSize,
        xPos: node.position.x,
        yPos: node.position.y,
        type: node.type ? node.type : "background",
      },
    });
  });
};

export const DeleteMany = async (req: Node[], mindmapId: string) => {
  if (!req || req.length === 0) return;
  req.map(async (node) => {
    await db.node.delete({
      where: {
        id: node.id,
        mindMapId: mindmapId,
      },
    });
  });
};

export const createManyEdge = async (req: Edge[], mindMapId: string) => {
  req.map(async (edge: Edge) => {
    if (edge.source.includes("node-") || edge.target.includes("node-")) {
      console.log(edge);
      return;
    }
    await db.edge.create({
      data: {
        color: edge.style.stroke,
        mindMap: { connect: { id: mindMapId } },
        nodes: {
          create: [
            {
              node: { connect: { id: edge.source } },
              handle: edge.sourceHandle,
            },
            {
              node: { connect: { id: edge.target } },
              handle: edge.targetHandle,
            },
          ],
        },
      },
    });
  });
};

export const createNode = async (req: Node, mindmapId: string) => {
  const res = await db.node.create({
    data: {
      label: req.data.label,
      value: req.data.value,
      background: req.data.style.background,
      color: req.data.style.color,
      fontSize: req.data.style.fontSize,
      xPos: req.position.x,
      yPos: req.position.y,
      type: req.type ? req.type : "background",
      mindMap: {
        connect: { id: mindmapId },
      },
    },
  });
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
