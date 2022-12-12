import axios from 'axios'
import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const Cart = () => {
    let {userId} = useParams()

    const [cartItems, setCartItems] = useState([])
    
    const handleRefresh = () => {
        window.location.reload(false);
      }
    useEffect(() => {
        const getItems = async () => {
            const res = await axios.get(`http://localhost:3001/api/carts/cart_items/id/${userId}`)
            setCartItems(res.data.cart_items)           
        }
        getItems()
    }, [userId])
    
    const handleDelete = async (e) => {
        let itemId = e
        await axios.delete(`http://localhost:3001/api/carts/item_id/${itemId}`)
        handleRefresh()
    }
    
    return (
    <div className='min-h-screen text-white py-4 pb-24 sm:py-12'>
        <div className='flex justify-center pt-6'>
        <span> <button className="font-2-bold text-xl focus:outline-none text-white bg-amber-500 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:focus:ring-amber-900">Purchase At <img src="https://i.imgur.com/aZSOcMJ.png" alt="kroger" className='kroger-image' /></button></span>
        </div>
        
        <div className='sm:grid grid-cols-2 gap-1'>
            {cartItems.map((item) => (
                <div className='cart-data-container' key={item.id}>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-2-bold'>{item.name}</h2>
                        <button onClick={() => handleDelete(item.id)} className="font-2-bold focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-3 py-2.5 mr-3 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove From Cart</button>
                    </div>
                    <img className="cart-image" src={item.image} alt={item.name} width='50px'/>
                </div>
            ))}
        </div> 
    </div>
  )
}

export default Cart
