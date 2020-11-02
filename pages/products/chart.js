import Head from 'next/head'
import Link from 'next/link'
import {API_URL} from '../../utils/urls'
import {formatPrice} from '../../utils/format'

//This page will be too much extra work. 
//Will scrap

export default ({products}) => (
    <div>

        <Head>
            <title>Top Selling Products</title>
            <meta name="description" 
                content="These are the best sellers"
            />
        </Head>
        <h2>Top Sellers</h2>
        {products.map((product, counter) => (
            <Link href="/products/[id]" as={`/products/${product.id}`}>
                <a>
                    <h3>{counter + 1} {product.name} {formatPrice(product.price)}</h3>
                </a>
            </Link>
        ))}
    </div>
)

export async function getServerSideProps(context) {
    const products_res = await fetch(`${API_URL}/products?_sort=qty:asc`)
    const products = await products_res.json()
  
    return {
      props: {
        products
      }
    }
  }