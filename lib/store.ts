"use client"

import {
    applyEdgeChanges,
    applyNodeChanges,
    Edge,
    Node, 
    OnConnect, 
    OnEdgesChange, 
    OnNodesChange,
    addEdge,
    ReactFlowInstance,
    NodeChange,
    EdgeChange,
} from 'reactflow';

import { createWithEqualityFn } from 'zustand/traditional';
import { MutableRefObject} from 'react';
import { createNode, updateNode, deleteNode } from '@/app/mindmap/[id]/actions';

type RFState = {
    nodes: Node[],
    edges: Edge[],
    stroke: string,
    background: string,
    mindMapId: string,
    color: string,
    fontSize: string,
    id: number,
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    updateContentValue: (params: {value: string, nodeId:string}) => void;
    onNodeDelete: (event: any) => void

}

const useMindmapStore = createWithEqualityFn<RFState>((set, get) => ({
    nodes: [],
    edges: [],
    mindMapId: "",
    stroke: '#000000',
    fontSize: '1rem',
    color: '#023047',
    background: '#4C5760',
    id: 0,

    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },

    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },

    onConnect: (connection: any) => {
        connection.style = {
            stroke: get().stroke,
            strokeWidth: 2
        }
        connection.animated = false
      set({
        edges: addEdge(connection, get().edges),
      });
    },

    updateSpecificNodeStyle: (nodeId:string, style: {color: string, fontSize: string, background: string}) => {
        set({
            nodes: get().nodes.map((node) => {
                if(node.id === nodeId){
                    node.data = {...node.data, style}
                    updateNode(node)
                }
                return node
            })
        })
    },

    updateGlobalFontSizeStyle: (fontSize: string) => {
        set({
            fontSize: fontSize + "px"
        })
    },

    updateGlobalColorStyle: (color: string) => {
        set({
            color: color
        })
    },

    updateGlobalStrokeStyle: (color: string) => {
        set({
            stroke: color
        })
    },

    updateGlobalBackgroundStyle: (color: string) => {
        set({
            background: color
        })
    },

    updateContentValue: (params: {value: string, nodeId: string}) => {
        set({
            nodes: get().nodes.map((node) => {
                if(node.id === params.nodeId) {
                    node.data.value = params.value
                    updateNode(node) 
                };
                return node;
            })
        })

    },
    
    onDrop: (event: any, reactFlowWrapper: MutableRefObject<HTMLDivElement>, reactFlowInstance: ReactFlowInstance) => {
        event.preventDefault();
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

        let type = event.dataTransfer.getData('application/reactflow');
        if(!type) type = 'mindMap'

        if(!reactFlowInstance) return;
        
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        
        const newNode = {
            id: `dndnode_${get().id}`,
            type,
            position, 
            data: {
                label: `${type} node ${get().id}`,
                style: {
                    color: get().color,
                    background: get().background,
                    fontSize: get().fontSize
                },
            }

        }

        createNode({
            label: `${type} node ${get().id}`,
            value: '',
            background:  get().background,
            color: get().color,
            fontSize: get().fontSize,
            xPos: position.x,
            yPos: position.y,
            type,
            mindMapId: get().mindMapId
        })
            // modifier l'id de la node apres create si c'est dndnode
        set({
            id: get().id + 1,
            nodes: [...get().nodes, newNode]
        })
    },

    onNodeDelete: (event: any) => {
        if(!event[0].id) return;
        deleteNode(event[0].id);
    }
  }));
  
  export default useMindmapStore;
