import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import logo from "../images/logoMicNegru.png";

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
                alert("Sign in complete!");
                navigate("/home");
                
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
        <div className="background">
            <div className="loginCard">
                <Card>
                    <Card.Body>
                        <img className="loginLogo" src={logo} />
                        <br></br>
                        <br></br>
                        <Card.Title>
                            <h3>
                                <strong>Login Using Your YMoovie Account</strong>
                            </h3>
                        </Card.Title>
                        <br></br>
                        <div className="loginInput">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Email</InputGroup.Text>
                                <Form.Control type="text" onChange={(event) => setUserEmail(event.target.value)}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Password</InputGroup.Text>
                                <Form.Control type="password" onChange={(event) => setUserPassword(event.target.value)}/>
                            </InputGroup>
                        </div>
                        <Button style={{backgroundColor: "#ef5651", borderColor: "#ef5651"}} onClick={() => {loginUser(); getData()}}>Login</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}