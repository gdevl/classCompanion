import React, { useEffect, useState } from 'react';
import BreakGroups from './BreakGroups';
import GroupCreation from './GroupCreation';

const GroupDetailsBlock = ({ classMeta }) => {
    const breakGroups = async () => {
        const ungroup = await fetch(`/api/classes/${classMeta.id}/ungroup`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const makeGroups = async (classroomId, groupSize) => {
        const groupResponse = await fetch(
            `/api/classes/${classroomId}/groups/${groupSize}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }
        );
    };

    return (
        <>
            <h3>Group Creation</h3>
            {classMeta['groups'].length === 0 ? (
                <>
                    <div className="grouping__menu">
                        <p>You haven't defined any groups yet!</p>
                        <GroupCreation
                            classroomId={classMeta.id}
                            makeGroups={makeGroups}
                        />
                    </div>
                </>
            ) : (
                <>
                    <p>Students divided into groups of </p>
                    <BreakGroups
                        classroomId={classMeta.id}
                        breakGroups={breakGroups}
                    />
                </>
            )}
        </>
    );
};

export default GroupDetailsBlock;
