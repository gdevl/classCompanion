import React, { useContext, useEffect, useState } from 'react';
import { ClassroomContext } from './SingleClassroom';
import { useDispatch, useSelector } from 'react-redux';

const OverviewBlock = () => {
    const { questions, classMeta } = useContext(ClassroomContext);

    function checkForUnansweredQuestions() {
        for (let question of questions) {
            if (!question.answer) {
                return true;
            }
        }
        return false;
    }

    return (
        <section className="classroom__grid-item-top bg-green">
            <h3>Classroom Overview</h3>
            {classMeta['check_ins'] ? (
                <>
                    <div className="classroom__details-row">
                        <h4>Attendance</h4>
                        <p>
                            {`${classMeta['check_ins'].length} / ${classMeta['students'].length}`}
                        </p>
                    </div>
                    <div className="classroom__details-row">
                        <h4>Student Questions</h4>
                        {checkForUnansweredQuestions() ? (
                            <p>You have unanswered questions!</p>
                        ) : (
                            <p>Your question queue is empty.</p>
                        )}
                    </div>
                </>
            ) : null}
        </section>
    );
};

export default OverviewBlock;
