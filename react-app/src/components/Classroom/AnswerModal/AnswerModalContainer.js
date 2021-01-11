import React from 'react'
import Box from '@material-ui/core/Box';
import AnswerModal from './AnswerModal'

export default function AnswerModalContainer({ props }) {
  return (
    <Box className='answerModalContainer '>
      <AnswerModal props={ props }/>
    </Box>
  )
}
