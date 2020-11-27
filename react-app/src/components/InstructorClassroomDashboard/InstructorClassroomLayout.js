import React from 'react'
import ClassroomLayoutContainer from './ClassroomLayout/ClassroomLayoutContainer'
import ClassroomNav from './ClassroomNav/ClassroomNavContainer'
import {useSelector} from 'react-redux'

export default function InstructorClassroomLayout() {
  const classList = useSelector(state => state.store.classrooms)
  const currentClassrom = 1

  if(!classList) return null
  return (
    <>
      <ClassroomNav />
      <ClassroomLayoutContainer props={ classList[currentClassrom] } />
    </>
  )
}
