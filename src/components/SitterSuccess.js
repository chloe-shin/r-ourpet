import React from 'react';
import {Link} from 'react-router-dom';

function Successful() {
    return (
        <div style={{textAlign: 'center', marginTop: '5rem', marginBottom:'5rem'}}>
        <img width="100" height="100" src="/img/checked.png" />
        <br/>
        <br/>
        <br/>

            <h3> Thank you!
            <br/> Successfully registered as Sitter</h3>
            <br/>
            <br/>   
           <Link to='/'> <button style={{backgroundColor: '#FFD256', 
                                         color:'white', 
                                         border:'none',
                                         padding:'12px 10px',
                                         borderRadius:'5px',
                                         boxShadow: '1px 3px 3px rgba(0,0,0,.3)',
                                         width: '200px'}}> Back to hompage </button></Link>
        </div>
    )
}

export default Successful;
