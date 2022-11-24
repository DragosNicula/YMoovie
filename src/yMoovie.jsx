import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom' 
import { Register } from './components/User/register'
import { Login } from './components/User/login'
import { AddMovie } from './components/App/addMovie'
import { Home } from './components/App/home'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase.js';
import { LogOut } from './components/User/logout.jsx';
import './App.css';

export default function YMoovie() {
    const [statusLogin, setStatusLogin] = useState(null);
    const [statusEmail, setStatusEmail] = useState();
    const [userData, setUserData] = useState();
    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setStatusLogin(user);
            }
        });
    });
    
    function testPentruAVerificaDatele() {
        console.log(statusLogin);
        console.log(userData['FirstName']);
    }
    
    return(
        <div>
            <div>
                <Navbar className="navBar">
                    <Container >
                        <Nav>
                            <Navbar.Brand href="\home">
                                <img src={('images/logoMicAlb.png')} className="navBarLogo"/>
                            </Navbar.Brand>
                            <Nav.Link href="/home" style={{color: "#EFF1F3", marginTop: '0.9vh'}}>Home</Nav.Link>
                            <Nav.Link href="/addmovie" style={{color: "#EFF1F3", marginTop: '0.9vh'}}>AddMovie</Nav.Link>
                            <button onClick={() => testPentruAVerificaDatele()()}>GetData</button>
                            <div style={{marginLeft: "70vh", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                {statusLogin == null && (
                                    <Nav.Link href="/register" style={{color: "#EFF1F3", marginTop: '0.9vh'}}>Register</Nav.Link>
                                )}
                                {statusLogin == null && (
                                    <Nav.Link href="/login" style={{color: "#EFF1F3", marginTop: '0.9vh'}}>Login</Nav.Link>
                                )}
                                {statusLogin != null && (
                                    <LogOut />
                                )}
                            </div>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/AddMovie" element={<AddMovie statusLogin={statusLogin}/>} />
                    <Route path="Register" element={<Register setStatusEmail={setStatusEmail} setUserData={setUserData}/>} />
                    <Route path="Login"  element={<Login setStatusEmail={setStatusEmail} setUserData={setUserData} />} />
                </Routes>
            </div>
        </div>
    )
}