import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LogOut } from '../User/logout.jsx';
import logo from "../images/logoMicAlb.png";

export function NavBar(props) {

    return(
        <div>
            <Navbar className="navBar">
                <Container >
                    <Nav>
                        <Navbar.Brand href="\home" >
                            <img src={logo} className="navBarLogo"/>
                        </Navbar.Brand>
                        <Nav.Link style={{ color: "white", paddingRight: "2%", paddingBottom: "3%", marginTop: "2%"}} href="/home" >HOME</Nav.Link>
                        <Nav.Link style={{ whiteSpace: 'nowrap', color: "white", paddingRight: "2%", marginTop: "2%" }} href="/addmovie" >ADD YOUR MOVIE</Nav.Link>
                        <Nav.Link style={{ whiteSpace: 'nowrap', color: "white", paddingRight: "2%", marginTop: "2%" }} href="/toprated" >TOP RATED</Nav.Link>
                        <Nav.Link style={{ color: "white", paddingRight: "2%", marginTop: "2%" }} href="/contact" >CONTACT</Nav.Link>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            {props.statusLogin == null && (
                                <Nav.Link style={{ color: "white", paddingRight: "11%", marginTop: "13.5%" }} href="/register" >REGISTER</Nav.Link>
                            )}
                            {props.statusLogin == null && (
                                <Nav.Link style={{ color: "white", paddingRight: "5%", marginTop: "13.5%" }} href="/login" >LOGIN</Nav.Link>
                            )}
                            {props.statusLogin != null && (
                                <Nav.Link style={{ whiteSpace: 'nowrap', color: "white", paddingRight: "16%", marginTop: "11.5%" }} href="/myprofile" >MY PROFILE</Nav.Link>
                            )}
                            {props.statusLogin != null && (
                                <LogOut />
                            )}
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}