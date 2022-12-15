import './index.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Authentication imports

import { CheckSession } from './services/Auth'

import Nav from './components/Nav'
import FooterNav from './components/FooterNav'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import Favorite from './pages/Favorite'
import Cart from './pages/Cart'
import About from './pages/About'
import Settings from './pages/Settings'
import EditReview from './pages/EditReview'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])
  return (
    <div className="App">
      <header>
        <Nav
          authenticated={authenticated}
          user={user}
          handleLogOut={handleLogOut}
        />
      </header>
      <main>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route
            path="/"
            element={<Home user={user} authenticated={authenticated} />}
          />
          <Route
            path="/user_id/:userId/recipe/:recipeId"
            element={<Recipe user={user} />}
          />
          <Route path="favorite/:userId" element={<Favorite />} />
          <Route path="cart/:userId" element={<Cart user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings/:userId" element={<Settings />} />
          <Route
            path="/new_review/user/:userId/recipe/:recipeId"
            element={<EditReview />}
          />
          <Route
            path="/review/user/:userId/recipe/:recipeId/edit_review"
            element={<EditReview />}
          />
        </Routes>
      </main>
      <footer>
        <FooterNav authenticated={authenticated} user={user} />
      </footer>
    </div>
  )
}

export default App
