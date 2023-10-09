import { create } from 'zustand';

import ReactFlow, {
    Connection,
    applyEdgeChanges,
    applyNodeChanges,
    Edge,
    Node, 
    OnConnect, 
    OnEdgesChange, 
    OnNodesChange,
    addEdge,
    ReactFlowProvider,
    ReactFlowInstance,
    ConnectionMode,
    NodeChange,
    EdgeChange,
    ReactFlowRefType,
    OnInit,
} from 'reactflow';

// import { initialNodes, initialEdges, globalStyle } from './initalData';
import { createWithEqualityFn } from 'zustand/traditional';
import { MutableRefObject, Ref, useRef } from 'react';

type RFState = {
    nodes: Node[],
    edges: Edge[],
    stroke: string,
    color: string,
    fontSize: string,
    id: number,
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
}

const useStore = createWithEqualityFn<RFState>((set, get) => ({
    nodes: [],
    edges: [],
    stroke: '#fefae0',
    fontSize: '1rem',
    color: '#023047',
    id: 0,

    // getEdge: ()

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

    updateSpecificNodeStyle: (nodeId:string, style: {color: string, fontSize: string, stroke: string}) => {
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
    
    onDrop: (event: any, reactFlowWrapper: MutableRefObject<HTMLDivElement>, reactFlowInstance: ReactFlowInstance) => {
        event.preventDefault();
        console.log(event, reactFlowWrapper, reactFlowInstance)

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
                    stroke: get().stroke,
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
  
  export default useStore;




//   creer un meilleur store 
