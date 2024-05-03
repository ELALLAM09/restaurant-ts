"use server";

import ImageBuffer from "@/components/ImageBuffer";
import { AddProductToDb } from "@/lib/product";
import { addProductSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";

export const addProduct = async (state: any, formData: FormData) => {
  const verification = addProductSchema.safeParse({
    image: formData.get("image"),
    title: formData.get("title"),
    price: Number(formData.get("price")),
    qty: Number(formData.get("qty")),
  });

  if (verification.success) { 
    const { image, title, price, qty } = verification.data;

    if (!((image as { size: number })?.size > 0)) {
      return { _error: "Image is required!" };
    }
    // handle image buffer
    const fileUrl = await ImageBuffer(image);

    // insert to db
    if (fileUrl) {
      await AddProductToDb(title, price, qty, fileUrl);
      revalidateTag("/dashboard/products");
      return { succes: "added succes." };
    }
  }
  // error
  if (!verification.success) {
    return { error: verification.error.format() };
  }
};
