// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const BASE_URL = req.headers.origin || 'http://localhost:3000'
  console.log("BASE_URL", BASE_URL)
  
  if (req.method === 'POST') {
    const {product} = req.body
    console.log("product", product)
    console.log("req.body", req.body)
    if(!product){
      return res.status(400).send({error: "Please add a product to body"})
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name
            },
            unit_amount: parseInt(product.price),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: BASE_URL,
      cancel_url: BASE_URL,
    })
  
    res.json({ id: session.id })
  }
  
};
