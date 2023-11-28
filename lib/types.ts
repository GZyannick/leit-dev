export type NodeType = {
  label: string;
  value: string;
  background: string;
  color: string;
  fontSize: string;
  xPos: number;
  yPos: number;
  type: string;
};

export type CreateNodeType = NodeType & {
  mindMapId: string;
};

export type CreateEdgeType = {
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  color: string;
  mindMapId: string;
};

export type Props = {
  questions: {
    id: string;
    question: string;
    answer: string;
    box: string;
  }[];
};

import { Edge, Node, OnNodesChange, OnEdgesChange, OnConnect } from "reactflow";
export type RFState = {
  nodes: Node[];
  edges: Edge[];
  stroke: string;
  background: string;
  mindMapId: string;
  color: string;
  fontSize: string;
  id: number;
  positionBuffer: { x: number; y: number };
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateContentValue: (params: { value: string; nodeId: string }) => void;
  onNodeDelete: (event: any) => void;
  onEdgeDelete: (event: any) => void;
};

export type NavItem = {
  title: string;
  path: string;
};

export type NodeData = {
  value: string;
  isConnectable: any;
  style: {
    color: string;
    background: string;
    fontSize: string;
  };
};

export type CustomNodeType = Node<NodeData>;
