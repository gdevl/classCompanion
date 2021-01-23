import React from 'react';
import { useSelector } from 'react-redux';

const CheckInBlock = ({ classMeta }) => {
    const studentId = useSelector((state) => state.currentUser.id);
    // const checkIns = classMeta['check_ins'];
    // let checkedIn = checkIns.includes(studentId);

    return (
        <>
            <h3>Check In</h3>
        </>
    );
};

export default CheckInBlock;
