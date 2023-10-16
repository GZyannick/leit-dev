"use client"

import { useState, useCallback, useRef, MutableRefObject } from 'react';
import { shallow } from 'zustand/shallow';

import ReactFlow, {
    Background,
    Controls,
    Edge,
    Node, 
    ReactFlowProvider,
    ReactFlowInstance,
    ConnectionMode,
} from 'reactflow';


import useMindmapStore from '@/lib/store';
import { fitViewOptions, defaultEdgeOptions, nodeTypes, proOptions, globalStyle } from '@/lib/mindmapOptions';

import 'reactflow/dist/style.css';
import NodeModal from '@/components/mindmap/modals/nodeModal';
import Sidebar from '@/components/mindmap/sidebar';
import useKeyboardShortcut from '@/lib/hooks/useKeyboardShortcut';
import { SaveMindmap } from "@/app/mindmap/[id]/actions";


const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    mindMapId: state.mindMapId,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onDrop: state.onDrop,
    onNodeDelete: state.onNodeDelete,
  });

const Mindmap = () => {

    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onNodeDelete} = useMindmapStore(selector, shallow);
    const reactFlowWrapper = useRef() as MutableRefObject<HTMLDivElement>;
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
    
    //NodeModalState
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({x: 0, y:0, height: 0, width: 0})
    const [currentId, setCurrentId] = useState()


    // Save on CMD + S 
    // useKeyboardShortcut(() => SaveMindmap({mindmapId: mindMapId, nodes: nodes, edges: edges }))


    const onDragOver = useCallback((e: any) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }, []);

    const nodeModalModifier = (e: any) => {
        if(!e.target.classList.contains('dnd-node')) return
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
        <>
            <ReactFlowProvider>
                <Sidebar/>
                <div className="reactflow-wrapper w-screen h-screen bg-white" ref={reactFlowWrapper}>
                      <ReactFlow 
                          nodes={nodes}
                          edges={edges}
                          onNodesChange={(changes) => onNodesChange(changes)}
                          onEdgesChange={onEdgesChange}
                          fitView
                          connectionMode={ConnectionMode.Loose}
                          onConnect={onConnect}
                          onNodeClick={(e) => nodeModalModifier(e)}
                          onInit={setReactFlowInstance}
                          onDrop={(event) => onDrop(event, reactFlowWrapper, reactFlowInstance)}
                          onNodesDelete={onNodeDelete}
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
        </>
     );
}
 
export default Mindmap;



