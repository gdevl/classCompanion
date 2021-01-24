import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import InstructorBlock from './InstructorBlock';
import ClassDetailsBlock from './ClassDetailsBlock';
import MeetingDetailsBlock from './MeetingDetailsBlock';
import ClassList from './ClassList';
import ClassGroups from './ClassGroups';
import GroupDetailsBlock from './GroupDetailsBlock';
import OverviewBlock from './OverviewBlock';
import CheckInBlock from './CheckInBlock';

const ClassroomContainer = ({ classMeta, role, userId }) => {
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
                                />
                            </section>
                        ) : (
                            <section className="classroom__grid-item-top bg-green">
                                <InstructorBlock
                                    classMeta={classMeta}
                                    role={role}
                                />
                            </section>
                        )}
                        <section className="classroom__grid-item-top bg-blue">
                            <ClassDetailsBlock
                                classMeta={classMeta}
                                role={role}
                            />
                        </section>
                        <section className="classroom__grid-item-top bg-brown">
                            <MeetingDetailsBlock
                                classMeta={classMeta}
                                role={role}
                            />
                        </section>
                        {role === 'instructor' ? (
                            <section className="classroom__grid-item-top bg-red">
                                <GroupDetailsBlock
                                    classMeta={classMeta}
                                    role={role}
                                />
                            </section>
                        ) : (
                            <section className="classroom__grid-item-top bg-red">
                                <CheckInBlock
                                    classMeta={classMeta}
                                    role={role}
                                    userId={userId}
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
                        <ClassGroups classMeta={classMeta} role={role} />
                    </div>
                </TabPanel>
            </Tabs>
        </>
    );
};

export default ClassroomContainer;