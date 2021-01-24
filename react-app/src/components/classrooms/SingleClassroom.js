import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getClassroomMeta,
    fetchClassroomData,
} from "../../store/classroom_meta";
import { setClassGroups, fetchClassGroups } from "../../store/groups";
import ClassroomContainer from "./ClassroomContainer";
import UserCardContainer from "../InstructorClassroomDashboard/UserCard/UserCardContainer";
import GroupCardContainer from "../InstructorClassroomDashboard/GroupCard/GroupCardContainer";

const SingleClassroom = ({ userId }) => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);
    const currentClassroomId = useSelector((state) => state.currentClassroomId);
    const classMeta = useSelector((state) => state.currentClassroomMeta);
    const groups = useSelector((state) => state.groups);

    useEffect(() => {
        (async () => {
            const query = await fetchClassroomData(currentClassroomId);
            dispatch(getClassroomMeta(query));
        })();
        setLoaded(true);
    }, []);

    useEffect(() => {
        (async () => {
            const groupData = await fetchClassGroups(currentClassroomId);
            dispatch(setClassGroups(groupData));
        })();
    }, []);

    if (!currentUser) return null;
    if (!currentClassroomId) return null;
    if (!classMeta) return null;

    if (!loaded) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {classMeta["id"] ? (
                <ClassroomContainer
                    classMeta={classMeta}
                    role={currentUser.role}
                    userId={userId}
                    groups={groups}
                />
            ) : null}
        </>
    );

    if (!classMeta.students) {
        return (
            <>
                <div className="loading">
                    <p>Loading...</p>
                </div>
            </>
        );
    }

    //if there aren't any groups set, render everyone individually
    if (!classMeta.groups.length >= 1) {
        return (
            <>
                {classMeta.students.map((student) => {
                    return (
                        <UserCardContainer key={student.id} props={student} />
                    );
                })}
            </>
        );
    }

    //if groups are set, render group containers based on the size of the groups
    if (classMeta.groups.length >= 1) {
        let groups = [];
        for (let i = 0; i < classMeta.groups.length; i++) {
            groups.push(`Group ${i + 1}`);
        }

        return (
            <>
                <GroupCardContainer
                    props={{ groups, members: classMeta.groups }}
                />
            </>
        );
    }
};

export default SingleClassroom;
