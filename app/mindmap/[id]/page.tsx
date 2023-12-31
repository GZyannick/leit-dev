import StoreInitializer from "@/components/mindmap/StoreInitializer";
import Mindmap from "@/components/mindmap/mindmap";
import { db } from "@/lib/db";
import { InitialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { Node, Edge } from "reactflow";
import { getEdge, GetMindMap } from "./actions";
// import takeThumbnail from "@/lib/take-thumbnail";
// transform database nodes and edges to two different object for reactflow
const dataToReactflowNode = (nodes: any) => {
  return nodes.map((node: any) => {
    return {
      id: node.id,
      type: node.type,
      position: { x: node.xPos, y: node.yPos },
      data: {
        label: node.label,
        value: node.value,
        style: {
          background: node.background,
          color: node.color,
          fontSize: node.fontSize,
        },
      },
      width: 109,
    };
  });
};

const dataToReactflowEdge = (edges: any) => {
  return edges.map((edge: any) => {
    return {
      id: edge.id,
      source: edge.nodes[0]?.nodeId,
      sourceHandle: edge.nodes[0]?.handle,
      target: edge.nodes[1]?.nodeId,
      targetHandle: edge.nodes[1]?.handle,
      animated: false,
      style: {
        stroke: edge.color,
        strokeWidth: 2,
      },
    };
  });
};

const MindMapPage = async ({ params }: { params: { id: string } }) => {
  const profile = InitialProfile();
  if (!profile && params.id) redirect("/mindmap");

  // ive make res.props to revalidate each 10s the data or the position update wont be taken when user leave and came back
  const currentMindMap = await GetMindMap(params.id, profile.id);
  const mindMapNodes = currentMindMap ? currentMindMap.nodes : [];
  const reactflowNode: Node[] = dataToReactflowNode(mindMapNodes);
  const reactflowEdge: Edge[] = dataToReactflowEdge(await getEdge(params.id));

  return (
    <div className="flex h-full flex-1">
      <StoreInitializer
        nodes={reactflowNode}
        edges={reactflowEdge}
        mindMapId={params.id}
        mindMapName={currentMindMap ? currentMindMap.name : ""}
      />
      <Mindmap />
    </div>
  );
};
export default MindMapPage;
