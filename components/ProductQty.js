import useSWR from 'swr'
import {API_URL} from '../utils/urls'

const fetcher = url => fetch(url).then(r => r.json())

export default function LiveClient({product}) {
    const { data, error } = useSWR(`${API_URL}/products/${product.id}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const qty = data.qt

    return (
            <div>
                <div>
                    {data.qty} Left
                </div>
                <div>
                    {parseInt(data.qty) > 0 && <button>BUY</button>}
                </div>
            </div>
        )
}