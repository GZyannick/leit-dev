import StoreInitializer from "@/components/mindmap/StoreInitializer";
import Mindmap from "@/components/mindmap/mindmap";
import { db } from "@/lib/db";
import { InitialProfile } from '@/lib/initial-profile';
import { redirect } from "next/navigation";
import { Node, Edge} from 'reactflow';


// ajouter Edge  deux Node en parent dans La base de donées
// Ajouter les modification avant de quitter ou dans l'arriere du site sans reload plus

const getMindMap = async (id: string, profileId: string) => {
    const res = await db.mindMap.findUnique({
        where: {
            profileId,
            id,
        },

        include: {
            nodes: true,
        }
    })
    return res
}

const dataToReactFLow = (nodes: any) => {
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
    })
}




const MindMapPage = async ({params}: {params: {id: string}}) => {
    const profile = InitialProfile()
    if(!profile && params.id ) redirect('/mindmap')

    const currentMndMap = await getMindMap(params.id, profile.id);
    const mindMapNodes = currentMndMap ? currentMndMap.nodes : []
    const dbNodes: Node[] = dataToReactFLow(mindMapNodes)

    return ( 
        <div className='flex'>
            <StoreInitializer nodes={dbNodes} edges={[]} mindMapId={params.id}/>
            <Mindmap/>
        </div>
     );
}
export default MindMapPage