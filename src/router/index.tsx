import { Routes } from 'react-router'
import { Route } from 'react-router-dom'

import Hello from '/@/pages/Hello'
import Index from '/@/pages/Index'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/hello/:name" element={<Hello />} />
    </Routes>
  )
}

export default Router
