import axios from 'axios'
import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const Cart = () => {
    let {userId} = useParams()

    const [cartItems, setCartItems] = useState([])
    const [userInfo, setUserInfo] = useState(null)
    
    const handleRefresh = () => {
        window.location.reload(false);
      }
    useEffect(() => {
        // get all the items from the user cart
        const getItems = async () => {
            const res = await axios.get(`http://localhost:3001/api/carts/cart_items/id/${userId}`)
            setCartItems(res.data.cart_items) 
            console.log(res.data)
                      
        }
        // Sum all of the items price
        const getTotal = () => {
            let sum = 0
            cartItems?.map((item) => {
                sum += parseFloat(item.price)
            })
            setTotal(sum.toFixed(2))
        }

        // get user info
        const getUser = async () => {
            const user = await axios.get(`http://localhost:3001/api/users/id/${userId}`)
            setUserInfo(user)
        }
        
        getUser()
        getTotal()
        getItems()
    }, [userId, cartItems])
    
    const handleDelete = async (e) => {
        let itemId = e
        await axios.delete(`http://localhost:3001/api/carts/item_id/${itemId}`)
        handleRefresh()
    }

    const [total, setTotal] = useState(null)

    
  
  
    return (
    <div className='min-h-screen text-white py-4 pb-24 sm:py-12'>
        {/* <h1>Hi {userInfo.name}</h1> */}
        
        <div className='flex justify-center pt-6'>
            <p className='text-2xl font-1-bold'>Total: &nbsp;${total}</p>
        </div>
        
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
