import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getClassroomMeta,
    fetchClassroomData,
} from '../../store/classroom_meta';
import UserCardContainer from '../InstructorClassroomDashboard/UserCard/UserCardContainer';
import GroupCardContainer from '../InstructorClassroomDashboard/GroupCard/GroupCardContainer';

const SingleClassroom = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);
    const currentClassroomId = useSelector((state) => state.currentClassroomId);
    const classMeta = useSelector((state) => state.currentClassroomMeta);
    const students = classMeta.students;

    useEffect(() => {
        (async () => {
            const query = await fetchClassroomData(currentClassroomId);
            dispatch(getClassroomMeta(query));
        })();
        setLoaded(true);
    }, []);

    if (!currentUser) return null;
    if (!currentClassroomId) return null;
    if (!classMeta) return null;
    console.log('classMeta: ', classMeta);
    console.log('students: ', students);
    console.log('loaded:');
    console.log(loaded);

    if (!loaded) {
        return <p>Loading...</p>;
    }

    if (!classMeta.students) {
        return (
            <>
                <div className="loading">
                    <p>Loading...</p>
                </div>
            </>
        );
    }

    // if (!classMeta.students) {
    //     console.log('loaded:');
    //     console.log(loaded);
    //     console.log('no students');
    //     return (
    //         <>
    //             <div className="enroll-students-instructions-container">
    //                 <div>
    //                     <h3 className="enroll-students-instructions-heading">
    //                         You Have not yet Enrolled any Students
    //                     </h3>
    //                 </div>
    //                 <br></br>
    //                 <div>
    //                     <h3>
    //                         You Can Enroll Students by Clicking "My Classes"
    //                         Followed by "Enroll Students" on the Desired Class
    //                         Card
    //                     </h3>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // }

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

    //   return (
    //     <>
    //       <div className="classroom__details">
    //         <h1>{classMeta.name}</h1>
    //       </div>
    //       <p>{console.log(currentClassroom)}</p>
    //     </>
    //   );
};

export default SingleClassroom;
