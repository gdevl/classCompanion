import React, { useState, useContext } from 'react';
import { ClassroomContext } from './SingleClassroom';
import { SocketContext } from '../../index';
import { UserContext } from '../../App';
import { useDispatch } from 'react-redux';
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import {
    alterDescription,
    alterObjective,
    patchDescription,
    patchDailyObjective,
} from '../../store/classroom_meta';

const ClassDetailsBlock = () => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);
    const socket = useContext(SocketContext);
    const { classMeta, classroomId } = useContext(ClassroomContext);
    const [description, setDescription] = useState(classMeta['description']);
    const [daily_objective, setDailyObjective] = useState(
        classMeta['daily_objective']
    );

    const updateDescription = (event) => {
        setDescription(event.target.value);
    };

    const updateDailyObjective = (event) => {
        setDailyObjective(event.target.value);
    };

    const handleDescriptionPatch = async (description) => {
        const request = await patchDescription(classroomId, description.value);
        dispatch(alterDescription(description));
        const data = {
            classroomId,
            studentId: currentUser.id,
        };
        socket.emit('description_update', data, (response) => {
            console.log(response);
        });
    };

    const handleDailyObjectivePatch = async (daily_objective) => {
        const request = await patchDailyObjective(
            classroomId,
            daily_objective.value
        );
        dispatch(alterObjective(daily_objective));
        const data = {
            classroomId,
            studentId: currentUser.id,
        };
        socket.emit('daily_objective_update', data, (response) => {
            console.log(response);
        });
    };

    return (
        <section className="classroom__grid-item-top bg-blue">
            <h3>Classroom Details</h3>
            {classMeta['description'] ? (
                <>
                    <div className="classroom__details-row">
                        <h4>Description</h4>
                        {currentUser.role === 'student' ? (
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
                        {currentUser.role === 'student' ? (
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
        </section>
    );
};

export default ClassDetailsBlock;
