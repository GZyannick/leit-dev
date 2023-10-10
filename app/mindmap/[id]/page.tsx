import StoreInitializer from "@/components/mindmap/StoreInitializer";
import Mindmap from "@/components/mindmap/mindmap";
import { db } from "@/lib/db";
import { InitialProfile } from '@/lib/initial-profile';
import { redirect } from "next/navigation";
import { Node, Edge} from 'reactflow';






// ajouter une coleur pour l'edge tout seul non Stroke qui appartient aux bg
// ajouter Edge dans La base de donées

// Ajouter les modification avant de quitter ou dans l'arriere du site sans reload plus




const MindMapPage = async ({params}: {params: {id: string}}) => {
    const profile = InitialProfile()
    if(!profile) redirect('/mindmap')

    const currentMndMap = await db.mindMap.findUnique({
        where: {
            profileId: profile.id,
            id: params.id
        },

        include: {
            nodes: true,
        }
    })

    const mindMapNodes = currentMndMap ? currentMndMap.nodes : []

    const dbNodes: Node[] = mindMapNodes.map((node: any) => {
        return {
            id: node.id,
            type: node.type,
            position: {x: node.xPos, y: node.yPos},
            data: {
                label: node.label,
                value: node.value,
                style: {
                    stroke: node.stroke,
                    color: node.color,
                    fontSize: node.fontSize,
                }
            },
            width: 109,
        }
    })

    return ( 
        <div className='flex'>
            <StoreInitializer nodes={dbNodes} edges={[]}/>
            <Mindmap/>
        </div>
     );
}
export default MindMapPage