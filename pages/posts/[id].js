import styles from '../../styles/Post.module.css'

const fromImageToUrl = (image) => {
  console.log("fromImageToUrl", image)
  if(!image){
    return '/vercel.svg' //Or default image here
  }

  if(image.url.indexOf('/') === 0){
    //It's a relative url, add API URL
    return `http://localhost:1337${image.url}`
  }

  return image.url

}

const Post = ({post}) => {
  return (
    <div className={styles.post}>
      <img src={fromImageToUrl(post.image)} />
      <h3>{post.title}</h3>
    </div>
  )
}

export async function getStaticProps({params: {id}}) {
  const posts_res = await fetch(`http://localhost:1337/posts/${id}`)
  const post = await posts_res.json()

  return {
    props: {
        post
    }
  }
}


export async function getStaticPaths() {
    // Get external data from the file system, API, DB, etc.
  const posts_res = await fetch('http://localhost:1337/posts')
  const posts = await posts_res.json()

    return {
      paths: posts.map(el => ({
          params: {id: String(el.id)}
      })),
      fallback: false
    };
  }
export default Post