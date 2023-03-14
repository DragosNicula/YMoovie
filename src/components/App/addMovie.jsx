import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { getFirestore, setDoc, doc, updateDoc, arrayUnion} from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import logo from "../images/logoMicNegru.png";



export function AddMovie(props) {
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null);
    const [movieUpload, setMovieUpload] = useState(null);
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('userData')));
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const storage = getStorage(app);

    function uploadMovie() {
        const path = 'Movies/' + user['Email'] + "/" + title;
        if (title !== null && description !== null) {
            if (props.statusLogin !== null) {
                if (movieUpload !== null) {
                    const movieRef = ref(storage, path);
                    uploadBytes(movieRef, movieUpload).then(() => {
                        setMessage("Upload succesfully!")
                    })
                    updateDataBase();
                }
            } else {
                setMessage('You must login first!');
            }
        } else {
            setMessage('All fields must be filled!');
        }
    }

    async function updateDataBase() {
        const db = getFirestore(app);
        const path = doc(db, "userData", user['Email'], "movies", "names");
        const newDoc = await updateDoc(path, {
            NameOfVideos: arrayUnion(title)
        })
        const newDoc3 = await setDoc(doc(db, "userData", user['Email'], "movies", title), {
            Comments: [],
            Author: []
        });
    }


    return(
            <div class="form-signin w-100 m-auto feature-icon-small d-inline-flex align-items-center justify-content-center">
                <div style={{width: "400px", border: "2px solid #d2b891", padding: "50px", borderRadius: "20px", marginTop: "50px"}}>
                    <img className="mb-4" src={logo} style={{width: "170px"}} />
                    <h1 className="h3 mb-3 fw-normal">Upload your movie</h1>
                    <br></br>
                    <div className="form-floating">
                        <input onChange={(event) => setTitle(event.target.value)} type="text" className="form-control" id="floatingInput" ></input>
                        <label for="floatingInput">Movie Title</label>
                    </div>
                    <br></br>
                    <div className="form-floating">
                        <input onChange={(event) => setDescription(event.target.value)} type="text" className="form-control" id="floatingInput"></input>
                        <label for="floatingInput">Description</label>
                    </div>
                    <br></br>
                    <Form.Group controlId="formFile" className="mb-3"> {/* upload */}
                        <Form.Control type="file" onChange={(event) => setMovieUpload(event.target.files[0])} />
                    </Form.Group>
                    <br></br>
                    <button onClick={() => uploadMovie()} className="w-100 btn btn-lg btn-info" type="submit" style={{color: "white"}}> Upload Movie </button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="message">
                        {message}
                    </div>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2023</p>
                </div>
            </div>
    )
}