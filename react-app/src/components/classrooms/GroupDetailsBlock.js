import React, { useContext } from 'react';
import { ClassroomContext } from './SingleClassroom';
import BreakGroups from './BreakGroups';
import GroupCreation from './GroupCreation';

const GroupDetailsBlock = () => {
    const { classroomId, groups } = useContext(ClassroomContext);

    const breakGroups = async () => {
        await fetch(`/api/classes/${classroomId}/ungroup`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const makeGroups = async (classroomId, groupSize) => {
        await fetch(`/api/classes/${classroomId}/groups/${groupSize}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
    };

    return (
        <section className="classroom__grid-item-top bg-purple">
            <h3>Group Creation</h3>
            {!Object.keys(groups).length ? (
                <GroupCreation makeGroups={makeGroups} />
            ) : (
                <>
                    <p>
                        Groups of{' '}
                        {`${Object.values(groups['0'].members).length}`}
                    </p>
                    <BreakGroups breakGroups={breakGroups} />
                </>
            )}
        </section>
    );
};

export default GroupDetailsBlock;
