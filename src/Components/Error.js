import React from 'react'
import { Alert, AlertTitle } from '@chakra-ui/alert'

const Error = ({ error }) => {
  return (
    <Alert status="error" justifyContent="center" width="40%">
      <AlertTitle>{error}</AlertTitle>
    </Alert>
  )
}

export default Error
