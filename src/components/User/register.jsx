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
            NumberOfVotes: 5
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
        <div className="background">
            <div className="registerCard">
                <Card >
                    <Card.Body>
                        <br></br>
                        <img className="registerLogo" src={logo} />
                        <br></br>
                        <br></br>
                        <Card.Title className="registerTitle">
                            <h3>
                                <strong>Create Your YMoovie Account</strong>
                            </h3>
                        </Card.Title>
                        <br></br>
                        <div className="registerInput">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Username</InputGroup.Text>
                                <Form.Control type="text" onChange={(event) => setUserName(event.target.value)}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>First Name</InputGroup.Text>
                                <Form.Control type="text" onChange={(event) => setFirstName(event.target.value)}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Last Name</InputGroup.Text>
                                <Form.Control type="text" onChange={(event) => setLastName(event.target.value)}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Email</InputGroup.Text>
                                <Form.Control type="text" onChange={(event) => setUserEmail(event.target.value)}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Password</InputGroup.Text>
                                <Form.Control type="password" onChange={(event) => setUserPassword(event.target.value)}/>
                            </InputGroup>
                        </div>
                        <Button style={{backgroundColor: "#00CFFF", borderColor: "#00CFFF"}} onClick={() => registerUser()}>Register</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}