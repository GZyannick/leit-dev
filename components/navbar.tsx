"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Monoton } from "next/font/google";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ModeToggle } from "./ui/mode-toggle";
import { Menu } from "lucide-react";
import MobileNav from "@/components/mobile-nav";
const monoton = Monoton({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menus = [
    { title: "Mindmap", path: "/mindmap" },
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
      <div className="hidden items-center gap-6 md:flex">
        <ModeToggle />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
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
