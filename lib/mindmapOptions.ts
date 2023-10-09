import { CustomNodeType, BackgroundNode, MindMapNode } from "@/components/mindmap/nodes/customNodes"

import {
    FitViewOptions,
    NodeTypes,
    DefaultEdgeOptions,
} from 'reactflow';

export const globalStyle = {
    stroke: 'red',
    strokeWidth: 2,
    color: '#222',
    fontSize: '16px',
}

export const fitViewOptions: FitViewOptions = { padding: 5 };
export const defaultEdgeOptions: DefaultEdgeOptions = { animated: true};
export const proOptions = {hideAttribution: true}

export const nodeTypes: NodeTypes = {
    mindMap: MindMapNode,
    background: BackgroundNode,
} 
