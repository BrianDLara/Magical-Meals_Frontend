import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'
import {BASE_URL} from '../globals'


const Register = () => {
  const initialState = {
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  let navigate = useNavigate()


  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await RegisterUser({
      name: formValues.name,
      username: formValues.username,
      password: formValues.password
    })
    await axios.post(`${BASE_URL}carts/user_id/${res.id}`)
    
    setFormValues(initialState)

    navigate('/login')
  }

    return (
    <div className="w-full max-w-xs min-h-screen text-white container pt-24">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        {/* Full name */}
        <section className="mb-4">                     
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Name:</label>
            
            <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Full Name"
                value={formValues.name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
        </section>
        
        {/* Username */}
        <section className="mb-6">          
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>           
            <input
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="username"
                value={formValues.username}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />           
        </section>
        
        {/* password inputs */}
        <section className="mb-6">           
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>         
            <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                value={formValues.password}
                className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
            {/* confirm password */}
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="confirmPassword">Confirm Password</label>
            <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
        </section>

        <div className="submit-button-container">
            <button
            type="submit"
            className="register-button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={
                !formValues.username ||
                (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
            >
            Submit
            </button>
        </div>
        </form>
    </div>
    )
    }

export default Register
