import React from 'react';

function BookingStatus(props) {
    if(!props.booking) {
        return <React.Fragment/>;
    }
    if(props.booking.is_confirmed === null) {
        return <span> Not yet confirmed</span>
    }
    if(props.booking.is_confirmed === false) {
        return <span> Rejected </span>
    }
    return <span> Confirmed </span> 
}

export default BookingStatus;
