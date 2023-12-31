"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const formSchema = z.object({
  question: z.string().min(1, {
    message: "Please enter a question.",
  }),
  answer: z.string().min(1, {
    message: "Please enter a answer.",
  }),
});

const InitialLeitnerForm = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("api/lcard", values);

      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {}
  };

  if (!isMounted) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Memory Card</Button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden p-0 text-[#424242]">
        <DialogHeader className="px-6 pt-8"></DialogHeader>
        <DialogTitle className="text-center text-2xl">
          create your memory card
        </DialogTitle>
        <DialogDescription className="text-center text-slate-500">
          make youre own question and answer to make you learn better
        </DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase text-black dark:text-slate-50">
                      question :
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="border  text-[#424242]  focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter question"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase text-black dark:text-slate-50">
                      answer :
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="border1  text-[#424242]  focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter answer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-8">
              <Button disabled={isLoading}>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InitialLeitnerForm;
