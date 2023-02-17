import React, { useState, useEffect } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase.js';
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import avatar from "../images/avatar.jpg";
import "../../../node_modules/video-react/dist/video-react.css"
import share from '../images/share.png';
import trend from '../images/trend.png';
import rating from '../images/rating.png';
import portfolio from '../images/portfolio.png';
import { useNavigate } from 'react-router-dom';

export function UserProfile(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('userData')));
    const [moviesList, setMoviesList] = useState([]);
    const [value, setValue] = useState(3);
    const [userRating, setUserRating] = useState(user['Rating'])
    const storage = getStorage(app);
    const db = getFirestore(app);
    const moviesListRef = ref(storage, "Movies/" + user['Email']);
    const updateFields = doc(db, "userData", user['Email']);
    const [userEmail, setUserEmail] = useState(user['Email']);

    useEffect(() => {
        listAll(moviesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setMoviesList((prev) => [...prev, url])
                })
            })
        })
    }, [])

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

    async function updateField(newValue) {
        console.log(value);
        await updateDoc(updateFields, {
            "NumberOfVotes": user['NumberOfVotes'] + 1,
            "SumOfVotes": user['SumOfVotes'] + newValue,
            "Rating": user['SumOfVotes'] / user['NumberOfVotes']
          });
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
                        {moviesList.map((url) => {
                            return(
                                <div class="col">
                                    <div class="card shadow-sm">
                                        <video controls resizeMode='contain'>
                                            <source src={url} type="video/mp4"/>
                                        </video>
                                        <div class="card-body">
                                            <p style={{marginTop: "-10px"}} class="card-text">Rate this moovie</p>
                                            <Box style={{marginTop: "-10px"}} className="ratingSystemPos" sx={{'& > legend': { mt: 3 }}}>
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
                                <a href="/register" class="btn btn-outline-info me-2">Register Now</a>
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

