import { Routes } from 'react-router'
import { Route } from 'react-router-dom'

import Hello from '/@/pages/Hello'
import Index from '/@/pages/Top'
import Lobby from '/@/pages/Lobby'
import Theme from '/@/pages/Theme'
import Draw from '/@/pages/Draw'
import Answer from '/@/pages/Answer'
import Result from '/@/pages/Result'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/theme" element={<Theme />} />
      <Route path="/draw" element={<Draw />} />
      <Route path="/answer" element={<Answer />} />
      <Route path="/result" element={<Result />} />
      <Route path="/hello/:name" element={<Hello />} />
    </Routes>
  )
}

export default Router
