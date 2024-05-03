"use client";

import Submit from "./Submit";
import React from "react";
import { useFormState } from "react-dom";
import { addUser } from "@/actions/addUser";
import GoogleButton from "@/components/GoogleButton";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  const [state, formAction] = useFormState(addUser, null);

  return (
    <div className="mx-auto mt-10 w-[400px] rounded-lg shadow-md sm:w-[500px]">
      <div className="flex min-h-full  flex-col  justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full  sm:max-w-sm">
          <span className="mx-auto block text-center text-red-500">
            {state?._error}
          </span>
          <h3 className="text-center font-mono text-2xl text-tremor-content-strong ">
            Sign in on your acount
          </h3>
          <form action={formAction} className="mt-6">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="john@company.com"
              className={cn(
                "mt-2",
                state?.error?.email && "border-tremor-border-wow"
              )}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              placeholder="password"
              className={cn(
                "mt-2",
                state?.error?.password && "border-tremor-border-wow"
              )}
            />
            <Submit />
          </form>
          <div className="mx-auto my-3 flex w-full items-center justify-evenly  before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-200 after:ml-4 after:block after:h-0.5 after:flex-grow after:bg-stone-200">
            or With
          </div>
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}
