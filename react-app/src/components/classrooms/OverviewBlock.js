import React from 'react';

const OverviewBlock = ({ classMeta }) => {
    return (
        <>
            <h3>Class Overview</h3>
            {classMeta['check_ins'] ? (
                <>
                    <div className="classroom__details-row">
                        <h4>Attendance</h4>
                        <p>
                            {`${classMeta['check_ins'].length} / ${classMeta['students'].length}`}
                        </p>
                    </div>
                    <div className="classroom__details-row">
                        <h4>Unresolved Questions</h4>
                        <p>{`${classMeta['questions'].length}`}</p>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default OverviewBlock;
