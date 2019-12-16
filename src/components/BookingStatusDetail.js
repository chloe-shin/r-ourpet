import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

function BookingStatusDetail(props) {
    if(!props.booking) {
        return <React.Fragment/>;
    }
    if(props.booking.is_confirmed === null) {
        return  (
            <div style={{display:'flex', alignItems:'flexStart', fontWeight:'700'}}>
            <img src="/img/alert.png" width="25" height="25"/>
            <p style={{color:"orange"}}>&nbsp;Booking is not yet confirmed</p>
            </div>
        )}
    if(props.booking.is_confirmed === false) {
        return (
        <div style={{display:'flex', alignItems:'flexStart', fontWeight:'700'}}> 
        <img src="/img/cancel.png" width="25" height="25"/>
        <p style={{color:"orangeRed"}}> &nbsp;Booking Rejected </p>
        </div>
    )}
    return (  
        <div style={{display:'flex', alignItems:'flexStart', fontWeight:'700'}}> 
        <img src="/img/confirm.png" width="25" height="25"/>
        <p style={{color:"green"}}>&nbsp;Booking Confirmed </p>
        </div>
    )
}

export default BookingStatusDetail;
