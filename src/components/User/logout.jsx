import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase.js';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';


export function LogOut() {
    const auth = getAuth(app);
    const navigate = useNavigate();

    function logOut() {
        signOut(auth).then(() => {
            navigate('/home')
            window.location.reload()
        }).catch((error) => {
            alert(error.message)
        });
    }

    return(
        <a onClick={() => logOut()} style={{color: "white"}} class="btn btn-info" role="button" aria-pressed="true">Logout</a>
    )
}