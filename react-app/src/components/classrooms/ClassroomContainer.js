import React, { useEffect } from 'react';
import InstructorBlock from './InstructorBlock';
import ClassDetailsBlock from './ClassDetailsBlock';
import MeetingDetailsBlock from './MeetingDetailsBlock';
import ClassList from './ClassList';

const ClassroomContainer = ({ classMeta }) => {
    useEffect(() => {
        console.log('classMeta:');
        console.log(classMeta);
    }, []);
    return (
        <>
            <div className="classroom__grid-classroom_container">
                <section className="classroom__grid-item-top">
                    <InstructorBlock classMeta={classMeta} />
                </section>
                <section className="classroom__grid-item-top">
                    <ClassDetailsBlock classMeta={classMeta} />
                </section>
                <section className="classroom__grid-item-top">
                    <MeetingDetailsBlock classMeta={classMeta} />
                </section>
            </div>
            <div className="classroom_container_bottom">
                <h1>ClassroomContainer Bottom</h1>
                <ClassList classMeta={classMeta} />
            </div>
        </>
    );
};

export default ClassroomContainer;
