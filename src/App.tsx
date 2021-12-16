import emotionReset from 'emotion-reset'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Global, css } from '@emotion/react'
import './App.css'
import Router from '/@/router/index'
import { useAppDispatch } from '/@/store/hooks'
import { addPageEventListener } from '/@/scripts/changePageEvent'
import { bgImageData, PageNames } from '/@/scripts/bgImage'
import { removeBeforeUnload, setBeforeUnload } from './utils/beforeunload'

const App = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
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
            background-image: url(${bgImageData[
              pathname.toLocaleLowerCase() as PageNames
            ].image});
            background-color: ${bgImageData[
              pathname.toLocaleLowerCase() as PageNames
            ].color};
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
