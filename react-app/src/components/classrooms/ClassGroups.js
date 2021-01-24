import React, { useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

const ClassGroups = ({ classMeta, role }) => {
    const groupNumber = useRef(0);
    return (
        <>
            {classMeta["groups"].length > 0 ? (
                classMeta["groups"].map((group) => (
                    <div className="classroom__group">
                        <h3>{`Group ${(groupNumber.current += 1)}`}</h3>
                        {group.members.map((member) => (
                            <div className="classroom_container_student-deets">
                                <p className="student-name">
                                    {`${member.first_name} ${member.last_name}`}
                                </p>
                                <div className="student-avatar">
                                    <Avatar src={`${member.avatar_url}`} />
                                </div>
                                {role === "instructor" ? (
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
                        ))}
                    </div>
                ))
            ) : (
                <p className="no-groups">
                    There aren't any groups defined for this classroom.
                </p>
            )}
        </>
    );
};

export default ClassGroups;