import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LogOut } from '../User/logout.jsx';
import logo from "../images/logoMicAlb.png";
import { NavItem } from 'react-bootstrap';


export function NavBar(props) {
    const [btnState, setBtnState] = useState(false);

    return(
        <div className='navBar'>
            <div className='navLogo'>
                <Navbar.Brand href="\home" >
                    <img src={logo} className='navLogo'/>
                </Navbar.Brand>
            </div>
            <div className='navButtons'>
                    <Nav.Link className='navText' style={{color: "white"}} href="/home" >HOME</Nav.Link>
                    <Nav.Link className='navText' style={{color: "white"}} href="/addmovie" >ADD YOUR MOVIE</Nav.Link>
                    <Nav.Link className='navText' style={{color: "white"}} href="/toprated" >TOP RATED</Nav.Link>
                    <Nav.Link className='navText' style={{color: "white"}} href="/contact" >CONTACT</Nav.Link>
                    {props.statusLogin == null && (
                        <Nav.Link className='navText' style={{color: "white"}} href="/register" >REGISTER</Nav.Link>
                    )}
                    {props.statusLogin == null && (
                        <Nav.Link className='navText' style={{color: "white"}} href="/login" >LOGIN</Nav.Link>
                    )}
                    {props.statusLogin != null && (
                        <Nav.Link className='navText' style={{color: "white"}} href="/myprofile" >MY PROFILE</Nav.Link>
                    )}
                    {props.statusLogin != null && (
                        <LogOut />
                    )}
            </div>
        </div>
    )
}