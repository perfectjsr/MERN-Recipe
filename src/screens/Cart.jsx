import React from 'react'
import { useCart, useDispatchCart } from '../components/Reducer';
import trash from "../trash.svg"
import toast from 'react-hot-toast';
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
                                    // payment for stripe
    const handlePayment = async () => {
        // Implement your Stripe payment logic here
        try {
            const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
            const res = await fetch("http://localhost:5000/checkout-payment", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(data),
            });
            if(res.statusCode === 500) return;
        
            const resData = await res.json();
            console.log(resData);

            toast("Redirect to payment Gateway...!")
            stripePromise.redirectToCheckout({sessionId : resData})

            console.log("this is the data from cart.jsx",data)

        
            // Check if the payment was successful based on the response data
            if (resData.success) {
              // Payment was successful
              return { success: true };
            
            } else {
              // Payment failed, return an error object
              return { error: 'Payment failed' };
            }
          } catch (error) {
            console.error('Stripe payment error:', error);
            return { error: error.message };
          }
      };

    


    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' style={{ height: '65vh', overflow: 'scroll' }}>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quatity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >
                                    {index + 1}
                                </th>
                                <td>
                                    {food.name}
                                </td>
                                <td>
                                    {food.qty}
                                </td>
                                <td>
                                    {food.size}
                                </td>
                                <td>
                                    {food.price}
                                </td>
                                <td>
                                    <button type="button" className="btn p-0">
                                        <img src={trash} alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                                    </button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
            <div>
                <h1 className='fs-2 mt-2'>
                    Total Price: {totalPrice}/-
                </h1>
            </div>
            <div>
                <button className='btn bg-success mt-2 ' onClick={handlePayment}  >
                    Check Out
                </button>
            </div>
        </div>
    )
}

export default Cart
