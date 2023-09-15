import { Card } from "@/components/ui/card"
import { Boxes  } from "@prisma/client";
import  Lcards  from "@/components/leitner/lcards";

export const LBoxes = () => {
    
    const boxes = Object.values(Boxes);

    return ( 
       <>
            {
                boxes.map((box) => (
                    <Card key={box} className="h-64 p-6">
                        <ul>
                            <Lcards cbox={box}></Lcards>
                        </ul>
                    </Card>
                ))
            }
       </>
     );
}
 
export default LBoxes;