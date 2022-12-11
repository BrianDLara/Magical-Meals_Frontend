import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Favorite = () => {
    const { userId } = useParams()

    const [favorite, setFavorite] = useState(null)
  
    const getUserFavorites = async () => {
      const res = await axios.get(
        `http://localhost:3001/api/users/get_all_cart/id/${userId}`
      )
      setFavorite(res.data)
      console.log(res.data)
      
    }
    useEffect(() => {
      getUserFavorites()
    }, [])
    return favorite !== null ? (
        <div>
            <h2>
                {favorite.name}
            </h2>
        </div>
    ) : null
    
}

export default Favorite
