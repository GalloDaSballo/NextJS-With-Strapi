import Head from 'next/head'
import Link from 'next/link'
import {API_URL} from '../../utils/urls'
export default ({products}) => (
    <div>

        <Head>
        </Head>

        {products.map((product, counter) => (
            <Link href="/products/[id]" as={`/products/${product.id}`}>
                <a>
                    <h3>{counter + 1} {product.name}</h3>
                </a>
            </Link>
        ))}
    </div>
)

export async function getServerSideProps(context) {
    console.log("getServerSideProps context", context)
    const products_res = await fetch(`${API_URL}/products?_sort=qty:asc`)
    const products = await products_res.json()
  
    return {
      props: {
        products
      }
    }
  }