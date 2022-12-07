import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase.js';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export function LogOut() {
    const auth = getAuth(app);
    const navigate = useNavigate();

    function logOut() {
        signOut(auth).then(() => {
            navigate('/home')
            alert("Sign Out Succesfull")
            window.location.reload()
        }).catch((error) => {
            alert(error.message)
        });
    }

    return(
        <div>
           <Button style={{marginTop: "35%", backgroundColor: "#ef5651", borderColor: "#ef5651"}} onClick={() => logOut()}>LogOut</Button>
        </div>
    )
}