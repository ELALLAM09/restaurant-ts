
import { cache } from "react";
import "server-only";
import Link from "next/link";
import OrderTable from "./orderTable";
import { getOrdersFromDb } from "@/lib/orders";
import { Button } from "@/components/ui/button";
import { OrderItem } from "@prisma/client";

const dashPage = cache(async () => {
  const orders: OrderItem[] | undefined = await getOrdersFromDb();
  return (
    <section className="container mx-auto max-w-4xl">
      <div className="my-4 flex justify-between">
        <h1 className="text-lg">All Orders</h1>
        <Button variant="link" size="sm">
          <Link href="/orders/products">Products ›</Link>
        </Button>
      </div>
      <div className="mt-4">
        <OrderTable orders={orders} />
      </div>
    </section>
  );
});

export default dashPage;
