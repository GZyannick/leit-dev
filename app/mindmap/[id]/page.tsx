"use client"
import { useState, useCallback, useRef, MutableRefObject } from 'react';
import { shallow } from 'zustand/shallow';
import useStore from '@/lib/store';

import ReactFlow, {
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    Edge,
    Node, 
    OnConnect, 
    OnEdgesChange, 
    OnNodesChange,
    addEdge,
    ReactFlowProvider,
    ReactFlowInstance,
    ConnectionMode,
} from 'reactflow';
import { fitViewOptions, defaultEdgeOptions, nodeTypes, proOptions, globalStyle } from '@/lib/mindmapOptions';

import 'reactflow/dist/style.css';
import NodeModal from '@/components/mindmap/modals/nodeModal';
import Sidebar from '@/components/mindmap/sidebar';

const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    stroke: state.stroke,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onDrop: state.onDrop,
  });

const MindMapPage = () => {

    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop } = useStore(selector, shallow);
    const reactFlowWrapper = useRef() as MutableRefObject<HTMLDivElement>;
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

    const [stroke, setStroke] = useState(globalStyle.stroke)
    const [color, setColor] = useState(globalStyle.color)
    const [fontSize, setFontSize] = useState(globalStyle.fontSize)
    //NodeModalState
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({x: 0, y:0, height: 0, width: 0})
    const [currentId, setCurrentId] = useState()

    const onDragOver = useCallback((e: any) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }, []);
    const nodeModalModifier = (e: any) => {
        if(!e.target.classList.contains('dnd-node')) return
        console.log(e.target.id)
        const pos = e.target?.getBoundingClientRect();
        
        setPosition({
          x: pos.left,
          y: pos.top,
          height: pos.height,
          width: pos.width
        });
  
        setIsOpen(true);
        setCurrentId(e.target.id)
    }

    return ( 
        <div className='flex'>
            <ReactFlowProvider>
                <Sidebar/>
                <div className="reactflow-wrapper w-screen h-screen bg-white" ref={reactFlowWrapper}>
                      <ReactFlow 
                          nodes={nodes}
                          edges={edges}
                          onNodesChange={onNodesChange}
                          onEdgesChange={onEdgesChange}
                          fitView
                          connectionMode={ConnectionMode.Loose}
                          onConnect={onConnect}
                          onNodeClick={(e) => nodeModalModifier(e)}
                          onInit={setReactFlowInstance}
                          onDrop={(event) => onDrop(event, reactFlowWrapper, reactFlowInstance)}
                          onDragOver={onDragOver}
                          proOptions={proOptions}
                          fitViewOptions={fitViewOptions}
                          defaultEdgeOptions={defaultEdgeOptions}
                          nodeTypes={nodeTypes}
                      >
                          <Background/>
                          <Controls/>
                          <NodeModal isOpen={isOpen} position={position} setIsOpen={setIsOpen} currentId={currentId}/>
                      </ReactFlow>
                  </div>
            </ReactFlowProvider>
        </div>
     );
}
export default MindMapPage