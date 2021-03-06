import React, { useContext, useState } from 'react';
import { ClassroomContext } from './SingleClassroom';
import { UserContext } from '../../App';
import { SocketContext } from '../../index';
import { useDispatch } from 'react-redux';
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import Avatar from '@material-ui/core/Avatar';
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
    const socket = useContext(SocketContext);
    const currentUser = useContext(UserContext);
    const { classroomId, question, classMeta } = useContext(ClassroomContext);
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
        socket.emit('question', data, (response) => {
            console.log(response);
        });
    };

    const handleNewQuestion = () => {
        patchQuestionAcceptance(classroomId, question.id);
        dispatch(acceptAnswer(question));
        dispatch(clearQuestion());
        setPending(false);
        setTextarea('');
    };

    return (
        <section className="classroom__grid-item-top bg-green">
            <h3>Instructors</h3>
            {classMeta['instructors']
                ? classMeta['instructors'].map((instructor) => (
                      <div className="user_avatar_row">
                          <Avatar src={`${instructor.avatar_url}`} />
                          <p>{`${instructor.first_name} ${instructor.last_name}`}</p>
                      </div>
                  ))
                : null}
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
                            <button
                                className="qa_buttons"
                                onClick={() => handleNewQuestion()}
                            >
                                Ask Another
                            </button>
                        </>
                    ) : (
                        <p>Awaiting instructor response...</p>
                    )}
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
                    {!pending && readyToSubmit && textarea !== '' ? (
                        <button
                            className="qa_buttons"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    ) : null}
                </>
            )}

            {/* {question}

            {textarea !== '' || readyToSubmit ? (
                <button className="qa_buttons" onClick={() => handleSubmit()}>
                    Submit
                </button>
            ) : null} */}

            {/* {!pending && readyToSubmit && textarea !== '' ? (
                <button className="qa_buttons" onClick={() => handleSubmit()}>
                    Submit
                </button>
            ) : null} */}
        </section>
    );
};

export default StudentQAndA;
