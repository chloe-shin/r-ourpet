import React from 'react';
import { Link } from 'react-router-dom';



function BeSitter() {
    return (
        <div className="besitter">
  
                <h1 className="besittertext" style={{ color: "black" }}> GET PAID DO PLAY WITH PETS </h1>
        
            <h5>How it works?</h5> <br/>
            1. Create your profile
            We guide you through building a profile that showcases information pet parents care about.<br/><br/>
            2. Accept requests
            Tell us the types of dogs you want to care for and the dates that work for you. You make your own schedule.<br/><br/>
            3. Get paid
            Payments are ready for withdrawal two days after you have completed a service.<br/><br/>
            <Link to="/sitter-register"><button className="start"> Get Started </button></Link>
        </div>
    )
}
export default BeSitter;
