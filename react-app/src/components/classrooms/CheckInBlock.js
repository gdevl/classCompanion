import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CheckInBlock = ({ classMeta, userId }) => {
    const [checkedIn, setCheckedIn] = useState(false);
    const checkIn = {
        student_id: userId,
        class_id: classMeta['id'],
    };

    return (
        <>
            <h3>Check In</h3>
            <button>Check-In</button>
        </>
    );
};

export default CheckInBlock;
