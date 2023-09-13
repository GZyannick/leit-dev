import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
const leitnerBox = () => {
    return (
        <div className="container pt-8"> 
            <h3 className="text-2xl">Leitner Box</h3>


            <div className="grid gap-8 grid-cols-5">
                <Card className="h-64 p-4">
                    <div className="flex items-center place-content-between mb-8"><p>each day</p> <span>edit</span></div>
                    <p className="mb-2">question 1</p>
                    <p className="mb-2">question 2</p>
                    <p className="mb-2">question 3</p>
                    <p className="mb-2">question 4</p>
                    <p>question 5</p>
                </Card>

                <Card className="h-64 p-2">
                    <div className="flex items-center place-content-between mb-8"><p>each 2 days</p> <span>edit</span></div>

                    <div>Card 2</div>
                </Card>
                <Card className="h-64 p-2">
                    <div className="flex items-center place-content-between mb-8"><p>each 4 days</p> <span>edit</span></div>
                    <div>Card 3</div>
                </Card>
                <Card className="h-64 p-2">
                    <div className="flex items-center place-content-between mb-8"><p>each 6 days</p> <span>edit</span></div>
                    <div>Card 4</div>
                </Card>
                <Card className="h-64 p-2">
                    <div className="flex items-center place-content-between mb-8"><p>each 8 days</p> <span>edit</span></div>
                    <div>Card 5</div>
                </Card>
            </div>
            
            <div className="mt-8">
                <Button className="mr-4">Daily question</Button>
                <Button>Create question</Button>

            </div>
        </div>
    );
}
 
export default leitnerBox;

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