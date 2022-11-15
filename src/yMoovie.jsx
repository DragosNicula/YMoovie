import React from 'react'
import { Routes, Route, Link } from 'react-router-dom' 
import { Register } from './components/register'
import { Login } from './components/login'
import { AddMovie } from './components/addMovie'
import { Home } from './components/home'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function YMoovie() {
    
    return(
        <div >
            <div>
                <Navbar style={{height: "5rem", backgroundColor: "#7b3000", fontFamily: "Times New Roman", fontSize: "1.5rem"}}>
                    <Container >
                    <Nav >
                        <Navbar.Brand href="\home">
                            <img src={('images/logoMic.png')} width="150" height="25" style={{marginTop: 10}} className="d-inline-block align-top" />
                        </Navbar.Brand>
                        <Nav.Link href="/home" style={{color: "#EFF1F3"}}>Home</Nav.Link>
                        <Nav.Link href="/addmovie" style={{color: "#EFF1F3"}}>Add Movie</Nav.Link>
                        <Nav.Link href="/register" style={{color: "#EFF1F3"}}>Register</Nav.Link>
                        <Nav.Link href="/login" style={{color: "#EFF1F3"}}>Login</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/AddMovie" element={<AddMovie />} />
                    <Route path="Register" element={<Register />} />
                    <Route path="Login" element={<Login />} />
                </Routes>
            </div>
        </div>
    )
}