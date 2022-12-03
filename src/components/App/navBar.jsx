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
                        <Nav.Link href="/home" style={{color: "#EFF1F3", marginTop: '2%'}}>Home</Nav.Link>
                        <Nav.Link href="/addmovie" style={{color: "#EFF1F3", marginTop: '2%'}}>AddYourMovie</Nav.Link>
                        <Nav.Link href="/toprated" style={{color: "#EFF1F3", marginTop: '2%'}}>TopRated</Nav.Link>
                        <Nav.Link href="/contact" style={{color: "#EFF1F3", marginTop: '2%'}}>Contact</Nav.Link>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            {props.statusLogin == null && (
                                <Nav.Link href="/register" style={{color: "#EFF1F3", marginTop: '15%'}}>Register</Nav.Link>
                            )}
                            {props.statusLogin == null && (
                                <Nav.Link href="/login" style={{color: "#EFF1F3", marginTop: '15%'}}>Login</Nav.Link>
                            )}
                            {props.statusLogin != null && (
                                <Nav.Link href="/myprofile" style={{color: "#EFF1F3", marginTop: '15%'}}>MyProfile</Nav.Link>
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