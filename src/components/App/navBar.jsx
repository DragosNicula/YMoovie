import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LogOut } from '../User/logout.jsx';
import logo from "../images/logoMicNegru.png";
import bootstrap from 'bootstrap';


export function NavBar(props) {
    const [btnState, setBtnState] = useState(false);

    return(
        <div>
            <div>
                <div class="b-example-divider"></div>
                <div class="container">
                    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                        <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                            <img src={logo} className='navLogo'/>
                        </a>
                        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/home" style={{fontSize: "20px"}} class="nav-link px-2 link-dark">Home</a></li>
                            <li><a href="/addmovie" style={{fontSize: "20px"}} class="nav-link px-2 link-dark">Upload Movie</a></li>
                            <li><a href="/toprated" style={{fontSize: "20px"}} class="nav-link px-2 link-dark">Top Rated</a></li>
                            <li><a href="/contact" style={{fontSize: "20px"}} class="nav-link px-2 link-dark">Contact</a></li>
                        </ul>
                            <div className="navBar" class="col-md-3 text-end">
                                {props.statusLogin == null && (
                                    <a href="/login" class="btn btn-outline-info me-2" role="button" aria-pressed="true">Login</a>
                                )}
                                {props.statusLogin == null && (
                                    <a href="/register" style={{color: "white"}} class="btn btn-info" role="button" aria-pressed="true">Register</a>
                                )}
                                {props.statusLogin != null && (
                                    <a href="/myprofile" class="btn btn-outline-info me-2" role="button" aria-pressed="true">My Profile</a>
                                )}
                                {props.statusLogin != null && (
                                    <LogOut/>
                                )}
                            </div>
                    </header>
                </div>
            </div>
        </div>
    )        
}