import {API_URL} from "../utils/urls"
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link"

const useOrders = (user, getToken) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)
            if(user){
                try{
                    const token = await getToken()
                    const orderRes = await fetch(`${API_URL}/orders`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const data = await orderRes.json()
                    setOrders(data)
                } catch(err){
                    setOrders([])
                }
            }
            setLoading(false)
        }

        fetchOrders()
    }, [user])



    return {orders, loading}
}

export default () => {

    const {user, getToken, logoutUser} = useContext(AuthContext)
    const {orders, loading} = useOrders(user, getToken)

    if(!user){
        return (
            <div>
                <p>Please Login or Register before accessing this page</p>
                <Link href="/"><a>Go Back</a></Link>
            </div>
        )
    }

    return (
        <div>
            <h2>Account Page</h2>
            <h3>Your Orders</h3>
            {!loading &&
                <>
                    {orders.map(order => <div key={order.id}>{order.id}</div>)}
                </>
            }
            {loading && <p>Loading</p>}

            <p onClick={logoutUser}>Logout</p>
        </div>
    )

}