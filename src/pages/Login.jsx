import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const Login = ({ toggleAuthenticated, setUser }) => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ username: '', password: '' })
    setUser(payload)
    toggleAuthenticated(true)
    navigate('/')
  }
  return (
    <div className="text-lg w-full max-w-xs min-h-screen text-white container pt-24">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          
          {/* Username Section */}
          <section className="mb-4">
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              name="username"
              type="username"
              placeholder="Username"
              value={formValues.username}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </section>

          {/* Password Section */}
          <section className="mb-6">
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="*********"
              value={formValues.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </section>
          
          {/* Login Button */}
          <button
            disabled={!formValues.username || !formValues.password}
            className="register-button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>

          {/* Register message & Link */}
          <span className='block text-gray-700 text-sm font-bold mb-2 mt-12 text-center'>
            <h3>Haven't made an account yet? &nbsp;</h3>
            <Link to="/register">
              <h3 className='text-green-700'>Register Here</h3>
            </Link>
          </span>
          
          {/* Admin login */}
          <div> 
            <p>username: admin</p>
            <p>password: admin</p>
          </div>
        </form>
      
    </div>
  )
}

export default Login
