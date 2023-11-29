import { Dispatch, SetStateAction } from "react";
import { Edge, Node, OnNodesChange, OnEdgesChange, OnConnect } from "reactflow";

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

export type LcardType = {
  id: String;
  question: String;
  answer: String;
  box: String;
  profileId: String;
  createdAt: Date;
  updatedAt: Date;
};

export type NodeModalType = {
  position: { x: number; y: number; height: number; width: number };
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  currentId: number | undefined;
};

export type BtnAndSortType = {
  sortingMethods: {
    name: string;
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
  }[];
  children: any;
};

export type MindmapType = {
  id: string;
  name: string;
  profileId: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  createdAt: Date;
  updatedAt: Date;
};
