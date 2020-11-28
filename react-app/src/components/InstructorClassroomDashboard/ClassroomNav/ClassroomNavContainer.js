import React from 'react'
import Box from '@material-ui/core/Box';
import ClassroomNav from './ClassroomNav'
import './ClassroomNav.css'

export default function ClassroomNavContainer() {
  return (
    <Box className='classroomNavConatiner'>
      <ClassroomNav />
    </Box>
  )
}
