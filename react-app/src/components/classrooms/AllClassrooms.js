import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserContext } from '../../App';
import {
    getUserClassrooms,
    fetchClassDisplay,
} from '../../../src/store/classrooms';
import ClassroomsActions from './ClassroomsActions';
import AddClassroom from './AddClassroom';
import { useSelector } from 'react-redux';

const AllClassrooms = () => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);
    const classrooms = useSelector((state) => state.classrooms);

    useEffect(() => {
        (async () => {
            const classrooms = await fetchClassDisplay(currentUser.id);
            dispatch(getUserClassrooms(classrooms));
        })();
    }, [currentUser]);

    if (!classrooms) return null;
    if (!currentUser) return null;
    return (
        <>
            <h1 className="classroom__grid-title">My Classrooms</h1>
            {currentUser.role === 'instructor' ? (
                <AddClassroom userId={currentUser.id} />
            ) : null}
            <div className="classroom__grid">
                {Object.values(classrooms).map((classroom) => {
                    return (
                        <div
                            key={`cs-${classroom.id}`}
                            // className="classroom__grid-item"
                            className={
                                currentUser.role === 'instructor'
                                    ? 'classroom__grid-item bg-blue'
                                    : 'classroom__grid-item bg-green'
                            }
                        >
                            <h3>{classroom.name}</h3>
                            <p>Size: {classroom.size}</p>
                            <ClassroomsActions
                                classroomId={classroom.id}
                                classroomName={classroom.name}
                                userId={currentUser.id}
                                role={currentUser.role}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AllClassrooms;
