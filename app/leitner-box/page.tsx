import Link from "next/link";
import { Boxes } from "@prisma/client";

//ui
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BtnAndSort from "@/components/general/btn-and-sort";

// personal method
import InitialLeitnerForm from "@/components/modals/initial-Leitner-Form";
import Lcards from "@/components/leitner/lcards";

const LeitnerPage = () => {
  const boxes = Object.keys(Boxes);
  return (
    <div className="mx-auto mt-10 grid gap-6 md:container">
      <BtnAndSort
        sort={["Last added", "box"]}
        btn={["Daily question", "New Card"]}
      />
      <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
        {boxes.map((box) => (
          <Card key={box} className="h-64 p-6">
            <ul>
              <Lcards box={box} />
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Link href={"/daily-question"}>
          <Button className="mr-4">Daily question</Button>
        </Link>
        <InitialLeitnerForm />
      </div>
    </div>
  );
};

export default LeitnerPage;

// <Card className="h-64 p-4">
// <div className="flex items-center place-content-between mb-8"><p>each day</p> <span>edit</span></div>
// <p className="mb-2">question 1</p>
// <p className="mb-2">question 2</p>
// <p className="mb-2">question 3</p>
// <p className="mb-2">question 4</p>
// <p>question 5</p>
// </Card>

/*
 * donc une leitner box est comme un array a 2 dimension
 * chaque array constitue une box
 * est on a plusieurs question dans une box
 */

/** ex: https://www.motive-toi.com/outils-pratiques/la-methode-leitner-pour-un-apprentissage-efficace-presque-sans-effort/
 * [
 *  [q1, q3, q6, q2], each days`
 *  [q14, q4, q7, q8], 2 days
 *  [.....], 4 days
 *  [..........], 6 days
 *  [.......], 8 days if true wp you learn it
 * ]
 * if response = true change to next box
 * else if response = false change to previous box
 */

/*
 * il faudrait cheque les jours entre les box pour savoir si
 * je dois les mettre dans les question du jours
 */

/*
 * creer un onglet appris avec les question/response
 * pour montrer tout ce que l'on a appris
 */

/**
 * calculer le nb de jours entre chaque question
 * avec le numero de la box est le updated at
 */
