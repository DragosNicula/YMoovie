import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase.js';



export function Register() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    function registerUser() {
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Register complete!");
        })
        .catch((error) => {
            alert(error.message);
        });
        
    }


    return(
        <div style={{marginLeft: "50rem"}}>
            <br></br>
            <br></br>
            <Card style={{ width: '40rem', height: '33rem'}}>
                <Card.Body>
                    <br></br>
                    <img src={"images/logoMic.png"} width={"30%"} />
                    <br></br>
                    <br></br>
                    <Card.Title>
                        <h3>
                            <strong>Create Your YMoovie Account</strong>
                        </h3>
                    </Card.Title>
                    <br></br>
                    <div style={{margin: "auto", width: "75%"}}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Username</InputGroup.Text>
                            <Form.Control type="text"/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>First Name</InputGroup.Text>
                            <Form.Control type="text"/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Last Name</InputGroup.Text>
                            <Form.Control type="text"/>
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
                    <Button style={{marginTop: "1rem", backgroundColor: "#00CFFF", borderColor: "#00CFFF"}} onClick={() => registerUser()}>Register</Button>
                </Card.Body>
            </Card>
        </div>
    )
}