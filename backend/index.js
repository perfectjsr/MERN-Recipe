const express = require('express')
const app = express()
const mongoDB = require("./db")
const dotenv = require("dotenv").config();
const Stripe = require('stripe');

const port = process.env.PORT || 8080;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));


// console.log(process.env.STRIPE_SECRET_KEY)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post('/checkout-payment', async (req, res) => {
  // console.log(req.body)
  try {

    const params = {
      submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1O5q5ESHMwC3DmZWzj0g9lVu"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "inr",
                product_data : {
                  name : item.name,
                },
                unit_amount : item.price * 100,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/success`,
          cancel_url : `${process.env.FRONTEND_URL}/cancel`,

    }

    const session = await stripe.checkout.sessions.create(params)
    res.status(200).json(session.id)
  }
  catch (err) {
    res.status(err.statusCode || 500).json(err.message)
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})