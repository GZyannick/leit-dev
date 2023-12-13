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

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  stroke: string;
  background: string;
  mindMapId: string;
  currentNodeId: string;
  mindMapName: string;
  color: string;
  fontSize: string;
  id: number;
  positionBuffer: { x: number; y: number };
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateContentValue: (params: { value: string; nodeId: string }) => void;
  updateMindmapName: (event: string) => void;
};

import { createWithEqualityFn } from "zustand/traditional";
import { MutableRefObject } from "react";

import { randomUUID } from "crypto";

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
    if (changes[0].dragging === true) {
      set({
        positionBuffer: changes[0].position,
      });
    }
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
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
    connection.id = randomUUID();
    connection.animated = false;
    connection.style = {
      stroke: get().stroke,
      strokeWidth: 2,
    };
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
        }
        return node;
      }),
    });
  },

  onDrop: (
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

    const newNode = {
      id: randomUUID(),
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
    set({
      nodes: [...get().nodes, newNode],
    });
  },

  updateMindmapName: (event: string) => {
    if (get().mindMapName === event) return;
    set({
      mindMapName: event,
    });
  },
}));

export default useMindmapStore;

// Mindmap Name
// Node
// Edge

// Check if Node or Edge still exist in front//
// check if node or edge Style / value still the same
