import { css } from '@emotion/react'
import React, { useState } from 'react'
import logo from 'assets/logo.svg'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { increment } from 'utils/store/counter'

const Index = () => {
  const style = css`
    color: red;
    background-color: blue;
  `
  const count = useAppSelector((state) => state.counter.value)
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p css={style}>Hello Vite + React!</p>
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
