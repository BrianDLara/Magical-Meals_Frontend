import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { SignInUser } from '../services/Auth'
// import { redirectToLogin } from '../services/Auth'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ toggleAuthenticated, setUser }) => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  
  const notifyUser = () => toast.error("Username or Password did not match your login credentials!");
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues).catch(
      function (error) {
        notifyUser()
        return Promise.reject(error)
      }
    )
    setFormValues({ username: '', password: '' })
    setUser(payload)
    toggleAuthenticated(true)
    navigate('/')
  }

  // const krogerLogin = async (e) => {
  //   e.preventDefault()
  //   const payload = await redirectToLogin().catch(
  //     function (error) {
  //       notifyUser()
  //       return Promise.reject(error)
  //     }
  //   )
  //   setUser(payload)
  //   toggleAuthenticated(true)
  //   // navigate('/')
  // }

  return (
    <div className="text-lg w-full max-w-xs min-h-screen text-white container pt-24">
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
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          
          {/* Username Section */}
          <section className="mb-4">
            <label className='text-lg font-2 block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              name="username"
              type="username"
              placeholder="Username"
              value={formValues.username}
              className="font-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </section>

          {/* Password Section */}
          <section className="mb-6">
            <label className='text-lg font-2 block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="*********"
              value={formValues.password}
              className="font-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </section>
          
          <div className='flex flex-col'>
            {/* Login Button */}
            <button
              disabled={!formValues.username || !formValues.password}
              className="register-button disabled:transform-none disabled:bg-gray disabled:transition-none disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold mb-8 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>

            {/* Login with kroger Button */}
            {/* <button
              className="register-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={krogerLogin}
            >
              Login with kroger
            </button> */}
          </div>

          {/* Register message & Link */}
          <span className='block text-gray-700 text-sm font-bold mb-2 mt-12 text-center'>
            <h3 className='text-lg font-2'>Haven't made an account? &nbsp;</h3>
            <Link to="/register">
              <h3 className='text-xl font-2-bold text-green-700 hover:text-green-900 mt-2'>Register Here</h3>
            </Link>
          </span>
        </form>
          {/* Admin login */}
          <div className='font-1 text-center text-2xl pt-2'> 
            <p className='font-2-bold text-xl'>Quick Login:</p>
            <p>Username: <span className='text-green-600'>admin</span></p>
            <p>Password: <span className='text-green-600'>admin</span></p>
          </div>
      
    </div>
  )
}

export default Login
