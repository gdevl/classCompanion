import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getClassroomMeta,
    fetchClassroomData,
} from '../../store/classroom_meta';
import {
    getClassroomQuestions,
    fetchClassroomQuestions,
} from '../../store/questions';
import { setClassGroups, fetchClassGroups } from '../../store/groups';

export default function useFetchClassroomDataAsInstuctor(classroomId) {
    const [status, setStatus] = useState('idle');
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);
    const classMeta = useSelector((state) => state.currentClassroomMeta);
    const attendance = useSelector(
        (state) => state.currentClassroomMeta['attendance']
    );
    const questions = useSelector((state) => state.questions);
    const groups = useSelector((state) => state.groups);
    const students = useSelector(
        (state) => state.currentClassroomMeta['students']
    );

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
        (async () => {
            const questionData = await fetchClassroomQuestions(classroomId);
            dispatch(getClassroomQuestions(questionData));
        })();
        setStatus('success');
    }, [classroomId]);

    return {
        status,
        groups,
        currentUser,
        classMeta,
        attendance,
        questions,
        students,
    };
}
