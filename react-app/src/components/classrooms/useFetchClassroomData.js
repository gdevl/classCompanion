import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../index';
import {
    getClassroomMeta,
    fetchClassroomData,
} from '../../store/classroom_meta';
import {
    getClassroomQuestions,
    fetchClassroomQuestions,
} from '../../store/questions';
import { fetchStudentQuestion, getStudentQuestion } from '../../store/question';
import {
    setClassGroups,
    fetchClassGroups,
    clearClassGroups,
} from '../../store/groups';

export default function useFetchClassroomDataAsInstuctor(classroomId) {
    const socket = useContext(SocketContext);
    const [status, setStatus] = useState('idle');
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);
    const classMeta = useSelector((state) => state.currentClassroomMeta);
    const question = useSelector((state) => state.question);
    const questions = useSelector((state) => state.questions);
    const groups = useSelector((state) => state.groups);
    const attendance = useSelector(
        (state) => state.currentClassroomMeta['attendance']
    );
    const students = useSelector(
        (state) => state.currentClassroomMeta['students']
    );

    socket.on('question_response', async (response) => {
        // student has asked a question, re-fetch questions
        const questionData = await fetchClassroomQuestions(classroomId);
        dispatch(getClassroomQuestions(questionData));
    });

    socket.on('answer_response', async (response) => {
        // student has asked a question, update question slice
        dispatch(getStudentQuestion(response));
    });

    socket.on('checkin_response', async (response) => {
        // student has checked in, update checkins
        const query = await fetchClassroomData(classroomId);
        dispatch(getClassroomMeta(query));
    });

    socket.on('meeting_link_update_response', async (response) => {
        // instructor has changed the meeting link, update class meta
        const query = await fetchClassroomData(classroomId);
        dispatch(getClassroomMeta(query));
    });
    socket.on('meeting_link_pw_response', async (response) => {
        // instructor has changed the meeting link pw, update class meta
        const query = await fetchClassroomData(classroomId);
        dispatch(getClassroomMeta(query));
    });

    socket.on('daily_objective_update_response', async (response) => {
        // instructor has changed the meeting link, update class meta
        const query = await fetchClassroomData(classroomId);
        dispatch(getClassroomMeta(query));
    });

    socket.on('description_update_response', async (response) => {
        // instructor has changed the meeting link pw, update class meta
        const query = await fetchClassroomData(classroomId);
        dispatch(getClassroomMeta(query));
    });

    socket.on('group_status_changed_response', async (response) => {
        // instructor has changed the meeting link pw, update class meta
        const groupData = await fetchClassGroups(classroomId);
        dispatch(setClassGroups(groupData));
    });

    socket.on('ungroup_response', async (response) => {
        // instructor has changed the meeting link pw, update class meta
        await fetch(`/api/classes/${classroomId}/ungroup`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(clearClassGroups());
    });

    // if we can't fetch from db setStatus to error
    // set error message state and update UI

    useEffect(() => {
        if (!classroomId) return;
        setStatus('loading');
        (async () => {
            const query = await fetchClassroomData(classroomId);
            dispatch(getClassroomMeta(query));
        })();
        (async () => {
            const groupData = await fetchClassGroups(classroomId);
            dispatch(setClassGroups(groupData));
        })();
        if (currentUser.role === 'instructor') {
            (async () => {
                const questionData = await fetchClassroomQuestions(classroomId);
                dispatch(getClassroomQuestions(questionData));
            })();
        }
        if (currentUser.role === 'student') {
            (async () => {
                const singleQuestionData = await fetchStudentQuestion(
                    classroomId,
                    currentUser.id
                );
                dispatch(getStudentQuestion(singleQuestionData));
            })();
        }
        setStatus('success');
    }, [classroomId]);

    return {
        status,
        groups,
        classMeta,
        attendance,
        question,
        questions,
        students,
    };
}
