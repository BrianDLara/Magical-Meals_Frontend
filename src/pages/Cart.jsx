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
    <div className='min-h-screen text-white py-4 sm:py-12'>
        <div className='sm:grid grid-cols-2 gap-1'>
            {cartItems.map((item) => (
                <div className='cart-data-container' key={item.id}>
                    <div className='flex justify-between'>
                        <h2 className='font-2-bold'>{item.name}</h2>
                        <button onClick={() => handleDelete(item.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove From Cart</button>
                    </div>
                    <img className="cart-image" src={item.image} alt={item.name} width='50px'/>
                </div>
            ))}
        </div> 
    </div>
  )
}

export default Cart
