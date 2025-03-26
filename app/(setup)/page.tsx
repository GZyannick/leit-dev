import { Button } from "@/components/ui/button";
import Image from "next/image";
import FirstImg from "../mindmap.avif";
import LandingImage from "../reminder-note-1-27.svg";
import Card from "@/components/general/card";
import MultiboxIcon from "../multibox.png";
import MindMapIcon from "../mindmap-icon.png";
import LeitnerIcon from "../leitner-icon.png";

const SetupPage = async () => {
  return (
    <div className="mx-auto flex flex-col ">
      <section className="relative w-screen h-[100vh] flex justify-center items-center bg-[hsl(var(--secondary))]">
        <div className="flex items-center flex-col">
          <h1 className="text-5xl font-bold max-w-2xl text-center pb-4 text-[hsl(var(--text))]">
            Unlock Your Mind's Potential
          </h1>
          <p className="text-2xl max-w-2xl text-center py-8">
            Elevate Your Learning Experience: Harness the Power of Mind Maps and
            Leitner Method for Unmatched Cognitive Growth.
          </p>
          <Button className=" p-6">Start Today</Button>
        </div>
        <Image
          src={LandingImage}
          alt="a men who take some note"
          className="hidden lg:block"
        />
      </section>

      <section className="relative  py-16 flex justify-center ">
        <div className="flex items-center flex-col">
          <h1 className="text-5xl font-bold max-w-3xl text-center pt-12 pb-8 text-[hsl(var(--text))]">
            Streamline Studies for Success
          </h1>
          <p className="text-xl max-w-3xl text-center ">
            Optimize your learning experience with our advanced mind mapping and
            Leitner system, designed for efficient study and success.
          </p>
          <div className="flex flex-row items-start">
            <Card
              name="Interactive Mind Mapping Tool"
              desc="Create and organize ideas effortlessly using our dynamic mind mapping interface."
              icon={MultiboxIcon}
            />
            <Card
              name="Leitner Method Integration"
              desc="Enhance your learning with our seamless integration of the Leitner method. This feature helps you retain information efficiently by using a time-tested spaced repetition technique."
              icon={MindMapIcon}
            />
            <Card
              name="Custom Mind Maps Creation"
              desc="We help you design mind maps tailored to your needs. Whether for study or project planning, our user-friendly tool offers a vintage look with easy navigation."
              icon={LeitnerIcon}
            />
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center gap-6 p-16 bg-orange-50">
        <div className="grid max-w-full justify-center cursor-pointer  inline-edit-dark">
          <h2
            className=" font-bold text-3xl"
            style={{ color: "rgb(17, 24, 39)", width: "94.0833px" }}
          >
            leit.dev
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-12 lg:gap-14 bg-orange-50">
        <p className="!text-center body-normal lg:text-right whitespace-nowrap pb-4">
          <span>Made by GZyannick</span>
        </p>
      </div>
    </div>
  );
};
export default SetupPage;

// <div className="mx-auto flex flex-col justify-center md:w-10/12 md:px-8">
//       <div className="bg-orange-50 rounded-lg">
//         <div className="flex justify-center items-center">
//           <div className="flex flex-col justify-between">
//             <h1 className="text-5xl font-bold max-w-lg p-8">
//               Unlock Your Mind's Potential
//             </h1>
//             <p className="max-w-lg px-8 py-4">
//               Explore strategies with our advanced Mnd Mapping and Leitner
//               System. Enhance learning efficiency right from Bordeaux's leading
//               experts in cognitive development.
//             </p>
//             <Button className="w-32 mx-8 mt-4 mb-8">Start Today</Button>
//           </div>
//           <Image
//             src={FirstImg}
//             alt="Mindset image."
//             style={{
//               borderRadius: "0.5rem",
//               width: "32rem",
//               height: "32rem",
//               margin: "1rem",
//             }}
//             className="rounded-sm shadow-sm"
//           />{" "}
//         </div>
//       </div>

//       <div className="pt-16">
//         <div className="flex justify-center items-center">
//           <Image
//             src={Mindset}
//             alt="Mindset image."
//             style={{
//               borderRadius: "0.5rem",
//               width: "32rem",
//               height: "32rem",
//               margin: "1rem",
//             }}
//             className="rounded-sm shadow-sm"
//           />

//           <div className="flex flex-col justify-between">
//             <h1 className="text-5xl font-bold max-w-xl p-8">
//               Innovative Solution to retain Information
//             </h1>
//             <p className="max-w-lg px-8 py-4">
//               At leit.dev, we're passionate about transforming the way you learn
//               and organize your thoughts. Based in France, our innovative
//               platform combines the power of mind mapping with the renowned
//               Leitner method to enhance your memory retention and boost
//               productivity. Whether you're a student, professional, or lifelong
//               learner, leit.dev provides a dynamic tool to visualize your ideas
//               and streamline your study process. Join us in unlocking the full
//               potential of your mind with our user-friendly interface and
//               tailored learning experiences.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-orange-50 rounded-lg pt-16">
//         <div className="flex justify-center items-center">
//           <div className="flex flex-col justify-between">
//             <h1 className="text-5xl font-bold max-w-lg p-8">
//               Unlock Your Mind's Potential
//             </h1>
//             <p className="max-w-lg px-8 py-4">
//               Explore strategies with our advanced Mnd Mapping and Leitner
//               System. Enhance learning efficiency right from Bordeaux's leading
//               experts in cognitive development.
//             </p>
//             <Button className="w-32 mx-8 mt-4 mb-8">Start Today</Button>
//           </div>
//           <Image
//             src={FirstImg}
//             alt="Mindset image."
//             style={{
//               borderRadius: "0.5rem",
//               width: "32rem",
//               height: "32rem",
//               margin: "1rem",
//             }}
//             className="rounded-sm shadow-sm"
//           />{" "}
//         </div>
//       </div>
//     </div>
