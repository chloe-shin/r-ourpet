import React from 'react';


function BookingStatusSitter (props) {
    if (!props.booking) {
        return <React.Fragment />;
    }
    if (props.booking.is_confirmed === null) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/img/alert.png" width="30" height="30" />
                <p style={{ color: "orange" }}> Not yet confirmed </p>
            </div>
        )
    }
    if (props.booking.is_confirmed === false) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/img/cancel.png" width="30" height="30" />
                <p style={{ color: "red" }}> Rejected </p>
            </div>
        )
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
           
            {props.booking.is_paid ? 
                <>
                <img src="/img/paid.png" width="30" height="30" />
                <strong><p style={{ color: 'green' }}> Paid </p> </strong>
                </>:
                <>
                   <img src="/img/confirm.png" width="30" height="30" />
                    <p style={{ color: "green" }}> Confirmed <br />
                        *not paid</p>
                </>
            }
        </div>
    )
}

export default BookingStatusSitter;
