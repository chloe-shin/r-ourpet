import React from 'react';
import { Link } from 'react-router-dom';



function BeSitter(props) {
    return (
        <div className="besitter" style={{ color: "white", fontFamily:"Open Sans" }}>
        <div>
        <h1 className="besittertext"><strong> GET PAID TO PLAY WITH PETS </strong></h1>
        <h5 >How it works?</h5> <br/>
        1. Create your profile.
        We guide you through building a profile.<br/><br/>
        2. Accept requests
        Check the requests from customer and confirm the booking.<br/><br/>
        3. Get paid
        Payments are ready for withdrawal two days after you have completed a service.<br/><br/>
        {props.user? 
        <Link to="/sitter-register">
        <button className="start"> <strong>Get Started</strong> </button>
        </Link>:
        <Link to="/login">
        <button className="start"> <strong><i class="fas fa-sign-in-alt"></i> Log in to start</strong> </button>
        </Link>
        }
        </div>
        
        
        </div>
    )
}
export default BeSitter;
