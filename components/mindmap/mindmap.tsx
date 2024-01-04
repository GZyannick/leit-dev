"use client";
import {
  useState,
  useCallback,
  useRef,
  MutableRefObject,
  useEffect,
  useTransition,
} from "react";
import { shallow } from "zustand/shallow";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  ReactFlowInstance,
  ConnectionMode,
  NodeChange,
  getRectOfNodes,
} from "reactflow";
import useMindmapStore from "@/lib/new-store";
import {
  fitViewOptions,
  defaultEdgeOptions,
  nodeTypes,
  proOptions,
} from "@/lib/mindmapOptions";
import "reactflow/dist/style.css";

import ReactFlowMenu from "@/components/mindmap/reactFlowMenu";
import createThumbnail from "@/lib/createThumbnail";
import { useRouter } from "next/navigation";
const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  mindMapId: state.mindMapId,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onDrop: state.onDrop,
  setCurrentNodeId: state.setCurrentNodeId,
  updateData: state.updateData,
});

const Mindmap = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    mindMapId,
    setCurrentNodeId,
    updateData,
  } = useMindmapStore(selector, shallow);

  // THUMBNAIL PART
  let [isPending, startTransition] = useTransition();
  const nodesBounds = getRectOfNodes(nodes);
  // THUMBNAIL PART

  const router = useRouter();
  const reactFlowWrapper = useRef() as MutableRefObject<HTMLDivElement>;
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const handleLeave = (event: any) => {
    const routerNeedsChange = updateData();
    if (routerNeedsChange) {
      createThumbnail(
        reactFlowWrapper,
        mindMapId,
        nodesBounds,
        startTransition,
      );
      router.refresh();
    }
  };

  useEffect(() => {
    reactFlowWrapper.current?.addEventListener("mouseleave", handleLeave);
    reactFlowWrapper.current?.addEventListener("beforeunload", handleLeave);

    return () => {
      reactFlowWrapper.current?.removeEventListener("mouseleave", handleLeave);
      reactFlowWrapper.current?.addEventListener("beforeunload", handleLeave);
    };
  });

  //NodeModalState
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, height: 0, width: 0 });

  const onDragOver = useCallback((e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const nodeModalModifier = (e: any) => {
    if (!e.target.classList.contains("dnd-node")) return;
    const pos = e.target?.getBoundingClientRect();

    setPosition({
      x: pos.left,
      y: pos.top,
      height: pos.height,
      width: pos.width,
    });

    setIsOpen(true);
    setCurrentNodeId(e.target.id);
  };

  const handleOnNodeChange = (changes: NodeChange[]) => {
    const routerNeedsChange = onNodesChange(changes);
    if (routerNeedsChange) router.refresh();
  };

  return (
    <>
      <ReactFlowProvider>
        <div
          id="wrapper"
          className="reactflow-wrapper w-screen flex-1 bg-white"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={(changes) => handleOnNodeChange(changes)}
            onEdgesChange={onEdgesChange}
            fitView
            connectionMode={ConnectionMode.Loose}
            onConnect={onConnect}
            onNodeClick={(e) => nodeModalModifier(e)}
            onInit={setReactFlowInstance}
            onDrop={(event) =>
              onDrop(event, reactFlowWrapper, reactFlowInstance)
            }
            onDragOver={onDragOver}
            proOptions={proOptions}
            fitViewOptions={fitViewOptions}
            defaultEdgeOptions={defaultEdgeOptions}
            nodeTypes={nodeTypes}
            className="light:bg-white dark:bg-[#09090b]"
          >
            <Background />
            <Controls />
            <ReactFlowMenu isOpen={isOpen} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </>
  );
};

export default Mindmap;
