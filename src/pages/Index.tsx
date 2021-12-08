import { css } from '@emotion/react'
import React, { useState, useCallback } from 'react'
import logo from '/@/assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '/@/store/hooks'
import { increment } from '/@/store/slice/counter'
import { joinRoom } from '../store/slice/status'

// TODO:クエリがある場合は，招待リンクを踏んだパターンとして表示を変える
const Index = () => {
  const style = css`
    color: red;
    background-color: blue;
  `
  const count = useAppSelector((state) => state.counter.value)
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const goRobby = useCallback(() => {
    dispatch(joinRoom())
    navigate('/lobby', { replace: false })
  }, [navigate, dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p css={style}>Hello Vite + React!</p>
        <button type="button" onClick={goRobby}>
          参加する(Go Lobby)
        </button>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <Link to={`/hello/${name || 'React'}`}>Go to Hello</Link>
        <p>
          <button type="button" onClick={() => dispatch(increment())}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default Index
