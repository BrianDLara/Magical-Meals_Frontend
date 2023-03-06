import React from 'react'
import axios from 'axios'
import {BASE_URL} from '../globals'
import { Link, useParams } from 'react-router-dom'
const Comments = ({comment, userIdx}) => {
  let {userId, recipeId } = useParams() 
    
  const handleRefresh = () => {
    window.location.reload(false);
  }

  const handleDelete = async () => {
      await axios.delete(`${BASE_URL}comments/user_id/${userId}/recipe_id/${recipeId}`)
      handleRefresh();
      
  }
 
  return(
    <div>
      <div id='font-1 text-xl md:text-2xl'>
        <Link comment={comment} to={ `/review/user/${userId}/recipe/${recipeId}/edit_review` }> 
          <button className='review-link text-base md:text-2xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2 mr-1 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Edit</button>
        </Link>
        <span className='review-link-divider px-1'>|</span>
        <button onClick={handleDelete}  className='text-base md:text-2xl focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-3 py-2 ml-1 mr-2 mb-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Delete</button>
      </div> 
      <h3 className='comments-container mb-8 text-xl md:text-2xl'>{comment}</h3>
       
    </div>
  )
}

export default Comments
