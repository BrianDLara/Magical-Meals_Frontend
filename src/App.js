import './index.css'
import { Routes, Route } from 'react-router-dom'

import Test from './components/TestComponent'
import Nav from './components/Nav'
function App() {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Test />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
