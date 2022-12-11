import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'

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
    await RegisterUser({
      name: formValues.name,
      username: formValues.username,
      password: formValues.password
    })

    setFormValues(initialState)

    navigate('/login')
  }

    return (
    <div className="register-container min-h-screen text-white container">
        <form className="form-items" onSubmit={handleSubmit}>
        {/* new user Full name */}
        <section className="section-container top-section">
            <div className="field-container">
            <div className="field-text">
                <label htmlFor="name">Name:</label>
            </div>
            <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Full Name"
                value={formValues.name}
                className="text-input text-black"
                required
            />
            </div>
        </section>
        <section className="section-container">
            <div className="field-container">
            <div className="field-text">
                <label htmlFor="username">Username</label>
            </div>
            <input
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="username"
                value={formValues.username}
                className="text-input text-black"
                required
            />
            </div>
        </section>
        <section className="section-container">
            <div className="field-container">
            <div className="field-text">
                <label htmlFor="password">Password</label>
            </div>
            <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                value={formValues.password}
                className="text-input text-black"
                required
            />
            </div>
            <div className="field-container">
            <div className="field-text">
                <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                className="text-input text-black"
                required
            />
            </div>
        </section>

        <div className="submit-button-container">
            <button
            type="submit"
            className="submit-button"
            disabled={
                !formValues.email ||
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
