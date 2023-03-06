import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {BASE_URL} from '../globals'


const EditReview = () => {
   //routed-dom imports
  let navigate = useNavigate()
  let { userId, recipeId } = useParams()

  //initial state of the form with useParams to assign the _id & product_id
    const initialState = {
        comment: '',
        userId: userId,
        recipeId: recipeId
    }

  const [formValues, setFormValues] = useState(initialState)
  const [comment, setComment] = useState(null)

  //finds a review
  useEffect(() => {
    const getComment = async () => {
      const res = await axios.get(`${BASE_URL}comments/comment/user_id/${userId}/recipe_id/${recipeId}`)
      setFormValues(res.data)
      setComment(res.data)
    }
    getComment()
  }, [recipeId, userId])
console.log(comment)

  //refreshes the page. It will be used after submitting a form
  const handleRefresh = () => {
    window.location.reload(false)
  }

  //assigns the form inputs to the appropriate keys.
  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  
  //if-else statement that distinguishes between a post-review axios call vs put-review axios call
  const handleSubmit = (e) => {
    if (comment.length === 0){
      e.preventDefault()
      axios.post(`${BASE_URL}comments/create/user_id/${userId}/recipe_id/${recipeId}`, formValues)
      navigate(`/user_id/${userId}/recipe/${recipeId}`)
    //   handleRefresh()
    } else {
      e.preventDefault()
      axios.put(`${BASE_URL}comments/update/user_id/${userId}/recipe_id/${recipeId}`, formValues)
      navigate(`/user_id/${userId}/recipe/${recipeId}`)
    //   handleRefresh()
    }
  }

  return (
    <div className="w-full max-w-xs min-h-screen text-white container pt-24">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Comment*/}
        <section className="mb-4">                     
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="comment">Write your thoughts</label>
            
            <textarea
                onChange={handleChange}
                value={formValues.comment}
                name="comment"
                type="text"
                cols="80"
                rows="8"
                placeholder="Write Here"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
        </section>

        <div className="submit-button-container">
            <button
            type="submit"
            className="register-button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Submit
            </button>
        </div>
        </form>
    </div>
    )
}

export default EditReview
