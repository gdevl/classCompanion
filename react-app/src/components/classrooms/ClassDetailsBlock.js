import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    getClassroomMeta,
    fetchClassroomData,
} from '../../store/classroom_meta';

const ClassDetailsBlock = ({ classMeta }) => {
    const [description, setDescription] = useState(classMeta['description']);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        // updateDescription();
    };

    // const autosave = (cb, delay) => {
    //     let autosaveTimer;
    //     clearTimeout(autosaveTimer);
    //     autosaveTimer = setTimeout((cb, delay) => {});
    // };

    // const postNewDescription = async () => {
    //     const request = await fetch(`api/classes/${classMeta.id}/description`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ description }),
    //     });
    // };

    // const updateDescription = autosave(function (e) {
    //     postNewDescription();
    // }, 5000);

    // useEffect(() => {
    //     (async () => {
    //         const query = await fetchClassroomData(classroomId);
    //         dispatch(getClassroomMeta(query));
    //     })();
    // }, [updateDescription]);

    return (
        <>
            <h3>Class Details</h3>
            {classMeta['description'] ? (
                <>
                    <div className="classroom__details-row">
                        <h4>Description</h4>
                        <p
                            description={description}
                            contenteditable="true"
                            onChange={handleDescriptionChange}
                        >
                            {classMeta['description']}
                        </p>
                    </div>
                    <div className="classroom__details-row">
                        <h4>Daily Objective</h4>
                        <p>
                            {classMeta['daily_objective']
                                ? classMeta['daily_objective']
                                : 'Be kind and learn all the things.'}
                        </p>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default ClassDetailsBlock;
