import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { UpdateUser } from '../services/Auth'
import {BASE_URL} from '../globals'


// import { useNavigate, Link } from 'react-router-dom'

const Settings = () => {
  // const navigate = useNavigate()
  let {userId} = useParams()
  const [userName, setUserName] = useState(null)
  const [userUsername, setUserUsername] = useState(null)
  
  useEffect(() => {
    // get user info
    const getUser = async () => {
      const res = await axios.get(`${BASE_URL}users/id/${userId}`)
      setUserName(res.data.name)
      setUserUsername(res.data.username)
      
      
    }
    
    getUser()
    
  }, [userId])
  
  
  const userInitialState = {
    name: userName,
    username: userUsername,
  }

  const passwordInitialState = {
    oldPassword: '',
    newPassword: '',
  }
  const [userFormValues, setUserFormValues] = useState(userInitialState)
  const [passwordFormValues, setPasswordFormValues] = useState(passwordInitialState)



  const userHandleChange = (e) => {
    setUserFormValues({ ...userFormValues, [e.target.name]: e.target.value })
  }
  const passwordHandleChange = (e) => {
    setPasswordFormValues({ ...passwordFormValues, [e.target.name]: e.target.value })
  }
  
  const updateUser = async (e) => {
    e.preventDefault()
    await UpdateUser({userId, userFormValues})
    // navigate('/')
  }

  const updatePassword = async (e) => {
    // e.preventDefault()
    // const payload = await SignInUser(formValues)
    // setFormValues({ username: '', password: '' })
    // setUser(payload)
    // toggleAuthenticated(true)
    // navigate('/')
  }

  return (
    <div className="text-lg w-full max-w-xs min-h-screen text-white container pt-12 pb-24">
        <h1 className='font-2-bold text-xl md:text-2xl text-center mx-4 pb-10'>Update Your Current Info</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">        
          {/* Username Section */}
          <p className='font-1 text-3xl text-center  block text-gray-700 text-sm font-bold mb-2 pb-4'>update Info</p>

          <section className="mb-4">
            <label className='text-lg font-2 block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Name</label>
            <input
              onChange={userHandleChange}
              name="name"
              type="name"
              placeholder={`Current Name: ${userName}`}
              value={userFormValues.name}
              className="font-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </section>

          {/* Username Section */}
          <section className="mb-4">
            <label className='text-lg font-2 block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
            <input
              onChange={userHandleChange}
              name="username"
              type="username"
              placeholder={`current username: ${userUsername}`}
              value={userFormValues.username}
              className="font-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </section>
          {/* Update User*/}
          <button
            onClick={updateUser} className="mb-8 register-button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
          <p className='form-border font-1 text-3xl text-center  block text-gray-700 text-sm font-bold mb-2 pt-10 mt-2 pb-4'>update password</p>
          {/* Password Section */}
          <section className="mb-6">
            <label className='text-lg font-2 block text-gray-700 text-sm font-bold mb-2' htmlFor="oldPassword">Current Password</label>
            <input
              onChange={passwordHandleChange}
              type="text"
              name="oldPassword"
              placeholder=''
              value={passwordFormValues.oldPassword}
              className="font-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </section>

          <section className="mb-6">
            <label className='text-lg font-2 block text-gray-700 text-sm font-bold mb-2' htmlFor="newPassword">New Password</label>
            <input
              onChange={passwordHandleChange}
              type="text"
              name="newPassword"
              placeholder=''
              value={passwordFormValues.newPassword}
              className="font-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </section>
          
          {/* password Button */}
          <button
          onClick={updatePassword}  className="register-button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Password
          </button>

        </form>
          
      
    </div>
  )
}

export default Settings
