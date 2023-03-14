import React, { useState, useEffect } from 'react';
import { getStorage, ref, listAll, getDownloadURL} from "firebase/storage";
import { app } from '../../firebase.js';
import { doc, updateDoc, getFirestore, getDoc,  arrayUnion } from "firebase/firestore";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import avatar from "../images/avatar.jpg";
import "../../../node_modules/video-react/dist/video-react.css"
import share from '../images/share.png';
import trend from '../images/trend.png';
import rating from '../images/rating.png';
import portfolio from '../images/portfolio.png';
import { useNavigate } from 'react-router-dom';
import userLogo from "../images/userLogo.jpg";

export function UserProfile(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('userData')));
    const [moviesList, setMoviesList] = useState([]);
    const [moviesNameList, setMoviesNameList] = useState([]);
    const [value, setValue] = useState(3);
    const [userEmail, setUserEmail] = useState(user['Email']);
    const [comment, setComment] = useState();
    const [author, setAuthorName] = useState();
    const [commentsList, setCommentsList] = useState([]);
    const [commentsStatusArray, setCommentsStatusArray] = useState([]);
    const [forceRender, setForceRender] = useState();
    const storage = getStorage(app);
    const db = getFirestore(app);
    const moviesListRef = ref(storage, "Movies/" + user['Email']);
    const updateFields = doc(db, "userData", user['Email']);
    

    useEffect(() => {
        getNames();
        listAll(moviesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setMoviesList((prev) => [...prev, url]);
                    setCommentsStatusArray((result) => [...result, false]);
                });
            })
        })
    }, [])

    async function getNames() {
        const docRef = doc(db, "userData", userEmail, "movies", "names");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setMoviesNameList(docSnap.data());  
        } else {
        console.log("No such document!");
        }
    }

    async function getComments(index) {
        const path = doc(db, "userData", userEmail, "movies", moviesNameList.NameOfVideos[index]);
        const docSnap = await getDoc(path);
        if (docSnap.exists()) {
            setCommentsList(docSnap.data());
        } else {
        console.log("No such document!");
        } 
    }

    async function getData() {
        const db = getFirestore(app);
        const docRef = doc(db, "userData", userEmail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            window.localStorage.setItem('userData', JSON.stringify(docSnap.data()));
        } else {
        console.log("No such document!");
        }
    }

    async function updateField(newValue) {
        console.log(value);
        await updateDoc(updateFields, {
            "NumberOfVotes": user['NumberOfVotes'] + 1,
            "SumOfVotes": user['SumOfVotes'] + newValue,
            "Rating": user['SumOfVotes'] / user['NumberOfVotes']
          });
    }
    
    async function sendCommentToDatabase(event, index) {
        const path = doc(db, "userData", user['Email'], "movies", moviesNameList.NameOfVideos[index]);
        const newDoc = await updateDoc(path, {
            Comments: arrayUnion(comment),
            Author: arrayUnion(author)
        })
        setComment("");
    }

    function setCommentToTrue(index) {
        commentsStatusArray[index] = true;
    }

    function setCommentToFalse(index) {
        commentsStatusArray[index] = false;
        setForceRender({...forceRender});
    }

    function setAllCommentsToFalse() {
        commentsStatusArray.map((item, i) => {
            commentsStatusArray[i] = false;
        });
    }

    function displayComments(index) {
        setAllCommentsToFalse();
        getComments(index);
        if (commentsStatusArray[index] == false) {
            setCommentToTrue(index);
        }
    }

    return(
        <div>
            <div style={{width: "400px", border: "1px solid #d2b891", padding: "40px", borderRadius: "20px", margin: "auto"}}>       
                <div class="card-body text-center">
                    <img src={avatar} class="rounded-circle img-fluid" style={{border: "2px solid #00cfff", width: "150px"}}/>
                    <h2 class="my-2">{user['UserName']}</h2>
                    <p class="text-muted mb-1">Name: {user['FirstName']} {user['LastName']}</p>
                    <p class="text-muted mb-1">Email: {user['Email']}</p>
                    <h3 class="my-2">Rating: {user['Rating'].toFixed(2)}</h3>
                </div>
            </div>
            <br></br>
            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {moviesList.map((url, index) => {
                            return(
                                <div>
                                    <div class="col">
                                        <div class="card shadow-sm">
                                            <video controls resizeMode='contain'>
                                                <source src={url} type="video/mp4"/>
                                            </video>
                                            <div class="card-body">
                                                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}}>
                                                <p class="card-text">Rate this moovie: </p>
                                                <Box style={{marginLeft: "10px"}} className="ratingSystemPos" sx={{'& > legend': { mt: 3 }}}>
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={value}
                                                        onChange={(event, newValue) => {
                                                        setValue(newValue);
                                                        updateField(newValue)
                                                        getData();
                                                        alert("Vote Submitted");
                                                        navigate('/home');
                                                        }}
                                                    />
                                                </Box>
                                                </div>
                                            </div>
                                            <div style={{marginTop: "-5px", marginLeft: "25px", marginRight: "25px", marginBottom: "25px", border: "1px solid #d2b891", borderRadius: "20px"}}> {/* rate + submit comment */}
                                                <p style={{marginTop: "10px"}} class="card-text">Add a comment</p>
                                                <input onChange={(event) => setAuthorName(event.target.value)} style={{width: "90%", margin: "auto"}} type="text" placeholder="Enter your name..." className="form-control" id="floatingInput"></input>
                                                <br></br>
                                                <textarea onChange={(event) => setComment(event.target.value)} style={{width: "90%", margin: "auto"}} placeholder="Enter your comment..." class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                <br></br>
                                                <a onClick={event => sendCommentToDatabase(event, index)} key={index} style={{color: "white", marginBottom: "20px"}} class="btn btn-info " role="button" aria-pressed="true">Submit Comment</a>
                                                <br></br>
                                            </div>
                                            <div > {/* display comments */}
                                                {commentsStatusArray[index] == true && (
                                                    <div style= {{marginTop: "-5px", marginLeft: "25px", marginRight: "25px", marginBottom: "25px", border: "1px solid #d2b891", borderRadius: "20px"}}>
                                                        <br></br>
                                                        <button onClick={() => setCommentToFalse(index)} style={{color: "white", marginBottom: "20px"}} class="btn btn-danger" > Hide Comments </button>
                                                        {commentsList.Comments.map((coment, i) => {
                                                            return(
                                                                <div style={{width: "90%", margin: "auto", paddingBottom: "15px"}}>
                                                                    <div class="list-group w-auto">
                                                                        <a href="#" class="list-group-item list-group-item-action d-flex gap-0 py-3" aria-current="true">
                                                                        <img style={{margin: "auto"}} src={userLogo} width="32" height="32" class="rounded-circle flex-shrink-0"/>
                                                                        <div style={{marginLeft: "10px"}} class="d-flex gap-2 w-100 justify-content-between">
                                                                            <div style={{margin: "auto"}}>
                                                                                <p class="mb-0 opacity-75">{commentsList.Author[i]}</p>
                                                                                <h6 class="mb-0">{coment}</h6>
                                                                            </div>
                                                                        </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })} 
                                                    </div>
                                                )}
                                                { commentsStatusArray[index] == false && (
                                                    <div>
                                                        <button onClick={()=> displayComments(index)} style={{color: "white", marginBottom: "20px"}} class="btn btn-danger" >Show Comments</button>
                                                    </div>
                                                    
                                                )}
                                            </div>
                                        </div>
                                   </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div style={{marginTop: "50px"}}> {/* Down Component */}
                <div class="b-example-divider"></div>
                    <div class="container px-4 py-5">
                        <h2 class="pb-2 border-bottom">Explore the world’s leading artwork portfolios platform</h2>
                        <div class="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
                            <div class="col d-flex flex-column align-items-center gap-2">
                                <h3 style={{marginLeft: "30px"}} class="fw-bold">Why you should use YMoovie right now ?</h3>
                                <p class="text-muted">Millions of artists around the world showcase their portfolio work on YMoovie - the home to the world’s best design and creative professionals.</p>
                            </div>

                            <div class="col">
                                <div class="row row-cols-1 row-cols-sm-2 g-4">
                                    <div class="col d-flex flex-column gap-2">
                                        <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                            <img src={share} style={{width: "50px"}} />
                                        </div>
                                        <h4 class="fw-semibold mb-0">Sharing</h4>
                                        <p class="text-muted">Share your work together with 1 million other users around the world</p>
                                    </div>

                                    <div class="col d-flex flex-column gap-2">
                                        <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                            <img src={portfolio} style={{width: "50px"}} />
                                        </div>
                                        <h4 class="fw-semibold mb-0">Portfolio</h4>
                                        <p class="text-muted">YMoovie is the world's largest creative network for showcasing and discovering creative work.</p>
                                    </div>

                                    <div class="col d-flex flex-column gap-2">
                                        <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                            <img src={trend} style={{width: "50px"}} />
                                        </div>
                                        <h4 class="fw-semibold mb-0">Trending</h4>
                                        <p class="text-muted">The pulse of what's trending on YMoovie. Check out the latest trailers, comedy clips, and everything else that people are watching right now.</p>
                                    </div>

                                    <div class="col d-flex flex-column gap-2" >
                                        <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                            <img src={rating} style={{width: "50px"}} />
                                        </div>
                                        <h4 class="fw-semibold mb-0">Rating System</h4>
                                        <p class="text-muted">Find out the opinion of other users about your work!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

