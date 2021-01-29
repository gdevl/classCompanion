import React from 'react';
import { useSelector } from 'react-redux';
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

const ClassroomContainer = ({
    classMeta,
    role,
    userId,
    attendance,
    questions,
}) => {
    const groups = useSelector((state) => state.groups);

    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>Classroom Details</Tab>
                    <Tab>Classroom Roster</Tab>
                    <Tab>Classroom Groups</Tab>
                </TabList>
                <TabPanel>
                    <div className="classroom__grid-classroom_container">
                        {role === 'instructor' ? (
                            <section className="classroom__grid-item-top bg-green">
                                <OverviewBlock
                                    classMeta={classMeta}
                                    role={role}
                                    questions={questions}
                                />
                                e
                            </section>
                        ) : (
                            <section className="classroom__grid-item-top bg-green">
                                <StudentQAndA />
                            </section>
                            // <section className="classroom__grid-item-top bg-green">
                            //     <InstructorBlock
                            //         classMeta={classMeta}
                            //         role={role}
                            //         userId={userId}
                            //     />
                            // </section>
                        )}
                        <section className="classroom__grid-item-top bg-blue">
                            <ClassDetailsBlock
                                classMeta={classMeta}
                                role={role}
                            />
                        </section>
                        <section className="classroom__grid-item-top bg-red">
                            <MeetingDetailsBlock
                                classMeta={classMeta}
                                role={role}
                            />
                        </section>
                        {role === 'instructor' ? (
                            <section className="classroom__grid-item-top bg-purple">
                                <GroupDetailsBlock
                                    classMeta={classMeta}
                                    role={role}
                                />
                            </section>
                        ) : (
                            <section className="classroom__grid-item-top bg-purple">
                                <CheckInBlock
                                    classMeta={classMeta}
                                    role={role}
                                    userId={userId}
                                    attendance={attendance}
                                />
                            </section>
                        )}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="classroom_container-classlist">
                        <ClassList classMeta={classMeta} role={role} />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="classroom_container-classgroups">
                        <ClassGroups
                            classMeta={classMeta}
                            role={role}
                            groups={groups}
                        />
                    </div>
                </TabPanel>
            </Tabs>
        </>
    );
};

export default ClassroomContainer;
