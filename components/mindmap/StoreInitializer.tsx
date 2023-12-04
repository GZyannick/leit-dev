"use client";
import { useRef } from "react";
import useMindmapStore from "@/lib/store";
import { Node, Edge } from "reactflow";

const StoreInitializer = ({
  nodes,
  edges,
  mindMapId,
  mindMapName,
}: {
  nodes: Node[];
  edges: Edge[];
  mindMapId: string;
  mindMapName: string;
}) => {
  const initialized = useRef(false);
  if (!initialized.current) {
    useMindmapStore.setState({ nodes, edges, mindMapId, mindMapName });
    initialized.current = true;
  }
  return null;
};

export default StoreInitializer;
