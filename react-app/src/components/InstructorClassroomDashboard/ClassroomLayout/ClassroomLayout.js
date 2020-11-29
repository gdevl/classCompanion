import React from 'react'
import UserCardContainer from '../UserCard/UserCardContainer'
import GroupCardContainer from '../GroupCard/GroupCardContainer'

export default function ClassroomLayout({ props }) {

  if (!props) return null
  //if no groups are set to false, then render everyone individually
  if (!props.groups.length >= 1) {
    return (
      <>
        {props.students.map(user => {
          return (
            <UserCardContainer key={user.id} props={user} />
          )
        })}
      </>
    )
  }

  //if groups are set to true render group containers based on the size of the groups
  if (props.groups.length >= 1) {
    let groups = [];
    for(let i = 0; i < props.groups.length; i++){
      groups.push(`Group ${i+1}`)
    }

    return (
      <>
        < GroupCardContainer props={ { groups, members: props.groups } } />
      </>
    )
  }

}
