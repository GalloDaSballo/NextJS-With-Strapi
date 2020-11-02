import { loadStripe } from '@stripe/stripe-js'
import {API_URL} from '../utils/urls'
import styles from '../styles/BuyButton.module.css'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const stripePromise = loadStripe('pk_test_N30aQqXtRkyoayWHqMwKkgXC00TG2IO3RN')

export default ({product}) => {
    const { user, loginUser, getToken } = useContext(AuthContext);

    const handleBuy = async (e) => {
        const stripe = await stripePromise
        const token = await getToken()
        console.log("handleBuy token", token)
        e.preventDefault()
        const res = await fetch(`${API_URL}/orders/buy`, {
                method: 'POST',
                body: JSON.stringify({product}),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
        })
        const session = await res.json()
        console.log("session", session)

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
      
    }

    return(
        <>
            {user &&
                <button className={styles.buy} onClick={handleBuy}>BUY</button>
            }
            {!user &&
                <button className={styles.buy} onClick={loginUser}>Login to Buy</button>
            }
        </>
    )
}
