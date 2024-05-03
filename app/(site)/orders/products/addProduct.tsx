"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormState, useFormStatus } from "react-dom";
import { addProduct } from "@/actions/addProduct";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function AddProduct() {
  const [state, formData] = useFormState(addProduct, null);
  const resetRef = useRef<any>();

  if (!!state?.succes) {
    resetRef.current.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          new Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new product</DialogTitle>
        </DialogHeader>
        <form action={formData} ref={resetRef}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="img">Image</Label>
              <Input
                id="img"
                type="file"
                name="image"
                className={cn(state?._error && "border border-red-500")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Title"
                name="title"
                className={cn(state?.error?.title && "border border-red-500")}
              />
            </div>
            <div className="flex justify-between">
              <div>
                <Label htmlFor="Qty">Qty</Label>
                <Input
                  type="number"
                  id="Qty"
                  placeholder="Qty"
                  name="qty"
                  className={cn(state?.error?.qty && "border border-red-500")}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="text"
                  id="price"
                  placeholder="price"
                  name="price"
                  className={cn(state?.error?.price && "border border-red-500")}
                />
              </div>
            </div>
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      size="sm"
      type="submit"
      className={cn("mt-3 w-full rounded-lg", pending && "animate-pulse")}
    >
      {pending ? "Working on it..." : "Add Product"}
    </Button>
  );
}
