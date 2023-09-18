import { Card } from "@/components/ui/card"
import  GetQuestions from "@/components/daily/get-questions"
const DailyPage = () => {

    /*
        je dois check chaque box est calculer le temps entre chacune pour les recuperer
    */
    

    return (
        <div className="container pt-8 h-full flex flex-col">
            <h1 className="text-2xl ">Daily question</h1>

            <div className="">
                    <GetQuestions/>
            </div>
        </div>
    );
}
 
export default DailyPage;