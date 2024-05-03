import db from './db'

export async function AddProductToDb(
  title: string,
  price: number,
  qty: number,
  fileUrl: string
) {
  try {
    await db.product.create({
      data: {
        title,
        price,
        qty,
        image: fileUrl
      }
    })
  } catch (error) {
    console.log(error)
  } finally {
    db.$disconnect()
  }
}

export async function DeleteFromDB(id: number) {
  try {
    await db.product.delete({ where: { id } })
  } catch (error) {
    console.log(error)
  } finally {
    db.$disconnect()
  }
}

export async function getProductFromDb(query?: string) {
  try {
    const product = await db.product.findMany({
      where: {
        title: {
          contains: query
        }
      }
    })
    return product
  } catch (error) {
    console.log(error)
  } finally {
    db.$disconnect()
  }
}

export async function getProductFromDbById(id: number) {
  try {
    const oneProduct = await db.product.findFirst({ where: { id: id } })
    return oneProduct
  } catch (error) {
    console.log(error)
  } finally {
    db.$disconnect()
  }
}

export async function upProductToDb(
  id: number,
  title: string,
  price: number,
  qty: number,
  fileUrl: string
) {
  try {
    const upProduct = await db.product.update({
      where: { id },
      data: {
        title,
        price,
        qty,
        image: fileUrl
      }
    })
    return { upProduct }
  } catch (error) {
    return { error }
  } finally {
    db.$disconnect()
  }
}
