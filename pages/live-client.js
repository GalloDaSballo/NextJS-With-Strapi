import useSWR from 'swr'
import {API_URL} from '../utils/urls'

const fetcher = url => fetch(url).then(r => r.json())

export default function LiveClient() {
  const { data, error } = useSWR(`${API_URL}/posts/count`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
        <div>
            Count: {data}
        </div>
    )
}