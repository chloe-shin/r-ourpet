import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown, Nav, Button, } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



// import InputRange from 'react-input-range';
// import 'react-input-range/lib/css/index.css';

export default function NavBar(props) {
    const logout = async () => {
        const resp = await fetch(process.env.REACT_APP_BURL+"/logout", {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        });
        if (resp.ok){
            props.setUser(null)
            localStorage.clear('token')
        }
    }

    return (
        <Navbar bg="transparent" expand="lg" className="nav fixed-top">         
            <Link to="/"> <Navbar.Brand className ="ourpet">
             Ourpet</Navbar.Brand> </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />        
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link to="/sitter"> <div className="sign-up mr-5">Become a sitter </div> </Link>
                  {props.user
                     ?
                      <>
                      <div  onClick={()=>logout()} className="sign-in">Sign out</div>
                      </> 
                    :
                     <>
                    <Link to="/register">  <div className="sign-up mr-5"> Sign Up </div> </Link>
                    <Link to="/login"> <div className="sign-in">Sign In</div> </Link>
                     </>
                    }
                   
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )


}
