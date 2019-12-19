

import React from 'react'
import {Link} from 'react-router-dom';

export default function RegisterSuccess() {
    return (
        <div style={{textAlign: 'center', marginTop: '5rem', marginBottom:'5rem'}}>
        <img width="100" height="100" src="/img/confirm.png" />
        <br/>
        <br/>
        <br/>

            <h4 style={{fontFamily:'Open Sans'}}> Thank you
            <br/><br/> Successfully registered! </h4>
            <br/>
            <br/>   
           <a href='/login' className="btn" style={{backgroundColor: '#FFD256', 
                                         color:'white', 
                                         border:'none',
                                         padding:'12px 10px',
                                         borderRadius:'5px',
                                         boxShadow: '1px 3px 3px rgba(0,0,0,.3)',
                                         width: '200px'
                                         }}> Go to login </a>
        </div>
    )
}

