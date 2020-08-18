import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home({posts}) {
  return (
    <div>
      {posts.map(el => (
        <div className={styles.post}>
          <Link href="/posts/[id]" as={`/posts/${el.id}`}>
            {el.title}
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
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const posts_res = await fetch('http://localhost:1337/posts')
  const posts = await posts_res.json()

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      posts
    }
  }
}