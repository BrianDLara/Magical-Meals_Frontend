import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Settings = () => {
  // const navigate = useNavigate()
  
  useEffect(() => {
    // get user info
    const getUser = async () => {
        const res = await axios.get(`http://localhost:3001/api/users/id/${userId}`)
        setUserInfo(res.data)
    }
    
    getUser()

}, [userId])
  
  const [formValues, setFormValues] = useState({name:'', username: '', password: '' })



  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    // e.preventDefault()
    // const payload = await SignInUser(formValues)
    // setFormValues({ username: '', password: '' })
    // setUser(payload)
    // toggleAuthenticated(true)
    // navigate('/')
  }

  return (
    <div className="text-lg w-full max-w-xs min-h-screen text-white container pt-24">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">        
          {/* Username Section */}
          <section className="mb-4">
            <label className='text-lg font-2 block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Current Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="name"
              placeholder="Name"
              value={formValues.name}
              className="font-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </section>

          {/* Username Section */}
          <section className="mb-4">
            <label className='text-lg font-2 block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Current Username</label>
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
            <label className='text-lg font-2 block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Current Password</label>
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
          
          {/* Login Button */}
          <button
            disabled={!formValues.username || !formValues.password}
            className="register-button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Info
          </button>

        </form>
          
      
    </div>
  )
}

export default Settings
