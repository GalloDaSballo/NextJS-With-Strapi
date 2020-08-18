export default ({count}) => (
    <div>
        Live count is: {count}
    </div>
)

export async function getServerSideProps(context) {
    console.log("getServerSideProps context", context)
    const posts_res = await fetch(`http://localhost:1337/posts/count`)
    const count = await posts_res.json()
  
    return {
      props: {
        count
      }
    }
  }