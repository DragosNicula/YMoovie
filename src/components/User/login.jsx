import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase.js'

export function Login() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    function loginUser() {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredentials) =>{
                const user = userCredentials.user;
                alert("Sign in complete!")
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
            <br></br>
            <br></br>
            <Card style={{ width: '40rem', height: '22.5rem'}}>
                <Card.Body>
                    <br></br>
                    <img src={"images/logoMicNegru.png"} width={"30%"} />
                    <br></br>
                    <br></br>
                    <Card.Title>
                        <h3>
                            <strong>Login Using Your YMoovie Account</strong>
                        </h3>
                    </Card.Title>
                    <br></br>
                    <div style={{margin: "auto", width: "75%"}}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Email</InputGroup.Text>
                            <Form.Control type="text" onChange={(event) => setUserEmail(event.target.value)}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Password</InputGroup.Text>
                            <Form.Control type="password" onChange={(event) => setUserPassword(event.target.value)}/>
                        </InputGroup>
                    </div>
                    <Button style={{marginTop: "1rem", backgroundColor: "#00CFFF", borderColor: "#00CFFF"}} onClick={() => loginUser()}>Sign In</Button>
                </Card.Body>
            </Card>
        </div>
    )
}