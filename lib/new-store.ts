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

import {
  GetMindmapNodeAndEdge,
  CreateMany,
  UpdateMany,
  DeleteMany,
} from "@/app/mindmap/[id]/actions";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  toCreateNodes: Node[];
  toUpdateNodes: Node[];
  toDeleteNodes: Node[];
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
  addToCrudArrays: (changes: NodeChange[]) => void;
};

import { createWithEqualityFn } from "zustand/traditional";
import { MutableRefObject } from "react";

const useMindmapStore = createWithEqualityFn<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  toCreateNodes: [],
  toUpdateNodes: [],
  toDeleteNodes: [],
  mindMapId: "",
  mindMapName: "",
  currentNodeId: "",
  stroke: "#000000",
  fontSize: "1rem",
  color: "#023047",
  background: "#4C5760",
  id: 0,
  // Possible erreur de code avec le Buffer sur la position des node
  positionBuffer: { x: 0, y: 0 },

  // add in 3 array toCreate toUpdate toDelete to track each node and add it to backend
  addToCrudArrays: (changes: NodeChange[]) => {
    const isFoundInToCreate = get().toCreateNodes.some((node) =>
      node.id === changes[0].id ? true : false,
    );
    const isFoundInToUpdate = get().toUpdateNodes.some((node) =>
      node.id === changes[0].id ? true : false,
    );

    if (changes[0].type === "remove") {
      if (isFoundInToCreate) {
        const toFilter = [...get().toCreateNodes];
        const FilteredToCreateNodes = toFilter.filter(
          (node) => node.id !== changes[0].id,
        );
        set({
          toCreateNodes: [...FilteredToCreateNodes],
        });
      } else if (isFoundInToUpdate) {
        const toFilter = [...get().toUpdateNodes];
        const removedValue = toFilter.find((node) => node.id === changes[0].id);
        const FilteredToUpdateNodes = toFilter.filter(
          (node) => node.id !== changes[0].id,
        );
        if (!removedValue) return;
        set({
          toUpdateNodes: [...FilteredToUpdateNodes],
          toDeleteNodes: [...get().toDeleteNodes, removedValue],
        });
      }
    }

    if (isFoundInToCreate) {
      set({
        toCreateNodes: applyNodeChanges(changes, get().toCreateNodes),
      });
    } else if (isFoundInToUpdate) {
      set({
        toUpdateNodes: applyNodeChanges(changes, get().toUpdateNodes),
      });
    } else if (isFoundInToCreate === false && isFoundInToUpdate === false) {
      const currentNodeToUpdate = get().nodes.find(
        (node) => node.id === changes[0].id,
      );

      if (!currentNodeToUpdate) return;
      set({
        toUpdateNodes: [...get().toUpdateNodes, currentNodeToUpdate],
      });
    }
  },

  onNodesChange: (changes: NodeChange[]) => {
    if (changes[0].dragging === true) {
      set({
        positionBuffer: changes[0].position,
      });
    }

    get().addToCrudArrays(changes);

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

  //onDrop allow to create new Node
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
      id: `node-${get().id}`,
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
      id: get().id + 1,
      nodes: [...get().nodes, newNode],
      // _______ NEW METHOD _______ //
      toCreateNodes: [...get().toCreateNodes, newNode],
      // _______ NEW METHOD _______ //
    });
  },

  // onConnect allow to create Edge
  onConnect: async (connection: any) => {
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

  updateGlobalStyle: (value: string, type: string) => {
    switch (type) {
      case "fs":
        set({ fontSize: value + "px" });
        break;
      case "text":
        set({ color: value });
        break;
      case "bg":
        set({ background: value });
        break;
      case "stroke":
        set({ stroke: value });
    }
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

  updateMindmapName: (event: string) => {
    if (get().mindMapName === event) return;
    set({
      mindMapName: event,
    });
  },

  updateData: async () => {
    const toUpdate = get().toUpdateNodes;
    const toCreate = get().toCreateNodes;
    const toDelete = get().toDeleteNodes;
    const mindMapId = get().mindMapId;
    if (toUpdate.length === 0 && toCreate.length === 0 && toDelete.length === 0)
      return false;

    if (toCreate.length > 0) await CreateMany(toCreate, mindMapId);
    if (toUpdate.length > 0) await UpdateMany(toUpdate, mindMapId);
    if (toDelete.length > 0) await DeleteMany(toDelete, mindMapId);
    set({
      toCreateNodes: [],
      toUpdateNodes: [],
      toDeleteNodes: [],
    });

    return true;
  },
}));

export default useMindmapStore;
