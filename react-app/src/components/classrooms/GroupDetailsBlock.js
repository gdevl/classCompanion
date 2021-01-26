import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BreakGroups from './BreakGroups';
import GroupCreation from './GroupCreation';
import { setGroupsDefined } from '../../store/define_groups';

const GroupDetailsBlock = ({ classMeta }) => {
    const dispatch = useDispatch();
    const groups_defined = useSelector((state) => state.groups_defined);
    const groups = useSelector((state) => state.groups);

    useEffect(() => {
        if (Object.keys(groups).length > 0) {
            dispatch(setGroupsDefined(true));
        } else {
            dispatch(setGroupsDefined(false));
        }
    }, [groups, groups_defined]);

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
            {!groups_defined ? (
                <>
                    <GroupCreation
                        classroomId={classMeta.id}
                        makeGroups={makeGroups}
                    />
                </>
            ) : (
                <>
                    <p>
                        Groups of
                        {` ${Object.values(groups[0]['members']).length}`}
                    </p>
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
