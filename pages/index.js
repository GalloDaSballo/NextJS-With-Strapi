import Link from 'next/link'
import styles from '../styles/Home.module.css'
import {API_URL, fromImageToUrl} from '../utils/urls'

export default function Home({products}) {
  return (
    <div>
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
                  {el.name}
                </div>
              </div>
              
            </a>
          </Link>
        </div>
      ))}
      <div>
        <Link href="/live-server">
          <a>
            <div className={styles.button}>Server Side</div>
          </a>
        </Link>
        <Link href="/live-client">
          <a>
            <div className={styles.button}>CLIENT SIDE</div>
          </a>
        </Link>
        <Link href="/products/chart">
          <a>
            <div className={styles.button}>Best Sellers</div>
          </a>
        </Link>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const products_res = await fetch(`${API_URL}/products`)
  const products = await products_res.json()

  console.log("getStaticProps products", products)
    
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      products
    }
  }
}