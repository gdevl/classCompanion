import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

const InstructorBlock = ({ classMeta }) => {
    useEffect(() => {
        console.log('classMeta:');
        console.log(classMeta);
    }, [classMeta]);
    return (
        <>
            <h3>Instructors</h3>
            {classMeta['instructors']
                ? classMeta['instructors'].map((instructor) => (
                      <div className="user_avatar-row">
                          <Avatar src={`${instructor.avatar_url}`} />
                          <p>{`${instructor.first_name} ${instructor.last_name}`}</p>
                      </div>
                  ))
                : null}
        </>
    );
};

export default InstructorBlock;
