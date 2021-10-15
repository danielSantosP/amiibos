import React from 'react'
import { CircularProgress } from '@chakra-ui/progress'

const Loading = () => {
  return (
    <CircularProgress
      isIndeterminate
      valueText="Carregando..."
      color="var(--chakra-colors-blue-800)"
    />
  )
}

export default Loading
