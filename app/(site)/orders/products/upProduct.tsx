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
import { useRef } from "react";
import { updateProduct } from "@/actions/updateProduct";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function UpProduct({ product }: { product: Product }) {
  const [state, formData] = useFormState(updateProduct, null);
  const resetRef = useRef<any | undefined>();

  if (!!state?.succes) {
    resetRef.current.reset();
    redirect("/dashboard/products");
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="flex items-center justify-center">
        <UpdateIcon className="text-center text-green-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update product</DialogTitle>
        </DialogHeader>
        <form action={formData} ref={resetRef}>
          <div className="grid w-full items-center gap-4">
            <input type="hidden" name="currentimage" value={product.image} />
            <input type="hidden" name="id" value={product.id} />
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
                defaultValue={product.title}
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
                  defaultValue={product.qty}
                  placeholder="Qty"
                  name="qty"
                  className={cn(state?.error?.qty && "border border-red-500")}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  defaultValue={product.price}
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
      variant={"default"}
      type="submit"
      className={cn("mt-3 w-full rounded-lg", pending && "animate-pulse")}
    >
      {pending ? "Working on it..." : "update "}
    </Button>
  );
}
