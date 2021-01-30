import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App';
import './footer.css';

function Footer() {
    const currentUser = useContext(UserContext);

    const [time, setTime] = useState();

    const tick = () => {
        let today = new Date();
        setTime(today.toLocaleTimeString());
    };

    useEffect(() => {
        setInterval(tick, 1000);
    });

    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let date1 = mm + '/' + dd + '/' + yyyy;

    if (!currentUser) return;

    return (
        <>
            {currentUser.role ? (
                <div
                    className={
                        currentUser.role === 'instructor'
                            ? 'footer__container bg-green'
                            : 'footer__container bg-blue'
                    }
                >
                    <div className="footer__day">{date1}</div>
                    <div className="footer__time">{time}</div>
                </div>
            ) : null}
        </>
    );
}

export default Footer;
