import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Recipe = () => {
  let {recipeId} = useParams()
  const [recipe, setRecipe] = useState([])

  useEffect(() => {
    const GetRecipesWithItems = async () => {
      const res = await axios.get(`http://localhost:3001/api/recipes/id/${recipeId}`)
      setRecipe(res.data)
      console.log(res.data)
    }
    GetRecipesWithItems()
  },[])

  return(
      <div className='min-h-screen container px-auto text-white' key={recipe.id}>
        <img src={recipe.image} alt={recipe.name} className="banner-image pt-20"/>
        
        <section className='text-center px-20 py-10'> 
          <h1 className='text-6xl font-1-bold pt-6'>{recipe?.name}</h1>
          <p className='text-2xl font-2 pt-10 pb-6'>{recipe?.description}</p>
        </section>
        <div className='flex place-content-around'>
          <section className='relative top-14 py-8 solid-circle shadow-2xl'>
            <div className="dotted-circle times-background">
              <div className='text-2xl flex flex-col place-items-center relative top-24'> 
                <p><span>Prep:&nbsp;</span>{recipe?.prep}</p>
                <p><span>Cook:&nbsp;</span>{recipe?.cook}</p>
                <p><span>Yield:&nbsp;</span>{recipe?.yield}</p>
              </div>
            </div>
          </section>
          <section className='text-black ingredients-background rounded mt-4 p-4'>
            <h2 className='font-2-bold text-2xl'>Ingredients</h2>
            <div className='text-lg'>
              {recipe.recipe_items?.map((item) => (
                <span className='flex content-center items-center item-container'><img src={item?.image} alt={item?.name} className='ingredient-size'/>&nbsp;&nbsp;&nbsp;{item?.name}&nbsp;&nbsp;&nbsp;<button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-1 text-center mr-2 mb-2">Add to Cart</button></span>
              ))}
            </div>
          </section>
        </div>
        <section className='py-10'>
          <h2>Directions</h2>
          <div>
            {recipe.directions?.map((direction) =>(
              <p>{direction}</p>
            ))}
          </div>
        </section>
      </div>
  )}

export default Recipe
