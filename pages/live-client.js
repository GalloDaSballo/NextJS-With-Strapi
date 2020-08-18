import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

export default function LiveClient() {
  const { data, error } = useSWR('http://localhost:1337/posts/count', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
        <div>
            Count: {data}
        </div>
    )
}