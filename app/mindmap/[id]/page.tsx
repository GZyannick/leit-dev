import StoreInitializer from "@/components/mindmap/StoreInitializer";
import Mindmap from "@/components/mindmap/mindmap";
import { db } from "@/lib/db";
import { InitialProfile } from '@/lib/initial-profile';
import { redirect } from "next/navigation";
import { Node, Edge} from 'reactflow';
import { getEdge, newGetMindMap } from "./actions";


// Ajouter les modification avant de quitter ou dans l'arriere du site sans reload plus

// const dataToReactFLow = (nodes: any) => {
//     const reactflowNode = []
//     const reactflowEdge = []
//     return nodes.map((node: any) => {


//     return [reactflowNode, reactflowEdge];
// }







// transform database nodes and edges to two different object for reactflow
const dataToReactflowNode = (nodes: any) => {
    return nodes.map((node: any) => {
        return {
            id: node.id,
            type: node.type,
            position: {x: node.xPos, y: node.yPos},
            data: {
                label: node.label,
                value: node.value,
                style: {
                    background: node.background,
                    color: node.color,
                    fontSize: node.fontSize,
                }
            },
            width: 109,
        }
    });
}


// export const initialEdges: Edge[] = [
//     {id: '1-2', source: '1', target: '2', label:' to ', animated: false, type: 'label', style: globalStyle},
//     {id: '3-2', source: '2', sourceHandle: "a", animated: false, target: '3', style: globalStyle}
// ];

const dataToReactflowEdge = (edges: any) => {
    return edges.map((edge: any) => {
        return {
            id: edge.id,
            source: edge.nodes[0].nodeId,
            sourceHandle: edge.nodes[0].handle,
            target: edge.nodes[1].nodeId,
            targetHandle: edge.nodes[1].handle,
            animated: false,
            style: {
                stroke: edge.color,
                strokeWidth: 2,
            }
        }
    });

}


const MindMapPage = async ({params}: {params: {id: string}}) => {
    const profile = InitialProfile()
    if(!profile && params.id ) redirect('/mindmap')
    
    const currentMindMap = await newGetMindMap(params.id, profile.id)
    const mindMapNodes = currentMindMap ? currentMindMap.nodes : []
    const reactflowNode: Node[] = dataToReactflowNode(mindMapNodes)
    const reactflowEdge: any = dataToReactflowEdge( await getEdge(params.id))
    return ( 
        <div className='flex'>
            <StoreInitializer nodes={reactflowNode} edges={reactflowEdge} mindMapId={params.id}/>
            <Mindmap/>
        </div>
     );
}
export default MindMapPage