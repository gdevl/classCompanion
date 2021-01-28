import React, { useContext, useEffect, useState } from 'react';
import { ClassroomContext } from './SingleClassroom';
import { useDispatch, useSelector } from 'react-redux';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import {
    fetchStudentQuestion,
    getStudentQuestion,
    acceptAnswer,
    patchQuestionAcceptance,
    postQuestion,
    clearQuestion,
} from '../../store/question';

const StudentQAndA = () => {
    const dispatch = useDispatch();
    const { currentUser, classroomId } = useContext(ClassroomContext);
    const question = useSelector((state) => state.question);
    const [pending, setPending] = useState(false);
    const [readyToSubmit, setReadyToSubmit] = useState(false);

    const [textarea, setTextarea] = useState(question.content);

    const handleSave = ({ name, value }) => {
        setTextarea(value);
        setReadyToSubmit(true);
    };

    // On save, the submit button should appear.

    const handleSubmit = async () => {
        setPending(true);
        await postQuestion(classroomId, currentUser.id, textarea);
        const data = await fetchStudentQuestion(classroomId, currentUser.id);
        dispatch(getStudentQuestion(data));
        setPending(true);
    };

    const handleNewQuestion = () => {
        patchQuestionAcceptance(classroomId, question.id);
        dispatch(acceptAnswer(question));
        dispatch(clearQuestion());
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
            {question.content && !question.resolved ? (
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
                            <button onClick={() => handleNewQuestion()}>
                                Ask Another
                            </button>
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

            {!pending && readyToSubmit && textarea !== '' ? (
                <button onClick={() => handleSubmit()}>Submit</button>
            ) : null}
            {!pending && textarea !== '' && textarea !== undefined ? (
                <button onClick={() => setTextarea('')}>Clear Input</button>
            ) : null}
        </section>
    );
};

export default StudentQAndA;
