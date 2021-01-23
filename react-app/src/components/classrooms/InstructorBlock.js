import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const InstructorBlock = ({ classMeta }) => {
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
