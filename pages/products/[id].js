import Head from 'next/head'

import ProductQty from '../../components/ProductQty'

import styles from '../../styles/Product.module.css'
import {API_URL, fromImageToUrl} from '../../utils/urls'

const Product = ({product}) => {
  return (
    <div className={styles.product}>

      <Head>
        {product.meta_title &&
          <title>{product.meta_title}</title>
        }
        {product.meta_description &&
          <meta name="description" 
            content={product.meta_description}
          />
        }
        
        
      </Head>

      <img src={fromImageToUrl(product.image)} />
      <h3>{product.name}</h3>
      <ProductQty product={product} />
      <p>
        {product.content}
      </p>
    </div>
  )
}

export async function getStaticProps({params: {id}}) {
  const product_res = await fetch(`${API_URL}/products/${id}`)
  const product = await product_res.json()

  return {
    props: {
        product
    }
  }
}

export async function getStaticPaths() {
    // Get external data from the file system, API, DB, etc.
  const products_res = await fetch(`${API_URL}/products`)
  const products = await products_res.json()

    return {
      paths: products.map(el => ({
          params: {id: String(el.id)}
      })),
      fallback: false
    };
  }
  
export default Product