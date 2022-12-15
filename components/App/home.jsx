import React, { useState, useEffect} from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase.js';
import '../../App.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export function Home() {
    const storage = getStorage(app);
    const navigate = useNavigate();

    function redirect() {
        navigate("/topRated")
    }
    
    return(
     <div>
        <div>
            <div className="homeComponent">
                <div style={{fontSize: "60px"}}>Welcome to YMOOVIE</div>
                <Button onClick={() => redirect()} style={{backgroundColor: "#ef5651", borderColor: "#ef5651", marginTop: "10px"}}>LET'S WATCH SOME MOVIES FROM OUR TOP RATED USERS</Button>
            </div>
        </div>
     </div>
    
    )
}