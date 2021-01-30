import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ClassroomContext } from './SingleClassroom';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const ClassGroups = ({ classMeta, role }) => {
    const { groups } = useContext(ClassroomContext);

    useEffect(() => {});

    return (
        <div className="classroom_container-classgroups">
            {Object.keys(groups).length > 0 ? (
                Object.values(groups).map((group, index) => {
                    return (
                        <div
                            key={`gp-${index + 1}`}
                            className="classroom__group"
                        >
                            <h3>{`Group ${index + 1}`}</h3>
                            {group.members.map((member) => (
                                <div
                                    key={`student_container-${member.id}`}
                                    className="classroom_container_student-deets"
                                >
                                    <p
                                        key={`student_name-${member.id}`}
                                        className="student-name"
                                    >
                                        {member.name}
                                    </p>
                                    <div
                                        key={`student_avatar_container-${member.id}`}
                                        className="student-avatar"
                                    >
                                        <Avatar
                                            key={`student_avatar-${member.id}`}
                                            src={`${member.avatar_url}`}
                                        />
                                    </div>
                                    {role === 'instructor' ? (
                                        <div
                                            key={`student_admin-${member.id}`}
                                            className="student-ci-qs"
                                        >
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
                            ))}
                        </div>
                    );
                })
            ) : (
                <p className="no-groups">
                    There aren't any groups defined for this classroom.
                </p>
            )}
        </div>
    );
};

export default ClassGroups;
