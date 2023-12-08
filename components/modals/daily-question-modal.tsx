"use client";
import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";

const DailyQuestionModal = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Daily Question</Button>
      </DialogTrigger>

      <DialogContent className="w-screen">
        <DialogHeader className=" pt-4"></DialogHeader>
        <DialogTitle className="text-[#4E4E4E]">Daily question</DialogTitle>
        <DialogDescription className="text-slate-500">
          respond to your personal question on a daily basis
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default DailyQuestionModal;
