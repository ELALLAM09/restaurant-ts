'use server'

import deleteImageBuffer from '@/components/DeleteImageBuffer'
import ImageBuffer from '@/components/ImageBuffer'
import { upProductToDb } from '@/lib/product'
import { upProductSchema } from '@/lib/schema'
import { revalidateTag } from 'next/cache'

export const updateProduct = async (state: any, formData: FormData) => {
  const verification = upProductSchema.safeParse({
    image: formData.get('image'),
    title: formData.get('title'),
    qty: Number(formData.get('qty')),
    price: Number(formData.get('price')),
    currentimage: formData.get('currentimage'),
    id: Number(formData.get('id'))
  })

  if (verification.success) {
    const { image, title, price, qty, currentimage, id } = verification.data

    if (!((image as { size: number })?.size > 0)) {
      return { _error: 'Image is required!' }
    }

    // delete image from upload
    await deleteImageBuffer(currentimage)

    // handle image buffer
    const fileUrl = await ImageBuffer(image)

    // insert to db
    if (fileUrl) {
      await upProductToDb(id, title, price, qty, fileUrl)
      revalidateTag('/dashboard/products')
      return { succes: 'added succes.' }
    }
  }
  // error
  if (!verification.success) {
    return { error: verification.error.format() }
  }
}
