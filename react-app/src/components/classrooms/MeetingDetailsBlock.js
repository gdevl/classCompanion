import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import {
    alterMeetingLink,
    alterMeetingPw,
    patchMeetingLink,
    patchMeetingPw,
} from '../../store/classroom_meta';

const MeetingDetailsBlock = ({ classMeta }) => {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.currentUser.role);
    const [meeting_link, setMeetingLink] = useState(classMeta['meeting_link']);
    const [meeting_pw, setMeetingPw] = useState(classMeta['meeting_pw']);

    const updateMeetingLink = (event) => {
        setMeetingLink(event.target.value);
    };

    const updateMeetingPw = (event) => {
        setMeetingPw(event.target.value);
    };

    const handleMeetingLinkPatch = async (meeting_link) => {
        const request = await patchMeetingLink(
            classMeta['id'],
            meeting_link.value
        );
        if (request.ok) {
            dispatch(alterMeetingLink(meeting_link));
        }
    };

    const handleMeetingPwPatch = async (meeting_pw) => {
        const request = await patchMeetingPw(classMeta['id'], meeting_pw.value);
        if (request.ok) {
            dispatch(alterMeetingPw(meeting_pw));
        }
    };

    return (
        <>
            <h3>Meeting Info</h3>
            {classMeta['meeting_link'] ? (
                <>
                    <div className="classroom__details-row">
                        <h4>Meeting Link</h4>
                        {role === 'instructor' ? (
                            <EditText
                                onChange={updateMeetingLink}
                                onSave={handleMeetingLinkPatch}
                                value={meeting_link}
                                name="meeting_link"
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
                        {role === 'instructor' ? (
                            <EditText
                                onChange={updateMeetingPw}
                                onSave={handleMeetingPwPatch}
                                value={meeting_pw}
                                name="meeting_pw"
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
            ) : null}
        </>
    );
};

export default MeetingDetailsBlock;
