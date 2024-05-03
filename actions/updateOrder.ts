'use server'

import { upOrderToDb } from '@/lib/orders'
import { OrderItem } from '@prisma/client'
import { revalidateTag } from 'next/cache'

export const updateOrder = async (order: OrderItem) => {
  await upOrderToDb(order)
  revalidateTag('/dashboard')
}
