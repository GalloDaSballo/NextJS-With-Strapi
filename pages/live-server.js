import {API_URL} from '../utils/urls'

export default ({fast}) => (
    <div>
        Live count is: {fast}
    </div>
)

export async function getServerSideProps(context) {
    console.log("getServerSideProps context", context)
    const posts_res = await fetch(`https://ethgasstation.info/api/ethgasAPI.json`)
    const {fast} = await posts_res.json()
  
    return {
      props: {
        fast
      }
    }
  }