"use client"
// regler le fait que ne l'on voit pas les nodes si je mets dans selector dbNodes
// ou le fait que dans le server component j'utilise useStore.setState

import { create } from 'zustand';

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

// import { initialNodes, initialEdges, globalStyle } from './initalData';
import { createWithEqualityFn } from 'zustand/traditional';
import { MutableRefObject} from 'react';

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
                if(node.id === nodeId) node.data = {...node.data, style}
                return node
            })
        })
    },

    updateGlobalFontSizeStyle: (color: string) => {
        set({
            fontSize: color
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
                if(node.id === params.nodeId) node.data.value = params.value;
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

        set({
            id: get().id + 1,
            nodes: [...get().nodes, newNode]
        })
    }
  }));
  
  export default useMindmapStore;




//   creer un meilleur store 
