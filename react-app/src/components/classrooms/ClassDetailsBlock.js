import React, { useState } from "react";
import { Autosave } from "react-autosave";

const ClassDetailsBlock = ({ classMeta }) => {
    const [description, setDescription] = useState(classMeta["description"]);

    const updateDescription = (description) => {};
    return (
        <>
            <h3>Class Details</h3>
            {classMeta["description"] ? (
                <>
                    <div className="classroom__details-row">
                        <h4>Description</h4>
                        <p
                            description={description}
                            contenteditable="true"
                            onChange={(e) => setDescription(e.target.value)}
                        >
                            {classMeta["description"]}
                        </p>
                        <Autosave
                            data={description}
                            onSave={updateDescription}
                        />
                    </div>
                    <div className="classroom__details-row">
                        <h4>Daily Objective</h4>
                        <p>
                            {classMeta["daily_objective"]
                                ? classMeta["daily_objective"]
                                : "Be kind and learn all the things."}
                        </p>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default ClassDetailsBlock;
