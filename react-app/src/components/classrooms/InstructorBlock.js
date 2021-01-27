import React from 'react';
import { useDispatch } from 'react-redux';
import { submitQuestion, postQuestion } from '../../store/classroom_meta';
import Avatar from '@material-ui/core/Avatar';

const InstructorBlock = ({ classMeta, userId }) => {
    const dispatch = useDispatch();
    const questions = classMeta['questions'];

    const questionPending = (userId) => {
        for (let question of questions) {
            if (
                question.student_id === userId &&
                question.class_id === classMeta.id
            ) {
                return true;
            }
        }
    };

    return (
        <>
            <h3>Instructors</h3>
            {classMeta['instructors']
                ? classMeta['instructors'].map((instructor) => (
                      <>
                          <div className="user_avatar-row">
                              <Avatar src={`${instructor.avatar_url}`} />
                              <p>{`${instructor.first_name} ${instructor.last_name}`}</p>
                          </div>
                          <div className="classrooms_actions">
                              {!questionPending(userId) ? (
                                  <button className="ask_a_question">
                                      Ask A Question
                                  </button>
                              ) : (
                                  <p className="question_pending">
                                      Question Pending
                                  </p>
                              )}
                          </div>
                      </>
                  ))
                : null}
        </>
    );
};

export default InstructorBlock;
