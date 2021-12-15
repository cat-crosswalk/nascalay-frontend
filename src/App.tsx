import emotionReset from 'emotion-reset'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Global, css } from '@emotion/react'
import './App.css'
import Router from '/@/router/index'
import { useAppDispatch } from '/@/store/hooks'
import { addPageEventListener } from '/@/scripts/changePageEvent'
import bgYellow from '/@/assets/bg/bgYellow.svg'
import bgBlue from '/@/assets/bg/bgBlue.svg'
import bgRed from '/@/assets/bg/bgRed.svg'

import { removeBeforeUnload, setBeforeUnload } from './utils/beforeunload'

const App = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [bgImage, setBgImage] = useState(bgYellow)
  const [bgColor, setBgColor] = useState('#DCCCA2')
  const { pathname } = useLocation()
  useEffect(() => {
    // wsEventを監視して画面遷移する
    // HACK: navigateとdispatchを渡してる実装やばそう
    addPageEventListener(navigate, dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (pathname !== '/') {
      setBeforeUnload()
      return () => {
        removeBeforeUnload()
      }
    }
  }, [pathname])

  // 背景画像の変更
  useEffect(() => {
    const path = pathname.toLowerCase()
    switch (path) {
      case '/':
        setBgImage(bgYellow)
        setBgColor('#DCCCA2')
        break
      case '/lobby':
      case '/theme':
      case '/draw':
      case '/result':
        setBgImage(bgBlue)
        setBgColor('#96A0C0')
        break
      case '/answer':
        setBgImage(bgRed)
        setBgColor('#D1A9A9')
        break
    }
  }, [pathname])
  return (
    <div>
      <Global
        styles={css`
          ${emotionReset}

          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smooth: auto;
          }

          body {
            background-image: url(${bgImage});
            background-color: ${bgColor};
          }

          body,
          input,
          button,
          select,
          textarea {
            font-family: 'Kiwi Maru', -apple-system, BlinkMacSystemFont,
              'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
              'Droid Sans', 'Helvetica Neue', sans-serif;
          }
        `}
      />
      <Router />
    </div>
  )
}

export default App
