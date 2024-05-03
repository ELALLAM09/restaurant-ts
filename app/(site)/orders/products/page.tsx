import ProductTable from './productTable'
import AddProduct from './addProduct'
import { getProductFromDb } from '@/lib/product'

export async function getData() {
  const product = await getProductFromDb()
  return product
}

const Products = async () => {
  const product = await getData()

  return (
    <section className="container mx-auto max-w-4xl">
      <div className="my-4 flex justify-between">
        <h1 className="text-lg">All Products</h1>
        <AddProduct />
      </div>
      <div className="mt-8">
        <ProductTable product={product} />
      </div>
    </section>
  )
}

export default Products
