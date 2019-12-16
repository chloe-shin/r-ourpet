import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

function BookingStatus(props) {
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
                    <Link to={'/bookings/' + (props.booking.id) + '/detail'}>
                        <button style={{
                            backgroundColor: '#FFD256',
                            color: 'white',
                            padding: '12px 10px',
                            marginTop: '5px',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '12px'
                        }}> <i class="far fa-calendar-alt"></i> Book now</button>
                    </Link>
                </>
            }
        </div>
    )
}

export default BookingStatus;
