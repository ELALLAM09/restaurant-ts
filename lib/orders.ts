import { OrderItem } from "@prisma/client";
import db from "./db";

export async function addOrdersToDB(
  numberTable: number,
  productTitle: string,
  price: number,
  qty: number,
  productId: number
) {
  try {
    const order = await db.orderItem.create({
      data: {
        numberTable,
        prodTitle: productTitle,
        prodPrice: price,
        qty,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
    return order;
  } catch (error) {
    console.log(error);
  } finally {
    db.$disconnect();
  }
}

export async function getOrdersFromDb() {
  try {
    const orders = await db.orderItem.findMany();
    return orders;
  } catch (error) {
    console.log(error);
  } finally {
    db.$disconnect();
  }
}

export async function DeleteFromDB(id: number) {
  try {
    await db.orderItem.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  } finally {
    db.$disconnect();
  }
}

export async function upOrderToDb(order: OrderItem) {
  try {
    const upProduct = await db.orderItem.update({
      where: { id: order.id },
      data: {
        ...order,
        status: "DONE",
      },
    });
    return { upProduct };
  } catch (error) {
    return { error };
  } finally {
    db.$disconnect();
  }
}
