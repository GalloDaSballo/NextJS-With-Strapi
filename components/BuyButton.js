import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe('pk_test_N30aQqXtRkyoayWHqMwKkgXC00TG2IO3RN')

export default ({product}) => {

    const handleBuy = async (e) => {
        const stripe = await stripePromise
        e.preventDefault()
        const res = await fetch(`/api/buy`, {
                method: 'POST',
                body: JSON.stringify({product}),
                headers: {
                    'Content-type': 'application/json'
                }
        })
        const session = await res.json()
        console.log("session", session)

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
      
    }

    return(
        <button onClick={handleBuy}>BUY</button>
    )
}
