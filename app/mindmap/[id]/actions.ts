'use server';

//TODO creer un fichier qui contient tout les types

import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import { Node, Edge } from 'reactflow';
import { create } from 'domain';
import { connect } from 'http2';

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

type CreateEdgeType = {
    source: string,
    sourceHandle: string,
    target: string,
    targetHandle: string,
    color: string,
    mindMapId: string,
}


export const newGetMindMap = async (id: string, profileId: string) => {
    const res = await db.mindMap.findUnique({
        where: {
            id,
            profileId,
        },

        include: {
            nodes: true
        }
    })

    return res;
}

export const updateNodePosition = async (id: string, position: {x: number, y: number}) => {
    await db.node.update({
        where: {
            id,
        },
        data: {
            xPos: position.x,
            yPos: position.y
        }
    })
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
            }
        }
    })
    return res.id;
}

export const deleteNode = async (id: string) => {
    await db.node.delete({
        where: {
            id: id,
        }
    })
}


export const getEdge = async (mindMapId: string) => {
    const res = await db.edge.findMany({
        where: { mindMapId },
        include: { nodes: true }
    })
    return res
}

export const createEdge = async (req: CreateEdgeType) => {
    const res = await db.edge.create({
        data: {
            color: req.color,
            mindMap: {connect: {id: req.mindMapId}},
            nodes: {
                create: [
                    { 
                        node: {connect: {id: req.source}},
                        handle: req.sourceHandle,
                    },
                    { 
                        node: {connect: {id: req.target}},
                        handle: req.targetHandle
                    },
                ],
            },
        },
    })
    return res.id
}

export const deleteEdge = async (id: number) => {
    await db.edge.delete({
        where: {
            id: id
        }
    })
}