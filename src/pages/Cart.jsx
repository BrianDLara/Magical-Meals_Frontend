import axios from 'axios'
import React from 'react'
import {useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID
console.log(CLIENT_ID)


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

    const initialOptions = {
        "client-id": CLIENT_ID,
        currency: "USD",
        intent: "capture",
    };


    return (
    <div className='min-h-screen text-white py-4 pb-24 sm:py-12'>
        {/* <h1>Hi {userInfo.name}</h1> */}
        <div className='flex justify-center pt-6'>
            <p className='text-2xl font-1-bold'>Total: &nbsp;${total}</p>
        </div>
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
        <div className='flex justify-center pt-6'>
            <span> <button className="font-2-bold text-xl focus:outline-none text-white bg-amber-500 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:focus:ring-amber-900">Purchase At <img src="https://i.imgur.com/aZSOcMJ.png" alt="kroger" className='kroger-image' /></button></span>
        </div>
        
        <div className='sm:grid grid-cols-2 gap-1'>
            {cartItems.map((item) => (
                <div className='cart-data-container' key={item.id}>
                    <div className='mx-10 flex justify-between items-center'>
                        <h2 className='font-2-bold'>{item.name}</h2>
                        <button onClick={() => handleDelete(item.id)} className="font-2-bold focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-3 py-2.5 mr-3 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>
                    </div>
                    <img className="cart-image" src={item.image} alt={item.name} width='50px'/>
                </div>
            ))}
        </div> 
    </div>
  )
}

export default Cart
