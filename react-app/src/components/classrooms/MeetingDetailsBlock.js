import React, { useContext, useState } from 'react';
import { ClassroomContext } from './SingleClassroom';
import { useDispatch, useSelector } from 'react-redux';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import {
    alterMeetingLink,
    alterMeetingPw,
    patchMeetingLink,
    patchMeetingPw,
} from '../../store/classroom_meta';

const MeetingDetailsBlock = () => {
    const dispatch = useDispatch();
    const { currentUser, classMeta, classroomId } = useContext(
        ClassroomContext
    );
    const [meeting_link, setMeetingLink] = useState(classMeta['meeting_link']);
    const [meeting_pw, setMeetingPw] = useState(classMeta['meeting_pw']);

    const updateMeetingLink = (event) => {
        setMeetingLink(event.target.value);
    };

    const updateMeetingPw = (event) => {
        setMeetingPw(event.target.value);
    };

    const handleMeetingLinkPatch = async (meeting_link) => {
        const request = await patchMeetingLink(classroomId, meeting_link.value);
        if (request.ok) {
            dispatch(alterMeetingLink(meeting_link));
        }
    };

    const handleMeetingPwPatch = async (meeting_pw) => {
        const request = await patchMeetingPw(classroomId, meeting_pw.value);
        if (request.ok) {
            dispatch(alterMeetingPw(meeting_pw));
        }
    };

    return (
        <section className="classroom__grid-item-top bg-red">
            <h3>Meeting Info</h3>
            {classMeta['meeting_link'] ? (
                <>
                    <div className="classroom__details-row">
                        <h4>Meeting Link</h4>
                        {currentUser.role === 'instructor' ? (
                            <EditTextarea
                                onChange={updateMeetingLink}
                                onSave={handleMeetingLinkPatch}
                                value={meeting_link}
                                name="meeting_link"
                                rows={1}
                                type="text"
                                defaultValue={
                                    classMeta['meeting_link']
                                        ? classMeta['meeting_link']
                                        : 'Click to edit'
                                }
                            />
                        ) : (
                            <p>
                                <a
                                    className="meeting_link"
                                    href={
                                        classMeta['meeting_link']
                                            ? classMeta['meeting_link']
                                            : '#'
                                    }
                                >
                                    Launch Meeting
                                </a>
                            </p>
                        )}
                    </div>
                    <div className="classroom__details-row">
                        <h4>Meeting Password</h4>
                        {currentUser.role === 'instructor' ? (
                            <EditTextarea
                                onChange={updateMeetingPw}
                                onSave={handleMeetingPwPatch}
                                value={meeting_pw}
                                name="meeting_pw"
                                rows={1}
                                type="text"
                                defaultValue={
                                    classMeta['meeting_pw']
                                        ? classMeta['meeting_pw']
                                        : 'Click to edit'
                                }
                            />
                        ) : (
                            <p>
                                {classMeta['meeting_pw']
                                    ? classMeta['meeting_pw']
                                    : 'Ask Instructor'}
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <p>
                    Your instructor hasn't added any video conference
                    information yet. When they do, it will populate here.
                </p>
            )}
        </section>
    );
};

export default MeetingDetailsBlock;
