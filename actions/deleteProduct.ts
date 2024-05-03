'use server'

import deleteImageBuffer from '@/components/DeleteImageBuffer'
import { DeleteFromDB } from '@/lib/product'
import { revalidateTag } from 'next/cache'

export const deleteProduct = async (id: number, image: string) => {
  // delete product from upload
  await deleteImageBuffer(image)

  await DeleteFromDB(id)
  revalidateTag('/dashboard/products')
}
