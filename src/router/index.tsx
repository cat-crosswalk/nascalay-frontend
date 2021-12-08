import { Routes } from 'react-router'
import { Route, Navigate } from 'react-router-dom'
import { useCallback } from 'react'
import { useAppSelector } from '/@/store/hooks'

import Hello from '/@/pages/Hello'
import Index from '/@/pages/Index'
import Lobby from '/@/pages/Lobby'
import Theme from '/@/pages/Theme'
import Draw from '/@/pages/Draw'
import Answer from '/@/pages/Answer'
import Result from '/@/pages/Result'

const Router = () => {
  const isJoinRoom = useAppSelector((state) => state.status.isJoinRoom)
  const checkJoin = useCallback(
    (element: React.ReactElement) => {
      return isJoinRoom ? element : <Navigate to="/" />
    },
    [isJoinRoom]
  )

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/lobby" element={checkJoin(<Lobby />)} />
      <Route path="/theme" element={checkJoin(<Theme />)} />
      <Route path="/draw" element={checkJoin(<Draw />)} />
      <Route path="/answer" element={checkJoin(<Answer />)} />
      <Route path="/result" element={checkJoin(<Result />)} />
      <Route path="/hello/:name" element={<Hello />} />
    </Routes>
  )
}

export default Router
