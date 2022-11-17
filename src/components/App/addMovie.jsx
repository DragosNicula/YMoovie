import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../../firebase.js'
import { v4 } from 'uuid'

export function AddMovie() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [movieUpload, setMovieUpload] = useState(null)
    const storage = getStorage(app);

    function uploadMovie() {
        if (movieUpload !== null) {
            const movieRef = ref(storage, `movies/` + title + '-' + v4());
            uploadBytes(movieRef, movieUpload).then(() => {
                alert("Upload Complete!");
            })
        }
    }


    return(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
            <br></br>
            <br></br>
            <Card style={{ width: '40rem', height: '450px'}}>
                <Card.Body>
                    <br></br>
                    <img src={"images/logoMicNegru.png"} width={"30%"} />
                    <br></br>
                    <br></br>
                    <Card.Title>
                        <h3>
                            <strong>Upload Your Movie</strong>
                        </h3>
                    </Card.Title>
                    <br></br>
                    <div style={{margin: "auto", width: "75%"}}> 
                        <InputGroup className="mb-3"> {/* title */}
                            <InputGroup.Text>Movie Title</InputGroup.Text>
                            <Form.Control type="text" onChange={(event) => setTitle(event.target.value)}/>
                        </InputGroup>
                        <InputGroup> {/* description */}
                            <InputGroup.Text>Description</InputGroup.Text>
                            <Form.Control as="textarea" aria-label="With textarea" onChange={(event) => setDescription(event.target.value)}/>
                        </InputGroup>
                    </div>
                    <Form.Group controlId="formFile" className="mb-3"> {/* upload */}
                        <Form.Control type="file" onChange={(event) => setMovieUpload(event.target.files[0])} style={{margin: "auto", marginTop: "15px", width: "75%"}}/>
                    </Form.Group>
                    <Button style={{marginTop: "10px", backgroundColor: "#00CFFF", borderColor: "#00CFFF"}} onClick={() => uploadMovie()}>Upload Your Movie</Button>
                </Card.Body>
            </Card>
        </div>
    )
}