import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from '../globals'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Favorite = () => {
    const { userId } = useParams()

    const [favorite, setFavorite] = useState(null)
  
    const getUserFavorites = useCallback(async () => {
      const res = await axios.get(
        `${BASE_URL}favorites/users_favorites/id/${userId}`
      )
      setFavorite(res.data)
    }, [userId])
    
    useEffect(() => {
      getUserFavorites()
    }, [getUserFavorites])

    
    // window reload storage
    const success = () => {
      toast.success("Recipe was successfully deleted!");
    }

    window.onload = function() {
      let reloading = sessionStorage.getItem("reloading");
      if (reloading) {
          sessionStorage.removeItem("reloading");
          success();
      }
    }
    
    const handleRefresh = () => {
    sessionStorage.setItem("reloading", "true");
    document.location.reload();
    }
    
    
    const handleDelete = async (e) => {
      
      let recipeId = e
      // console.log(recipeId)
      
      await axios.delete(`${BASE_URL}favorites/user_id/${userId}/recipe_id/${recipeId}`)
      handleRefresh();
    }

    return favorite !== null ? (
        <div className='text-white min-h-screen pb-24'>
            <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            
            <h2 className='pt-16 font-1-bold text-4xl text-center'>
                Favorite Recipes
            </h2>
            <div>
              {favorite.user_favorites.map((recipe) => (
                <div key={recipe.id } className="favorite-data-container">
                  <div className='flex justify-between'> 
                    <h3 className='font-2-bold'>{recipe.name}</h3>
                    <button onClick={() => handleDelete(recipe.id)} className="mb-2 font-2 text-white bg-transparent hover:bg-red-700 hover:text-white rounded-lg p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">Delete</button>
                  </div>
                  <Link to={`/user_id/${userId}/recipe/${recipe.id}`}> 
                    <img src={recipe.image} alt={recipe.name} className="favorite-image"/>
                  </Link>
                </div>
              ))}
            </div>
        </div>
    ) : null
    
}

export default Favorite
