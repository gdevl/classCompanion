import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const ClassroomTabs = () => {
    const [view, setView] = useState(0);

    const handleChange = (event, newView) => {
        setView(newView);
    };

    return (
        <>
            <Tabs
                value={view}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Classroom Details" />
                <Tab label="Classroom Roster" />
            </Tabs>
            <TabPanel value={view}>Classroom Details</TabPanel>
            <TabPanel value={view}>Classroom Roster</TabPanel>
        </>
    );
};

export default ClassroomTabs;
