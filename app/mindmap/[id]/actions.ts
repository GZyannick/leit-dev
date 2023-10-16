'use server';

//TODO creer un fichier qui contient tout les types

import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import { Node, Edge } from 'reactflow';

type NodeType = {
    label: string,
    value: string,
    background: string,
    color: string,
    fontSize: string,
    xPos: number,
    yPos: number,
    type: string,
}

type CreateNodeType = NodeType & {
    mindMapId: string,
}

type UpdateNodeType = NodeType & {
    id: string,
}


const GetMindMap = async (mindmapId: string) => {
    const profile: any = currentProfile(); 
    if(!profile) return;
    const currentMindmap = await db.mindMap.findUnique({
        where: { id: mindmapId, profileId: profile.id }
    });

    return currentMindmap;
}


export const updateNode = async (req: Node) => {
    await db.node.update({
        where: {
            id: req.id
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
        }
    })
}

export const createNode = async (req: CreateNodeType) => {
    await db.node.create({
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
            }
        }
    })
}

export const deleteNode = async (id: string) => {
    const aa = await db.node.delete({
        where: {
            id: id,
        }
    })
}