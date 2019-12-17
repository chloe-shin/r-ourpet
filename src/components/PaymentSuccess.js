import React from 'react';
import {Link} from 'react-router-dom';

function PaymentSuccess() {
    return (
        <div style={{textAlign: 'center', marginTop: '5rem', marginBottom:'5rem'}}>
        <img width="100" height="100" src="/img/confirm.png" />
        <br/>
        <br/>
        <br/>

            <h3> Successfully paid!
            <br/> Thank you</h3>
            <br/>
            <br/>   
           <Link to='/bookings-for-user'> <button style={{backgroundColor: '#FFD256', 
                                         color:'white', 
                                         border:'none',
                                         padding:'12px 10px',
                                         borderRadius:'5px',
                                         boxShadow: '1px 3px 3px rgba(0,0,0,.3)',
                                         width: '200px'}}> Check your bookings </button></Link>
        </div>
    )
}

export default PaymentSuccess;
