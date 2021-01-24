import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const ClassList = ({ classMeta, role }) => {
    return (
        <>
            {classMeta['students'].length > 0 ? (
                classMeta['students'].map((student) => (
                    <div className="classroom_container_student-deets">
                        <p className="student-name">
                            {`${student.first_name} ${student.last_name}`}
                        </p>
                        {/* <p className="student-email">{student.email}</p> */}
                        <div className="student-avatar">
                            <Avatar src={`${student.avatar_url}`} />
                        </div>
                        {role === 'instructor' ? (
                            <div className="student-ci-qs">
                                <CheckCircleIcon
                                    fontSize="medium"
                                    color="disabled"
                                    //   style={{ color: 'green' }}
                                    className="student-checked_in"
                                />

                                <QuestionAnswerIcon
                                    color="disabled"
                                    //   color="primary"
                                    fontSize="medium"
                                    className="student-question"
                                />
                            </div>
                        ) : null}
                    </div>
                ))
            ) : (
                <p className="no-students">
                    You haven't added any students to this classroom.
                </p>
            )}
        </>
    );
};

export default ClassList;