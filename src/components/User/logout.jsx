import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase.js';
import Button from 'react-bootstrap/Button';


export function LogOut() {
    const auth = getAuth(app);

    function logOut() {
        signOut(auth).then(() => {
            alert("Sign Out Succesfull")
            window.location.reload();
        }).catch((error) => {
            alert(error.message)
        });
    }

    return(
        <div>
           <Button style={{marginTop: "50%", backgroundColor: "#00CFFF", borderColor: "#00CFFF"}} onClick={() => logOut()}>LogOut</Button>
        </div>
    )
}