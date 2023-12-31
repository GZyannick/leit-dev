"use client";

// enregistrer le changement de position des nodes

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
  Background,
} from "reactflow";

import { RFState } from "@/lib/types";

import { createWithEqualityFn } from "zustand/traditional";
import { MutableRefObject } from "react";
import {
  createNode,
  updateNode,
  deleteNode,
  createEdge,
  deleteEdge,
  updateNodePosition,
  updateMindMapName,
} from "@/app/mindmap/[id]/actions";

const useMindmapStore = createWithEqualityFn<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  mindMapId: "",
  mindMapName: "",
  currentNodeId: "",
  stroke: "#000000",
  fontSize: "1rem",
  color: "#023047",
  background: "#4C5760",
  id: 0,
  positionBuffer: { x: 0, y: 0 },

  onNodesChange: (changes: NodeChange[]) => {
    let routerChange = false; // to know if i need to use router.refresh()
    if (changes[0].dragging === true) {
      set({
        positionBuffer: changes[0].position,
      });
    } else if (changes[0].dragging === false) {
      updateNodePosition(changes[0].id, get().positionBuffer);
      routerChange = true;
    }

    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });

    return routerChange;
  },

  setCurrentNodeId: (id: string) => {
    if (!id) return;
    set({
      currentNodeId: id,
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: async (connection: any) => {
    connection.style = {
      stroke: get().stroke,
      strokeWidth: 2,
    };

    const id = await createEdge({
      source: connection.source,
      sourceHandle: connection.sourceHandle,
      target: connection.target,
      targetHandle: connection.targetHandle,
      color: get().stroke,
      mindMapId: get().mindMapId,
    });
    connection.id = id;
    // donner l'id avait await tu connais
    connection.animated = false;
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  updateSpecificNodeStyle: (value: string, type: string) => {
    const nodeId = get().currentNodeId;
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            style: {
              color: type === "text" ? value : node.data.style.color,
              fontSize: type === "fs" ? value + "px" : node.data.style.fontSize,
              background: type === "bg" ? value : node.data.style.background,
            },
          };
          // trouver un moyen update la node apres avoir fini de changer lombre
          // updateNode(node);
        }
        return node;
      }),
    });
  },

  updateGlobalFontSizeStyle: (fontSize: string) => {
    set({
      fontSize: fontSize + "px",
    });
  },

  updateGlobalColorStyle: (color: string) => {
    set({
      color: color,
    });
  },

  updateGlobalStrokeStyle: (color: string) => {
    set({
      stroke: color,
    });
  },

  updateGlobalBackgroundStyle: (color: string) => {
    set({
      background: color,
    });
  },

  updateContentValue: (params: { value: string; nodeId: string }) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === params.nodeId) {
          node.data.value = params.value;
          updateNode(node);
        }
        return node;
      }),
    });
  },

  onDrop: async (
    event: any,
    reactFlowWrapper: MutableRefObject<HTMLDivElement>,
    reactFlowInstance: ReactFlowInstance,
  ) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    let type = event.dataTransfer.getData("application/reactflow");
    if (!type) type = "mindMap";

    if (!reactFlowInstance) return;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const id = await createNode({
      label: `${type} node ${get().id}`,
      value: "",
      background: get().background,
      color: get().color,
      fontSize: get().fontSize,
      xPos: position.x,
      yPos: position.y,
      type,
      mindMapId: get().mindMapId,
    });

    const newNode = {
      id: id,
      type,
      position,
      data: {
        label: `${type} node ${get().id}`,
        style: {
          color: get().color,
          background: get().background,
          fontSize: get().fontSize,
        },
      },
    };
    // modifier l'id de la node apres create si c'est dndnode
    set({
      id: get().id + 1,
      nodes: [...get().nodes, newNode],
    });
  },

  onNodeDelete: (event: any) => {
    if (!event[0].id) return;
    deleteNode(event[0].id);
  },

  onEdgeDelete: (event: any) => {
    if (!event[0].id) return;
    deleteEdge(event[0].id);
  },

  updateMindmapName: (event: string) => {
    if (get().mindMapName === event) return;

    set({
      mindMapName: event,
    });

    updateMindMapName(get().mindMapId, event);
  },
}));

export default useMindmapStore;
