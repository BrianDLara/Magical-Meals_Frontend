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
    <div className="login-container min-h-screen text-white">
      <div className="card-overlay">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              name="username"
              type="username"
              placeholder="Username"
              value={formValues.username}
              className="input text-black"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="*********"
              value={formValues.password}
              className="input text-black"
              required
            />
          </div>
          <button
            disabled={!formValues.username || !formValues.password}
            className="form-button"
          >
            Login
          </button>
          <span id="register-container">
            <h3>Haven't made an account yet? &nbsp;</h3>
            <Link to="/register">
              <h3>Register Here</h3>
            </Link>
          </span>
          <p>username: admin</p>
          <p>password: admin</p>
        </form>
      </div>
    </div>
  )
}

export default Login
