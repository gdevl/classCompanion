import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import {
    fetchStudentQuestion,
    getStudentQuestion,
    acceptAnswer,
    patchQuestionAcceptance,
    clearQuestion,
} from '../../store/question';

import { postQuestion, submitQuestion } from '../../store/classroom_meta';

const StudentQAndA = () => {
    const dispatch = useDispatch();
    const question = useSelector((state) => state.question);
    const currentUser = useSelector((state) => state.currentUser);
    const classroomId = useSelector((state) => state.currentClassroomId);
    const [pending, setPending] = useState(false);
    const [readyToSubmit, setReadyToSubmit] = useState(false);

    const [textarea, setTextarea] = useState(question.content);

    const handleSave = ({ name, value }) => {
        setTextarea(value);
        setReadyToSubmit(true);
    };

    // On save, the submit button should appear.

    const handleSubmit = () => {
        setPending(true);
        postQuestion(classroomId, currentUser.id, textarea);
        const data = fetchStudentQuestion(classroomId, currentUser.id);
        dispatch(getStudentQuestion(data));
    };

    const handleNewQuestion = () => {
        patchQuestionAcceptance(question.class_id, question.id);
        dispatch(acceptAnswer(question));
        setTextarea('');
    };

    useEffect(() => {
        (async () => {
            const data = await fetchStudentQuestion(
                classroomId,
                currentUser.id
            );
            dispatch(getStudentQuestion(data));
        })();
    }, []);

    return (
        <section className="classroom__grid-item-top bg-green">
            {question.content ? (
                <>
                    <h3>You said:</h3>
                    <EditTextarea
                        name="textarea"
                        style={{ fontSize: '16px', border: '1px solid #ccc' }}
                        defaultValue={question.content ? question.content : ''}
                        value={question.content}
                        readonly
                    />
                    {question.answer !== null ? (
                        <>
                            <h3>Your instructor replied:</h3>
                            <EditTextarea
                                name="textarea"
                                style={{
                                    fontSize: '16px',
                                    border: '1px solid #ccc',
                                }}
                                value={question.answer}
                                defaultValue={
                                    question.answer ? question.answer : ''
                                }
                                readonly
                            />
                        </>
                    ) : null}
                </>
            ) : (
                <>
                    <h3>Ask A Question</h3>
                    <EditTextarea
                        name="textarea"
                        style={{ fontSize: '16px', border: '1px solid #ccc' }}
                        value={textarea}
                        onChange={setTextarea}
                        onSave={handleSave}
                    />
                </>
            )}

            {/* <p style={{ paddingLeft: '5px', marginBottom: '5px' }}>
                <b>Value:</b> {textarea}
            </p> */}

            {readyToSubmit && textarea !== '' ? (
                <button onClick={() => handleSubmit()}>Submit</button>
            ) : null}
            {textarea !== '' && textarea !== undefined ? (
                <button onClick={() => setTextarea('')}>Clear Input</button>
            ) : null}
            {/* <button onClick={() => handleNewQuestion()}>Ask Another</button> */}
        </section>
    );
};

export default StudentQAndA;
