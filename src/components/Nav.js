import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown, Nav, Button, } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



// import InputRange from 'react-input-range';
// import 'react-input-range/lib/css/index.css';

export default function NavBar(props) {
    const logout = async () => {
        const resp = await fetch(process.env.REACT_APP_BURL + "/logout", {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        });
        if (resp.ok) {
            props.setUser(null)
            localStorage.clear('token')
        }
    }

    return (
        <Navbar id="navbar" bg="transparent" expand="lg" className="nav ">
            <Link to="/"> <Navbar.Brand className="ourpet" style={{ fontFamily: "Mali", fontSize: "25px", fontWeight: "900", color: "#FFD256" }}>
                <i class="fas fa-paw"></i> Ourpet</Navbar.Brand> </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto ul">
                    <Link to="/besitter"> <div className="sign mr-5"> Become a sitter </div> </Link>
                {props.user
                    ?
                    <>
                    <div onClick={() => logout()} className="sign"> Sign out</div>
                    </>
                    :
                    <>
                    <Link to="/register">  <div className="sign mr-5"> Sign Up </div> </Link>
                    <Link to="/login"> <div className="sign">  Sign In</div> </Link>
                    </>
                }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )


}
