import React from 'react'
import Box from '@material-ui/core/Box';
import GroupCard from './GroupCard'
import './GroupCard.css'

export default function GroupCardContainer({ props }) {

  if (!props) return null
  return (
    <>
      {props.groups.map((group, i) => {
        return (
          <Box key={`groupContainer${i}`} className='groupCardContainer'>
          <GroupCard key={`groupCard${i}`} props={{ group, members: props.members[i] }} />
          </Box>
        )
      })}
    </>
  )
}
