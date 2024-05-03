"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addOrders } from "@/actions/addOrders";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

type InputData = {
  numberTable: number;
  productId: number;
  productTitle: string;
  qty: number;
}[];

export default function Menu({
  product,
  id,
}: {
  product: Product[] | undefined;
  id: string;
}) {
  const { toast } = useToast();
  let orders: InputData = [];
  const refQty = useRef<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  let lastClickedElement: HTMLElement | null = null;

  function handleSelectChange(value: string) {
    refQty.current = Number(value);
  }

  function handleClick(e: any, prod: Product) {
    if (lastClickedElement) {
      lastClickedElement.style.border = "";
    }

    if (orders.length > 0 && orders[0].productId === prod.id) {
      orders = [];
      lastClickedElement = null;
    } else {
      orders = [
        {
          numberTable: Number(id),
          productId: prod.id,
          productTitle: prod.title,
          qty: refQty.current,
        },
      ];

      e.currentTarget.style.border = "3px solid #5CA8D6";
      lastClickedElement = e.currentTarget;
    }
  }

  async function AddHandler() {
    setLoading(true);
    const succes = await addOrders(orders);
    if (succes)
      toast({
        description: "Your order has been sent.",
      });
    setLoading(false);
  }

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <h2 className="font-mono text-xl tracking-tight text-gray-900">
          Menu of Restaurant
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 md:gap-y-8">
          {product &&
            product.map((prod: Product) => (
              <div key={prod.id}>
                <div
                  key={prod.id}
                  onClick={(e) => handleClick(e, prod)}
                  className="group relative rounded-lg"
                >
                  <div className="aspect-h-1 h-60 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-80 lg:h-60">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      loading="lazy"
                      className="h-full w-full rounded-sm object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between px-2">
                    <h3 className="text-base text-gray-700">{prod.title}</h3>
                    <p className="text-sm font-medium text-gray-900">
                      ${prod.price}
                    </p>
                  </div>
                </div>
                <Select name="qty" onValueChange={handleSelectChange}>
                  <SelectTrigger className="my-1 w-full">
                    <SelectValue placeholder="Select a qty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem defaultChecked value="1">
                      01
                    </SelectItem>
                    <SelectItem value="2">02</SelectItem>
                    <SelectItem value="3">03</SelectItem>
                    <SelectItem value="4">04</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
        </div>
      </div>

      <Send AddHandler={AddHandler} loading={loading} />
    </div>
  );
}

export function Send({ AddHandler, loading }: { AddHandler: () => void,loading: boolean }) {

  return (
    <div className="my-5 text-end ">
      <Button onClick={AddHandler} variant="secondary" size="sm">
        {loading ? "loading..." : "›"}
      </Button>
    </div>
  );
}
