import React from 'react';

const GroupDetailsBlock = ({ classMeta }) => {
    return (
        <>
            <h3>Group Creation</h3>
            {classMeta ? (
                <>
                    <div className="classroom__details-row">
                        <h4>Meeting Link</h4>
                        <a
                            href={
                                classMeta['meeting_link']
                                    ? classMeta['meeting_link']
                                    : '#'
                            }
                        >
                            Launch Meeting
                        </a>
                    </div>
                    <div className="classroom__details-row">
                        <h4>Meeting Password</h4>
                        <p>
                            {classMeta['meeting_pw']
                                ? classMeta['meeting_pw']
                                : 'Ask Instructor'}
                        </p>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default GroupDetailsBlock;
