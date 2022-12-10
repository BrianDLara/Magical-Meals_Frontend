import './index.css'
import { Routes, Route } from 'react-router-dom'

import Nav from './components/Nav'
import Home from './pages/Home'
import Recipe from './pages/Recipe'

function App() {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="recipe/:recipeId" element={<Recipe />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
