import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { useDispatch } from 'react-redux';
import {
    getClassroomMeta,
    fetchClassroomData,
    alterDescription,
    alterObjective,
    patchDescription,
    patchDailyObjective,
} from '../../store/classroom_meta';

const ClassDetailsBlock = ({ classMeta }) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState(classMeta['description']);
    const [daily_objective, setDailyObjective] = useState(
        classMeta['daily_objective']
    );
    // const description = useSelector((state) => state.classMeta['description']);
    // const daily_objective = useSelector(
    //     (state) => state.classMeta['daily_objective']
    // );
    const role = useSelector((state) => state.currentUser.role);

    const updateDescription = (event) => {
        setDescription(event.target.value);
    };

    const updateDailyObjective = (event) => {
        setDailyObjective(event.target.value);
    };

    const handleDescriptionPatch = async (description) => {
        console.log('description: ', description);
        const request = await patchDescription(
            classMeta['id'],
            description.value
        );
        if (request.ok) {
            dispatch(alterDescription(description));
        }
    };

    const handleDailyObjectivePatch = async (daily_objective) => {
        const request = await patchDailyObjective(
            classMeta['id'],
            daily_objective.value
        );
        if (request.ok) {
            dispatch(alterObjective(daily_objective));
        }
    };

    useEffect(() => {
        console.log('description: ', description);
        console.log('objective: ', daily_objective);
    }, [description, daily_objective]);

    return (
        <>
            <h3>Classroom Details</h3>
            {classMeta['description'] ? (
                <>
                    <div className="classroom__details-row">
                        <h4>Description</h4>
                        {role === 'student' ? (
                            <p className="" description={description}>
                                {classMeta['description']
                                    ? classMeta['description']
                                    : 'Define class description.'}
                            </p>
                        ) : (
                            <EditTextarea
                                onChange={updateDescription}
                                onSave={handleDescriptionPatch}
                                value={description}
                                name="description"
                                type="text"
                                rows={2}
                                style={{ width: 'auto' }}
                                defaultValue={classMeta['description']}
                            />
                        )}
                        <h4>Daily Objective</h4>
                        {role === 'student' ? (
                            <p>
                                {classMeta['daily_objective']
                                    ? classMeta['daily_objective']
                                    : 'Define daily objectives.'}
                            </p>
                        ) : (
                            <EditTextarea
                                onChange={updateDailyObjective}
                                onSave={handleDailyObjectivePatch}
                                value={daily_objective}
                                name="daily_objective"
                                rows={2}
                                type="text"
                                style={{ width: 'atuo' }}
                                defaultValue={
                                    classMeta['daily_objective']
                                        ? classMeta['daily_objective']
                                        : 'Define daily objectives.'
                                }
                            />
                        )}
                    </div>
                </>
            ) : null}
        </>
    );
};

export default ClassDetailsBlock;
