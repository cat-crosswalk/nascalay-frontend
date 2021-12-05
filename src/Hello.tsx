import styled from '@emotion/styled'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Hello = () => {
  const PurpleDiv = styled.div`
    color: purple;
    font-size: 10em;
  `

  const { name } = useParams()

  return (
    <div>
      <PurpleDiv>Hello {`${name ?? 'React'} !`}</PurpleDiv>
      <Link to="/">Go to home</Link>
    </div>
  )
}

export default Hello
