import React from 'react'
import { Routes, Route, Link } from 'react-router-dom' 
import { Register } from './components/User/register'
import { Login } from './components/User/login'
import { AddMovie } from './components/App/addMovie'
import { Home } from './components/App/home'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function YMoovie() {
    
    return(
        <div >
            <div>
                <Navbar style={{backgroundColor: "#7b3000", fontFamily: "Times New Roman", fontSize: "1.5rem", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '8vh'}}>
                    <Container >
                    <Nav >
                        <Navbar.Brand href="\home">
                            <img src={('images/logoMicAlb.png')} style={{width: '20vh'}} className="d-inline-block align-top" />
                        </Navbar.Brand>
                        <Nav.Link href="/home" style={{color: "#EFF1F3", marginTop: '0.9vh'}}>Home</Nav.Link>
                        <Nav.Link href="/addmovie" style={{color: "#EFF1F3", marginTop: '0.9vh'}}>Add Movie</Nav.Link>
                        <Nav.Link href="/register" style={{color: "#EFF1F3", marginTop: '0.9vh'}}>Register</Nav.Link>
                        <Nav.Link href="/login" style={{color: "#EFF1F3", marginTop: '0.9vh'}}>Login</Nav.Link>
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