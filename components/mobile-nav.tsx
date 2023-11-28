// import { Bot } from "lucide-react";

import { Separator } from "./ui/separator";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { NavItem } from "@/lib/types";

interface MobileMenuProps {
  items: NavItem[];
}

const MobileNav = ({ items }: MobileMenuProps) => {
  return (
    <div className="animate-in slide-in-from-bottom-80 fixed inset-0 top-16 z-50 p-2">
      <div className=" bg-popover rounded p-4 shadow ">
        <nav className="grid gap-2 ">
          {items.map((item, idx) => (
            <Link
              key={`moble-${idx}`}
              href={item?.path}
              className="text-popover-foreground text-m"
            >
              {item?.title}
            </Link>
          ))}
          <Separator orientation="horizontal" />
          <SignedIn>
            <Button>
              <SignInButton />
            </Button>
          </SignedIn>
          <SignedOut>
            <Button>
              <SignOutButton />
            </Button>
          </SignedOut>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
