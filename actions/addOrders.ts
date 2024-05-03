"use server";

import { addOrdersToDB } from "@/lib/orders";
import { getProductFromDbById } from "@/lib/product";
import { revalidateTag } from "next/cache";

type Data = {
  numberTable: number;
  productTitle: string;
  productId: number;
  qty: number;
};
export const addOrders = async (orders: Data[]) => {
  const order = orders.find((item) => item.productId);

  if (order) {
    // get Data from Db
    const product = await getProductFromDbById(order?.productId);

    if (product)
      //  add Data to DB
      var orderSucces = await addOrdersToDB(
        order.numberTable,
        order.productTitle,
        product.price,
        order.productId,
        order.qty
      );

    revalidateTag("/");
    if (orderSucces) return { succes: "added succes." };
  }
};
