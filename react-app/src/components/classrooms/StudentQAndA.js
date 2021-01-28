import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { fetchStudentQuestion, getStudentQuestion } from '../../store/question';

// const Answer = ({ answer }) => {
//     return <p>{answer}</p>;
// };

// const Question = () => {
//     const handleSubmit = () => {
//         console.log('submitted');
//     };

//     return (
{
    /* <EditTextarea
    onChange={(e) => setQuestion(e.currentTarget.value)}
    onSave={handleSubmit}
    value={question}
    name="question"
    rows={1}
    type="text"
    defaultValue={question.content ? question.content : ''}
/>; */
}
//     );
// };

const StudentQAndA = () => {
    const dispatch = useDispatch();
    const question = useSelector((state) => state.question);
    const studentId = useSelector((state) => state.currentUser.id);
    const classroomId = useSelector((state) => state.currentClassroomId);
    const [pending, setPending] = useState(false);

    const [textarea, setTextarea] = useState(question.content);

    const handleSave = ({ name, value }) => {
        // alert(name + ' saved as: ' + value);
        dispatch(getStudentQuestion());
    };

    const handleNewQuestion = () => {
        setTextarea('');
    };

    useEffect(() => {
        (async () => {
            const data = await fetchStudentQuestion(classroomId, studentId);
            dispatch(getStudentQuestion(data));
        })();
    }, []);

    return (
        <>
            {question ? (
                <EditTextarea
                name="textarea"
                style={{ fontSize: '16px', border: '1px solid #ccc' }}
                defaultValue={question.content}
                readonly
                />
            ) : (

            )}
            <h3>Ask A Question</h3>
            <EditTextarea
                name="textarea"
                style={{ fontSize: '16px', border: '1px solid #ccc' }}
                value={textarea}
                onChange={setTextarea}
                onSave={handleSave}
            />

            <p style={{ paddingLeft: '5px', marginBottom: '5px' }}>
                <b>Value:</b> {textarea}
            </p>

            <button onClick={() => setTextarea('')}>Clear Input</button>
            <button onClick={() => setTextarea('')}>Submit</button>
            <button onClick={() => handleNewQuestion()}>Ask Another</button>
        </>
    );
};

export default StudentQAndA;
