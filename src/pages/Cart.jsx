import axios from 'axios'
import React from 'react'
import {useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {loadStripe} from '@stripe/stripe-js';

const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_STRIPE_KEY
const PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY



const Cart = () => {
    let {userId} = useParams()

    const [cartItems, setCartItems] = useState([])
    const [userInfo, setUserInfo] = useState(null)
    const [total, setTotal] = useState(null)
    
    const handleRefresh = () => {
        window.location.reload(false);
    }
    useEffect(() => {
        // get all the items from the user cart
        const getItems = async () => {
            const res = await axios.get(`http://localhost:3001/api/carts/cart_items/id/${userId}`)
            setCartItems(res.data.cart_items) 
        }
        
        // get user info
        const getUser = async () => {
            const user = await axios.get(`http://localhost:3001/api/users/id/${userId}`)
            setUserInfo(user)
        }
        
        // Sum all of the items price
        

        getUser()
        getItems()
    }, [userId, total])

    const getTotal = useCallback(() => {
        let sum = 0
        cartItems?.map((item) => {
            sum += parseFloat(item.price)
            return sum
        })
        setTotal(sum.toFixed(2))
    }, [cartItems])

    useEffect(() => {
        getTotal()
    }, [getTotal])
    
    const handleDelete = async (e) => {
        let itemId = e
        await axios.delete(`http://localhost:3001/api/carts/item_id/${itemId}`)
        handleRefresh()
    }


    // paypal
    const initialOptions = {
        "client-id": CLIENT_ID,
        currency: "USD",
        intent: "capture",
    };

    // stripe

    const stripePromise = loadStripe(`${PUBLISHABLE_KEY}`);


    return cartItems !== null ? (
    <div className='min-h-screen text-white py-4 pb-24 sm:py-12'>
        {/* <h1>Hi {userInfo.name}</h1> */}
        <div className='flex flex-col text-center justify-center pt-6'>
            <p className='text-2xl font-1-bold'>Total: &nbsp;${total}</p>
            <div className='flex items-center justify-center pt-4'>
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: `${total}`
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                const name = details.payer.name.given_name;
                                alert(`Transaction completed by ${name}`);
                            });
                        }}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
        
        <div className='sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1'>
            {cartItems.map((item) => (
                <div className='cart-data-container' key={item.id}>
                    <div className='mx-10 flex justify-between items-center'>
                        <h2 className='font-2-bold'>{item.name}</h2>
                        <button onClick={() => handleDelete(item.id)} className="font-2-bold focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-3 py-2.5 mr-3 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>
                    </div>
                    <img className="cart-image" src={item.image} alt={item.name} width='50px'/>
                    <p>amount: {item.amount}</p>
                </div>
            ))}
        </div> 
    </div>
  ) :     
   null

}

export default Cart
