import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import {API_URL, fromImageToUrl} from '../utils/urls'
import {formatPrice} from '../utils/format'

export default function Home({products}) {
  return (
    <div>

      <Head>
        <title>Entreprenerd Store</title>
        <meta name="description" content="Alex The Entreprenerd E-Commerce with Next Strapi and Stripe" />
      </Head>

      <h2>Products</h2>
      {products.map(el => (
        <div className={styles.product}>
          <Link href="/products/[id]" as={`/products/${el.id}`}>
            <a>
              <div className={styles.product__Rows}>
                <div className={styles.product__ColImg}>
                  <img src={fromImageToUrl(el.image)} />
                </div>
                <div className={styles.product__Col}>
                  {el.name} {formatPrice(el.price)}
                </div>
              </div>
              
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const products_res = await fetch(`${API_URL}/products`)
  const products = await products_res.json()
    
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      products
    }
  }
}