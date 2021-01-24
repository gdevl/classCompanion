import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { getRoster, fetchRoster } from "../../store/roster";

const ClassGroups = ({ classMeta, role }) => {
    const dispatch = useDispatch();
    const groupNumber = useRef(0);
    const classGroups = useSelector((state) => state.groups);
    const roster = useSelector((state) => state.roster.all);

    // console.log("groups: ", groups);
    // console.log("classMeta['students']:", classMeta["students"]);
    // console.log("Array.from(groups)");
    // console.log(Object.values(groups));
    // const students = classMeta["students"];
    // console.log("members: ", members);
    // console.log("Object.values(members[0]): ", Object.values(members[0]));
    // console.log("students: ", students);
    // console.log("students[0].id: ", students[0].id);

    useEffect(() => {
        (async () => {
            const request = await fetchRoster(classMeta.id);
            dispatch(getRoster(request));
        })();
    }, []);

    const groups = Object.values(classGroups);
    console.log("roster: ", roster);
    // console.log("Object.keys(roster): ", Object.keys(roster));
    console.log("groups: ", groups);

    return (
        <>
            {Object.keys(classGroups).length > 0 ? (
                Object.values(classGroups).map((classGroup) => (
                    <div className="classroom__group">
                        <h3>{`Group ${(groupNumber.current += 1)}`}</h3>
                        {classGroup.members.map((member) => (
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
