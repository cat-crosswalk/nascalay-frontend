import './App.css'
import { Routes } from 'react-router'
import { Route } from 'react-router-dom'
import Hello from '/@/pages/Hello'
import Index from '/@/pages/Index'

const App = () => {
  return (
    <div>
      <header>Welcome to React Router!</header>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/hello/:name" element={<Hello />} />
      </Routes>
    </div>
  )
}

export default App
