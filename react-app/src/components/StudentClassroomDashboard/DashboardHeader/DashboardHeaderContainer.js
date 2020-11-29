import React from 'react'
import Box from '@material-ui/core/Box';
import DashboardHeader from './DashboardHeader'
import './DashboardHeader.css'

export default function DashboardHeaderContainer({ props }) {
  return (
    <Box className='dashboardHeaderContainer'>
      <DashboardHeader props={ props } />
    </Box>
  )
}
