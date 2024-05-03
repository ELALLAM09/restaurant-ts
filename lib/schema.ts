import { z } from "zod";

export const schemaSignin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const imageSchema = z.custom((image) => {
  if (!image || !(image instanceof File)) {
    return "Invalid image";
  }

  // Check file type
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Add more supported image types as needed
  if (!allowedTypes.includes(image.type)) {
    return "Image type not supported";
  }

  // Check file size (in bytes)
  const maxSize = 10 * 1024 * 1024; // 10 MB
  if (image.size > maxSize) {
    return "Image size exceeds 10 MB";
  }
  return image;
});

export const addProductSchema = z.object({
  image: imageSchema,
  title: z.string().min(2),
  qty: z.number().min(1),
  price: z.number().min(1),
});

export const upProductSchema = z.object({
  image: imageSchema,
  title: z.string().min(2),
  qty: z.number().min(1),
  price: z.number().min(1),
  currentimage: z.string(),
  id: z.number(),
});
