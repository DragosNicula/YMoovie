import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../../firebase.js';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import logo from "../images/logoMicNegru.png";


export function AddMovie(props) {
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null);
    const [movieUpload, setMovieUpload] = useState(null);
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('userData')));
    const navigate = useNavigate();
    const storage = getStorage(app);

    function uploadMovie() {
        const path = 'Movies/' + user['Email'] + "/" + title + '-' + v4();
        if (title !== null && description !== null) {
            if (props.statusLogin !== null) {
                if (movieUpload !== null) {
                    const movieRef = ref(storage, path);
                    uploadBytes(movieRef, movieUpload).then(() => {
                        alert("Upload Complete!");
                    })
                }
            } else {
                alert('You must register/login first!');
                navigate('/register');
            }
        } else {
            alert('All fields must be filled!');
        }
    }


    return(
        <div>
            <div className="addMovieCard">
                <Card >
                    <Card.Body>
                        <img className="addMovieLogo" src={logo} />
                        <br></br>
                        <br></br>
                        <Card.Title className="addMovieTitle">
                            <h3>
                                <strong>Upload your movie</strong>
                            </h3>
                        </Card.Title>
                        <br></br>
                        <div className="addMovieInput"> 
                            <InputGroup className="mb-3"> {/* title */}
                                <InputGroup.Text>Movie Title</InputGroup.Text>
                                <Form.Control type="text" onChange={(event) => setTitle(event.target.value)}/>
                            </InputGroup>
                            <InputGroup> {/* description */}
                                <InputGroup.Text>Description</InputGroup.Text>
                                <Form.Control as="textarea" aria-label="With textarea" onChange={(event) => setDescription(event.target.value)}/>
                            </InputGroup>
                            <br></br>
                            <Form.Group controlId="formFile" className="mb-3"> {/* upload */}
                                <Form.Control type="file" onChange={(event) => setMovieUpload(event.target.files[0])} />
                            </Form.Group>
                            <Button style={{marginTop: "10px", backgroundColor: "#00cfff", borderColor: "#00cfff"}} onClick={() => uploadMovie()}>Upload Your Movie</Button>
                        </div >
                    </Card.Body>
                </Card>
                
            </div>
        </div>
    )
}