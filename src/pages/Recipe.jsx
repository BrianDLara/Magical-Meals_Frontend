import React from 'react'
import axios from 'axios'
import { Link,useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {BASE_URL} from '../globals'
import Comments from '../components/Comments'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

const Recipe = () => {


  let {userId, recipeId} = useParams()
  const userIdx = parseInt(userId, 10)
  const [recipe, setRecipe] = useState([])
  const [cartId, setCartId] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    // Get recipe with ingredient list
    const GetRecipesWithItems = async () => {
      const res = await axios.get(`${BASE_URL}recipes/id/${recipeId}`)
      setRecipe(res.data)
    }

    const GetCartById = async () => {
      const res = await axios.get(`${BASE_URL}carts/cart_items/id/${userId}`)
      setCartId(res.data)
    }

    const GetCommentById = async () => {
      const res = await axios.get(`${BASE_URL}comments/recipe_users/${recipeId}`)
      setComments(res.data)
    }

    GetCommentById()
    GetCartById()
    GetRecipesWithItems()
  },[recipeId, userId])


  // Toggle adding and deleting from favorites
  
  const favOption = document.getElementById('addedFav')  
  
  const toggleFavorite = async () => {
    if(favOption.innerHTML === "Remove From Favorites"){
      await axios.delete(`${BASE_URL}favorites/user_id/${userId}/recipe_id/${recipeId}`)
      favOption.innerHTML = 'Add To Favorites'
      favOption.style.color='#f0ad4e'
    } else if(favOption.innerHTML === "Add To Favorites"){
      await axios.post(`${BASE_URL}favorites/create/user_id/${userId}/recipe_id/${recipeId}`)
      favOption.innerHTML = "Remove From Favorites"
      favOption.style.color='#d9534f'
    }
  }
  
    const notify = () => toast.info("Item added to cart!");
  
    const toggleCart = async (e) => {
      let itemId = e
      await axios.post(`${BASE_URL}carts/add_cart_item/cart_id/${cartId?.id}/item_id/${itemId?.id}`)
      notify()
    }



  return(
    <div className='min-h-screen container mx-auto text-white' key={recipe?.id}>

      <section className='text-center px-4 xl:px-20 pt-8 xl:py-10'> 
        <h1 className='text-6xl font-1-bold pt-6' key={recipe?.id}>{recipe?.name}</h1>
        <p className='text-2xl font-2 pt-10 xl:pb-6'>{recipe?.description}</p>
      </section>
      <section className='flex flex-col'>
        <div className='banner-image-container'> 
          <img src={recipe?.image} alt={recipe?.name} className="banner-image px-2 xl:pt-20"/>
        </div>
        <div className='flex justify-center items-start relative px-6 sm:pt-4 mb-6 xl:mt-40 xl:mb-28'>
          <p className='font-2-bold text-xl'>Share:&nbsp;&nbsp;</p>
          <a  href={`https://twitter.com/share?url=https://magical-meals.herokuapp.com/recipe/${recipe?.id}&text=${recipe?.name}`} className='twitter-icon mx-2 text-2xl'><FontAwesomeIcon icon={faTwitter}/></a>
          <a href={`https://www.facebook.com/sharer.php?u=https://magical-meals.herokuapp.com/recipe/${recipe?.id}`} className='facebook-icon mx-2 text-2xl'><FontAwesomeIcon icon={faFacebook}/></a>
          <button onClick={toggleFavorite} className='font-2-bold favorite-icon text-xl text-black ml-8' id='addedFav'>Add To Favorites</button>
        </div>
      </section>
      <div className='flex flex-col xl:flex-row items-center xl:items-start xl:place-content-around sm:mb-10 xl:mb-24'>
        <section className='relative top-14 py-8 solid-circle shadow-2xl'>
          <div className="dotted-circle times-background">
            <div className='text-2xl flex flex-col place-items-center relative top-24'> 
              <p><span>Prep:&nbsp;</span>{recipe?.prep}</p>
              <p><span>Cook:&nbsp;</span>{recipe?.cook}</p>
              <p><span>Yield:&nbsp;</span>{recipe?.yield}</p>
            </div>
          </div>
        </section>
        <section className='mt-24 xl:mt-4 mx-4 xl:mx-0 text-black ingredients-background rounded p-4'>
          <h2 className='font-2-bold text-2xl'>Ingredients</h2>
          <div className='text-lg'>
            <ToastContainer
            position="top-right"
            autoClose={1300}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            {recipe.recipe_items?.map((item) => (
              <span className='flex content-center items-center item-container' key={item?.id}>
                <img src={item?.image} alt={item?.name} className='ingredient-size mr-2' />
                <p className='mr-2'>{item?.name} </p>
                <button onClick={() => toggleCart(item)} id="cart-option" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-1 text-center mr-2 mb-2">Add to Cart</button>
              </span>
            ))}
          </div>
        </section>
      </div>
      <section className=' py-10 px-6 xl:px-56 text-2xl mb-2'>
        <h2 className='font-2-bold mb-4 text-amber-500'>Directions:</h2>
        <div className='font-1 text-2xl'>
          {recipe.directions?.map((direction) =>(
            <div key={direction}>
              <p className='direction-container mb-8' >{direction}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-10 px-6 xl:px-56 text-2xl mb-2">
      <h2 className="underline text-center font-2-bold mb-4 text-blue-500 text-3xl pb-10">Comments</h2>
      <Link type="button" to={`/new_review/user/${userId}/recipe/${recipeId}`} className="flex justify-center">
        <button className='font-2-bold text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 rounded-lg  px-5 py-2 text-center mr-2 mb-14'>Share Your Thoughts</button>
      </Link> 
        {comments.map((comment) => (
          
          <Comments
            isUserComment = {comment?.userId === userIdx}
            key={comment.id}
            id={comment.id}
            recipeId={recipeId}
            comment={comment.comment}
          />
        ))}
      </section>
    </div>
  )}

export default Recipe
