import React, { createContext, useContext } from 'react';
import { SocketContext } from '../../index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ClassDetailsBlock from './ClassDetailsBlock';
import MeetingDetailsBlock from './MeetingDetailsBlock';
import ClassList from './ClassList';
import ClassGroups from './ClassGroups';
import GroupDetailsBlock from './GroupDetailsBlock';
import OverviewBlock from './OverviewBlock';
import CheckInBlock from './CheckInBlock';
import StudentQAndA from './StudentQAndA';
import useFetchClassroomData from './useFetchClassroomData';

export const ClassroomContext = createContext(undefined);

const SingleClassroom = ({ userId, classroomId }) => {
    const socket = useContext(SocketContext);
    const {
        status,
        currentUser,
        classMeta,
        attendance,
        questions,
        question,
        groups,
        students,
    } = useFetchClassroomData(classroomId);

    if (!currentUser) return null;
    if (!classMeta) return null;

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <ClassroomContext.Provider
            value={{
                currentUser,
                classMeta,
                attendance,
                questions,
                classroomId,
                groups,
                students,
                question,
            }}
        >
            <Tabs>
                <TabList>
                    <Tab>Classroom Details</Tab>
                    <Tab>Classroom Roster</Tab>
                    <Tab>Classroom Groups</Tab>
                </TabList>
                <TabPanel>
                    <div className="classroom__grid-classroom_container">
                        {currentUser.role === 'instructor' ? (
                            <OverviewBlock />
                        ) : (
                            <StudentQAndA />
                        )}
                        <ClassDetailsBlock />
                        <MeetingDetailsBlock />
                        {currentUser.role === 'instructor' ? (
                            <GroupDetailsBlock />
                        ) : (
                            <CheckInBlock />
                        )}
                    </div>
                </TabPanel>
                <TabPanel>
                    <ClassList />
                </TabPanel>
                <TabPanel>
                    <ClassGroups />
                </TabPanel>
            </Tabs>
        </ClassroomContext.Provider>
    );
};

export default SingleClassroom;
