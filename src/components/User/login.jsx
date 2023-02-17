import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import logo from "../images/logoMicNegru.png";
import share from '../images/share.png';
import trend from '../images/trend.png';
import rating from '../images/rating.png';
import portfolio from '../images/portfolio.png';

export function Login(props) {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const auth = getAuth(app);
    const navigate = useNavigate();

    function loginUser() {
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredentials) =>{
                const user = userCredentials.user;
                props.setStatusEmail(userEmail);
                alert("Login complete!");
                navigate("/home");
                getData();
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    async function getData() { {/* Retreive data*/}
        const db = getFirestore(app);
        const docRef = doc(db, "userData", userEmail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            window.localStorage.setItem('userData', JSON.stringify(docSnap.data()));
        } else {
        console.log("No such document!");
        }
    }
    
    return(
        <div>
            <div class="form-signin w-100 m-auto feature-icon-small d-inline-flex align-items-center justify-content-center">
                <div style={{width: "400px", border: "2px solid #d2b891", padding: "50px", borderRadius: "20px", marginTop: "50px"}}>
                    <img className="mb-4" src={logo} style={{width: "170px"}} />
                    <h1 className="h3 mb-3 fw-normal">Login with your YMoovie account</h1>
                    <br></br>
                    <div className="form-floating">
                        <input onChange={(event) => setUserEmail(event.target.value)} type="email" className="form-control" id="floatingInput" ></input>
                        <label for="floatingInput">Email Adress</label>
                    </div>
                    <br></br>
                    <div className="form-floating">
                        <input onChange={(event) => setUserPassword(event.target.value)} type="password" className="form-control" id="floatingInput"></input>
                        <label for="floatingInput">Password</label>
                    </div>
                    <br></br>
                    <button  onClick={() => loginUser()} className="w-100 btn btn-lg btn-info" type="submit" style={{color: "white"}}> Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2023</p>
                </div>
            </div>
        </div>
    )
}