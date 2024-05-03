'use server'

import { DeleteFromDB } from '@/lib/orders'
import { revalidateTag } from 'next/cache'

export const deleteOrder = async (id: number) => {
  await DeleteFromDB(id)
  revalidateTag('/dashboard/products')
}
