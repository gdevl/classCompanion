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
    };

    return (
        <>
            <h3>Classroom Details</h3>
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
