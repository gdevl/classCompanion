import React from 'react'
import Box from '@material-ui/core/Box';
import UserCard from './UserCard'

export default function UserCardContainer({ props }) {

  return (
    <Box className='userCardContainer'>
      <UserCard props={ props } />
    </Box>
  )
}
