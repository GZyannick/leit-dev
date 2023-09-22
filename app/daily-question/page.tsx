import { Card } from "@/components/ui/card"
import  GetQuestions from "@/components/daily/server/get-questions"
import  DailyQuestions from "@/components/daily/daily-questions"
const DailyPage = () => {


    return (
        <div className="container pt-8 h-full flex flex-col">
            <h1 className="text-2xl ">Daily question</h1>

            <div className="">
                    <GetQuestions />
                    {/* <DailyQuestions/> */}
            </div>
        </div>
    );
}
 
export default DailyPage;