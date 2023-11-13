// "use client";
// // TODO CHANGE COLOR TO GENERAL DARK COLOR
// import Link from "next/link";
// import { useState } from "react";
// import { ModeToggle } from "./ui/mode-toggle";
// import { Monoton } from "next/font/google";

// const monoton = Monoton({ subsets: ["latin"], weight: ["400"] });

// const Navbar = () => {
//   const [state, setState] = useState(false);

//   const menus = [
//     { title: "Mindmap", path: "/mindmap" },
//     { title: "Daily question", path: "/daily-question" },
//     { title: "Leitner", path: "/leitner-box" },
//   ];

//   return (
//     <nav className="w-full px-6 md:px-10">
//       <div className="items-center justify-between md:flex">
//         <div className="flex items-center justify-between gap-6 py-3 md:block md:py-5">

//           <div className="md:hidden">
//             <button
//               className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
//               onClick={() => setState(!state)}
//             >
//               <Menu />
//             </button>
//           </div>
//         </div>
//         <div
//           className={`mt-8 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
//             state ? "block" : "hidden"
//           }`}
//         >
//           <ul className="items-center justify-center space-y-8 rounded-full px-8 py-3 md:flex md:space-x-6 md:space-y-0 md:border-2 md:border-[#2E2E32]	md:bg-[#242426] md:shadow-[-2px_-2px_4px_rgba(223,223,223,0.15)]">
//             {menus.map((item, idx) => (
//               <li
//                 key={idx}
//                 className={`text-[#D7D7D7] hover:text-indigo-600 ${
//                   idx === 1 ? "md:px-16" : ""
//                 }`}
//               >
//                 <Link href={item.path}>{item.title}</Link>
//               </li>
//             ))}
//             <li className="block md:hidden">
//               <ModeToggle />
//             </li>
//           </ul>
//         </div>

//         <div className="hidden md:block">
//           <ModeToggle />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import { useState } from "react";
import Link from "next/link";
import { Monoton } from "next/font/google";
import { ModeToggle } from "./ui/mode-toggle";
import { Menu } from "lucide-react";
import MobileNav from "@/components/mobile-nav";

const monoton = Monoton({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menus = [
    { title: "Mindmap", path: "/mindmap" },
    { title: "Daily question", path: "/daily-question" },
    { title: "Leitner", path: "/leitner-box" },
  ];

  return (
    <div className="container mx-auto flex items-center justify-between py-4">
      <div className="flex items-center space-x-8">
        <Link
          href="/"
          className="hover:text-foreground/80 text-foreground/60 text-3xl transition-colors"
        >
          <p className={monoton.className}>LD</p>
        </Link>

        <nav className="hidden space-x-4 md:flex md:space-x-6">
          {menus.map((menu, idx) => (
            <Link
              key={idx}
              href={menu.path}
              className="hover:text-foreground/80  text-foreground/60 text-lg font-medium transition-colors sm:text-sm"
            >
              {menu.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="hidden md:block">
        <ModeToggle />
      </div>
      <div className="block md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu />
        </button>
      </div>
      {isMenuOpen && <MobileNav items={menus} />}
    </div>
  );
};

export default Navbar;
