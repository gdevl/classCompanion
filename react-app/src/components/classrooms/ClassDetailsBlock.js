import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

const ClassDetailsBlock = ({ classMeta }) => {
    return (
        <>
            <h3>Class Details</h3>
            {classMeta['description'] ? (
                <>
                    <div className="classroom__details-row">
                        <h4>Description</h4>
                        <p>{classMeta['description']}</p>
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
