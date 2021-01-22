import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import InstructorBlock from './InstructorBlock';
import ClassDetailsBlock from './ClassDetailsBlock';
import MeetingDetailsBlock from './MeetingDetailsBlock';
import ClassList from './ClassList';
import ClassGroups from './ClassGroups';

const ClassroomContainer = ({ classMeta }) => {
    useEffect(() => {
        console.log('classMeta:');
        console.log(classMeta);
    }, []);
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
                        <section className="classroom__grid-item-top">
                            <InstructorBlock classMeta={classMeta} />
                        </section>
                        <section className="classroom__grid-item-top">
                            <ClassDetailsBlock classMeta={classMeta} />
                        </section>
                        <section className="classroom__grid-item-top">
                            <MeetingDetailsBlock classMeta={classMeta} />
                        </section>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="classroom_container-classlist">
                        <ClassList classMeta={classMeta} />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="classroom_container-classgroups">
                        <ClassGroups classMeta={classMeta} />
                    </div>
                </TabPanel>
            </Tabs>
        </>
    );
};

export default ClassroomContainer;
