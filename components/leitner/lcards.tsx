import { currentProfile } from "@/lib/current-profile";
import {db} from "@/lib/db"
import { redirect } from "next/navigation";


const Lcards = async ( props: {cbox: string}) => {
    const profile = currentProfile();
    if(!profile) return redirect("/")

    const lcards = await db.lcard.findMany({
        where: {
            profileId: profile.id,
            box: props.cbox,
        }
    })

    console.log(lcards)
    return ( 
        <li>
            {lcards.map( (card, i) => (
               <div key={`card-${i}`}>
                 <p>{card.question}</p>
                <p>{card.answer}</p>
               </div>
            ))}
        </li>
     );
}
 
export default Lcards;
