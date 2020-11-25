import React, { useState, useEffect } from 'react';

function Footer() {

    const [time, setTime] = useState()

    const tick = () => {
        let today = new Date();
        setTime(today.toLocaleTimeString())
    }

    useEffect(() => {
        setInterval(tick, 1000);
    })

    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    let date1 = mm + '/' + dd + '/' + yyyy;

    return (
        <div className='footer__container'>
            <div className='footer__day'>
                {date1}
            </div>
            <div className='footer__time'>
                {time}
            </div>
            {/* <div className='footer__weather'></div> */}
        </div>
    );
}

export default Footer;
