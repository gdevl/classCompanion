import React, { useEffect, useState } from 'react';

const OverviewBlock = ({ classMeta }) => {
    const [unansweredQuestions, setUnansweredQuestions] = useState([]);

    useEffect(() => {
        if (!classMeta['questions']) return;
        let questions = [];
        for (let question of classMeta['questions']) {
            if (!question.resolved) {
                questions.push(question);
            }
        }
        setUnansweredQuestions(questions);
    }, [classMeta]);

    return (
        <>
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
                        {unansweredQuestions.length ? (
                            <p>You have unanswered questions!</p>
                        ) : (
                            <p>Your question queue is empty.</p>
                        )}
                    </div>
                </>
            ) : null}
        </>
    );
};

export default OverviewBlock;
