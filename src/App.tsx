import emotionReset from 'emotion-reset'
import { Global, css } from '@emotion/react'
import './App.css'
import Router from '/@/router/index'

const App = () => {
  return (
    <div>
      <Global
        styles={css`
          ${emotionReset}

          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `}
      />
      <header>Welcome to React Router!</header>
      <Router />
    </div>
  )
}

export default App
