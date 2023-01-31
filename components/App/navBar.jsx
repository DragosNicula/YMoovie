import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LogOut } from '../User/logout.jsx';
import logo from "../images/logoMicNegru.png";


export function NavBar(props) {
    const [btnState, setBtnState] = useState(false);

    return(
        <div className='navBar'>
            <div className='navBarLeft'>
                <Navbar.Brand href="\home" >
                    <img src={logo} className='navLogo'/>
                </Navbar.Brand>
                <Nav.Link className='navText' style={{color: "white"}} href="/home" >Home</Nav.Link>
                <Nav.Link className='navText' style={{color: "white"}} href="/addmovie" >Add your movie</Nav.Link>
                <Nav.Link className='navText' style={{color: "white"}} href="/toprated" >Top Rated</Nav.Link>
                <Nav.Link className='navText' style={{color: "white"}} href="/contact" >Contact</Nav.Link>
            </div>
            <div className='navBarRight'>
                {props.statusLogin == null && (
                    <Nav.Link className='navText' style={{color: "white"}} href="/login" >Sign in</Nav.Link>
                )}
                {props.statusLogin == null && (
                    <Nav.Link className='navText' style={{color: "white"}} href="/register" >Sign up</Nav.Link>
                )}
                {props.statusLogin != null && (
                    <Nav.Link className='navText' style={{color: "white"}} href="/myprofile" >My Profile</Nav.Link>
                )}
                {props.statusLogin != null && (
                    <LogOut />
                )}
            </div>
        </div>
    )        
}