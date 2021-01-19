import React from 'react';
import ClassroomsActions from './ClassroomsActions';
import AddClassroom from './AddClassroom';
import { useSelector } from 'react-redux';

const AllClassrooms = () => {
    const classrooms = useSelector((state) => state.classrooms);
    const currentUser = useSelector((state) => state.currentUser);

    if (!classrooms) return null;
    if (!currentUser) return null;

    return (
        <>
            <h1 className="classroom__grid-title">All Classrooms</h1>
            {currentUser.role === 'instructor' ? (
                <AddClassroom userId={currentUser.id} />
            ) : null}
            <div className="classroom__grid">
                {Object.values(classrooms).map((classroom) => {
                    return (
                        <div
                            key={`cs-${classroom.id}`}
                            className="classroom__grid-item"
                        >
                            <h3>{classroom.name}</h3>
                            <p>Size: {classroom.size}</p>
                            <ClassroomsActions
                                role={currentUser.role}
                                classroom={classroom}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AllClassrooms;
