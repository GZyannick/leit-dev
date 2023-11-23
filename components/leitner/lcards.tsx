import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialProfile } from "@/lib/initial-profile";

const Lcards = async (props: { box: string }) => {
  return (
    <li>
      {lcards.map((card, i) => (
        <div key={`card-${i}`}>
          <p>{card.question}</p>
          <p>{card.answer}</p>
        </div>
      ))}
    </li>
  );
};

export default Lcards;
