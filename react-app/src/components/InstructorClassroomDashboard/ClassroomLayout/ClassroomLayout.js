import React from 'react'
import UserCardContainer from '../UserCard/UserCardContainer'
import GroupCardContainer from '../GroupCard/GroupCardContainer'

export default function ClassroomLayout({ props }) {

  if (!props) return null
  //if no groups are set to false, then render everyone individually
  if (!props.groups.grouped) {
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
  if (props.groups.grouped) {
    //shuffle array function
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    // let arr = [1, 2, 3, 4, 5];
    // shuffleArray(arr);

    //determine the number of groups
    const numGroups = Math.ceil(props.users.length / props.groups.groupSize)

    //create an array of groups to map
    let groups = [];
    for(let i = 0; i < numGroups; i++){
      groups.push(`Group ${i+1}`)
    }
    let users = props.users.map(user => user)

    let members = [];
    for(let i = 0; i < groups.length; i++) {
      let groupMembers = [];
      for(let j = 0; j < props.groups.groupSize; j++) {
        shuffleArray(users)
        if(users.length > 0){
          let member = users.pop()
          groupMembers.push(member)
        }
      }
      members.push(groupMembers)
    }


    return (
      <>
        < GroupCardContainer props={ { groups, members } } />
      </>
    )
  }

}
