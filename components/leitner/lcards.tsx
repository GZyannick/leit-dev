
import {db} from "@/lib/db"
import { redirect } from "next/navigation";
import { InitialProfile } from "@/lib/initial-profile";

const Lcards = async ( props: {box: string}) => {

    const profile = InitialProfile();
    if(!profile) return redirect("/");

    const lcards = await db.lcard.findMany({
        where: {
            profileId: profile.id,
            box: props.box,
        }
    });
 return (
    <li> {/* peut etre un composant plus tard */}
        {lcards.map( (card, i) => (
        <div key={`card-${i}`}>
            <p>{card.question}</p>
            <p>{card.answer}</p>
        </div>
        ))}
    </li>
 )
}
 
export default Lcards;
