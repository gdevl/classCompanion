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

const ClassroomContainer = ({ classMeta, role }) => {
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
                            <section className="classroom__grid-item-top">
                                <OverviewBlock
                                    classMeta={classMeta}
                                    role={role}
                                />
                            </section>
                        ) : (
                            <section className="classroom__grid-item-top">
                                <InstructorBlock
                                    classMeta={classMeta}
                                    role={role}
                                />
                            </section>
                        )}
                        <section className="classroom__grid-item-top">
                            <ClassDetailsBlock
                                classMeta={classMeta}
                                role={role}
                            />
                        </section>
                        <section className="classroom__grid-item-top">
                            <MeetingDetailsBlock
                                classMeta={classMeta}
                                role={role}
                            />
                        </section>
                        <section className="classroom__grid-item-top">
                            <GroupDetailsBlock
                                classMeta={classMeta}
                                role={role}
                            />
                        </section>
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
