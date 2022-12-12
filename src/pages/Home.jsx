import axios from 'axios'
import React from 'react'
import Popular from '../components/Popular'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({user, authenticated}) => {
    const navigate = useNavigate()

    const [trending, setTrending] = useState([])
    const [popular, setPopular] = useState([])

    useEffect(()=> {
        const getTrendingRecipes = async () => {
            const res = await axios.get(`http://localhost:3001/api/recipes/get_all`)    
            setTrending(res.data[Math.floor(Math.random() * res.data.length)])            
        }

        const getPopularRecipes = async () => {
            const res = await axios.get(`http://localhost:3001/api/recipes/get_all`)    
            setPopular(res.data)            
        }

        getTrendingRecipes()
        getPopularRecipes()
    }, [])
    
    const productShuffle = (event) => {
        for (let i = event.length - 1; i > 0; i--) {
            const randomProduct = Math.floor(Math.random() * (i + 1))
            ;[event[i], event[randomProduct]] = [event[randomProduct], event[i]]
        }
    }

    productShuffle(trending)

    const scrLeft = () => {
        let left = document.querySelector('.scroll-images')
        left.scrollBy(-350, 0)
    }
    
    const scrRight = () => {
        let right = document.querySelector('.scroll-images')
        right.scrollBy(350, 0)
    }

    return user && authenticated ? ( 
        <div className='bg-slate-900 text-white pt-2'>
            <div className='grid min-h-screen place-items-center'> 
                <section className=' w-4/5 md:w-3/5'> 
                    <h1 className='text-4xl font-1-bold pb-6 pt-20'>What's Trending</h1>
                    <div className='trending-container'>
                            <Link to={`/user_id/${user?.id}/recipe/${trending.id}`} key={trending.id}>
                                <img src={trending.image} alt={trending.name} className="trending-img" />
                                <h5 className='trending-name px-8 py-6 font-2-bold text-2xl'>{trending.name}</h5>     
                            </Link>
                    </div>
                </section>
                <section> 
                    <h1 className='text-4xl pl-6 md:pl-24 font-1-bold pb-6 pt-20'>Popular Recipes This Week</h1>
                    <div id="inline">
                        <span id="scrLeft" onClick={scrLeft}></span>
                        <div className="popular-container inline-snap scroll-images">
                            {popular.map((recipe) => (
                                <Link to={`/user_id/${user?.id}/recipe/${recipe.id}`} key={recipe.id}>
                                    <Popular
                                        key={recipe.id}
                                        id={recipe.id}
                                        name={recipe.name}
                                        image={recipe.image}
                                    />
                                </Link>
                            ))}
                        </div>
                        <span id="scrRight" onClick={scrRight}></span>
                    </div>
                    
                </section>
            </div>
        </div>
    ) : (
        <div className="protected text-white">
          <h3>Oops! You must be logged in to gain access to all this amazing recipes!</h3>
          <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => navigate('/login')}>Login</button>
        </div>
      )
}

export default Home
