import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import logo from "../images/logoMicNegru.png";


export function Register(props) {
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [userName, setUserName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [url, setUrl] = useState();
    const navigate = useNavigate();
    
    async function updateDataBase() {
        const db = getFirestore(app);
        const newDoc = await setDoc(doc(db, "userData", userEmail), {
            UserName: userName,
            FirstName: firstName,
            LastName: lastName,
            Email: userEmail,
            Rating: 3,
            NumberOfVotes: 1,
            SumOfVotes: 3
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

    function registerUser() {
        const auth = getAuth(app);
        if (userEmail !== null && userPassword !== null && userName !== null && firstName !== null && lastName !== null) {
            createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                props.setStatusEmail(userEmail);
                alert("Register complete!");
                navigate("/home");
            })
            .catch((error) => {
                alert(error.message);
            });
            updateDataBase();
            getData();
        } else {
            alert('All fields must be filled!');
        }
    }

    return(
        <div>
            <div class="form-signin w-100 m-auto feature-icon-small d-inline-flex align-items-center justify-content-center">
                <div style={{width: "500px", border: "2px solid #d2b891", padding: "50px", borderRadius: "20px", marginTop: "50px"}}>
                    <img className="mb-4" src={logo} style={{width: "170px"}} />
                    <h1 className="h3 mb-3 fw-normal">Create your YMoovie account</h1>
                    <br></br>
                    <div className="form-floating">
                        <input onChange={(event) => setUserName(event.target.value)} type="text" className="form-control" id="floatingInput" ></input>
                        <label for="floatingInput">Username</label>
                    </div>
                    <br></br>
                    <div className="form-floating">
                        <input onChange={(event) => setFirstName(event.target.value)} type="text" className="form-control" id="floatingInput"></input>
                        <label for="floatingInput">First name</label>
                    </div>
                    <br></br>
                    <div className="form-floating">
                        <input onChange={(event) => setLastName(event.target.value)} type="text" className="form-control" id="floatingInput"></input>
                        <label for="floatingInput">Last name</label>
                    </div>
                    <br></br>
                    <div className="form-floating">
                        <input onChange={(event) => setUserEmail(event.target.value)} type="text" className="form-control" id="floatingInput"></input>
                        <label for="floatingInput">Email</label>
                    </div>
                    <br></br>
                    <div className="form-floating">
                        <input onChange={(event) => setUserPassword(event.target.value)} type="password" className="form-control" id="floatingInput"></input>
                        <label for="floatingInput">Password</label>
                    </div>
                    <br></br>
                    <button onClick={() => registerUser()} className="w-100 btn btn-lg btn-info" type="submit" style={{color: "white"}}> Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2023</p>
                </div>
            </div>
        </div>
    )
}