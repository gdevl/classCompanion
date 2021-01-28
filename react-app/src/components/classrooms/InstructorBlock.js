import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import AskQuestion from '../StudentClassroomDashboard/ask-a-question/AskQuestion';
import AnswerView from '../StudentClassroomDashboard/AnswerView/AnswerView';

const InstructorBlock = ({ classMeta, userId }) => {
    const dispatch = useDispatch();
    const questions = classMeta['questions'];
    const [question, setQuestion] = useState(undefined);
    const [open, setOpen] = useState(false);

    const showQuestion = () => {
        console.log('question: ', question);
        if (!question) return false;
        let { answers } = question;
        console.log('answers: ', answers);

        if (answers && answers[0] && !answers[0].active) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (!classMeta['questions']) return;

        for (let question of classMeta['questions']) {
            if (question.student_id === userId) {
                setQuestion(question);
            }
        }
    }, [classMeta]);

    const Question = () => {
        console.log('question.answer: ', question.answer);
        if (question.answer) {
            console.log('question.answer: ', question.answer);
            return (
                <AnswerView open={open} setOpen={setOpen} question={question} />
            );
        } else {
            return <p>Question Pending</p>;
        }
    };

    console.log('question: ', question);

    return (
        <>
            <h3>Instructors</h3>
            <AskQuestion open={open} setOpen={setOpen} />
            {classMeta['instructors']
                ? classMeta['instructors'].map((instructor) => (
                      <>
                          <div className="user_avatar-row">
                              <Avatar src={`${instructor.avatar_url}`} />
                              <p>{`${instructor.first_name} ${instructor.last_name}`}</p>
                          </div>
                          <div className="classrooms_actions">
                              {showQuestion() ? (
                                  <Question />
                              ) : (
                                  <button onClick={() => setOpen(true)}>
                                      Ask A Question
                                  </button>
                              )}
                          </div>
                      </>
                  ))
                : null}
        </>
    );
};

export default InstructorBlock;
