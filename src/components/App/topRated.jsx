import React, { useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";
import { app } from "../../firebase";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import share from '../images/share.png';
import trend from '../images/trend.png';
import rating from '../images/rating.png';
import portfolio from '../images/portfolio.png';

export function TopRated() {
    const db = getFirestore(app);
    const navigate = useNavigate();

    const [aky, setAky] = useState(JSON.parse(window.localStorage.getItem('aky')));   /* aky */
    const [akyValue, setAkyValue] = useState(3);
    const updateFieldsAky = doc(db, "userData", aky['Email']);

    const [darkLady, setDarkLady] = useState(JSON.parse(window.localStorage.getItem('dl')));   /* darklady */
    const [darkLadyValue, setDarkLadyValue] = useState(3);
    const updateFieldsDarkLady = doc(db, "userData", darkLady['Email']);

    const [snowMan, setsnowMan] = useState(JSON.parse(window.localStorage.getItem('yellowsnow')));   /* snowMan */
    const [snowManValue, setSnowManValue] = useState(3);
    const updateFieldsSnowMan = doc(db, "userData", snowMan['Email']);
    
    async function updateRatingAky(newValue) {
        await updateDoc(updateFieldsAky, {
            "NumberOfVotes": aky['NumberOfVotes'] + 1,
            "SumOfVotes": aky['SumOfVotes'] + newValue,
            "Rating": aky['SumOfVotes'] / aky['NumberOfVotes']
        });
    }

    async function updateRatingDarkLady(newValue) {
        await updateDoc(updateFieldsDarkLady, {
            "NumberOfVotes": darkLady['NumberOfVotes'] + 1,
            "SumOfVotes": darkLady['SumOfVotes'] + newValue,
            "Rating": darkLady['SumOfVotes'] / darkLady['NumberOfVotes']
        });
    }

    async function updateRatingSnowMan(newValue) {
        await updateDoc(updateFieldsSnowMan, {
            "NumberOfVotes": snowMan['NumberOfVotes'] + 1,
            "SumOfVotes": snowMan['SumOfVotes'] + newValue,
            "Rating": snowMan['SumOfVotes'] / snowMan['NumberOfVotes']
        });
    }

    return(
        <div>
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Welcome to YMoovie top rated users</h1>
                        <p class="lead text-muted">Here you can see the artwork of out top 3 rated users on the platform</p>
                    </div>
                </div>
            </section>
            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div class="col">
                            <div class="card shadow-sm">
                                <video controls resizeMode='contain'>
                                    <source src="https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Faky%40gmail.com%2Fnfs-9da66b84-3c4f-4602-ab55-fab0eecdd626?alt=media&token=ec77099c-61df-4ae0-be15-835482b89a1f" type="video/mp4"/>
                                </video>
                                <div class="card-body">
                                    <p class="card-text">Creator: {aky['UserName']} </p>
                                    <p style={{marginTop: "-10px"}} class="card-text">Rating: {aky['Rating'].toFixed(2)}</p>
                                    <p style={{marginTop: "-10px"}} class="card-text">Rate this moovie</p>
                                    <Box style={{marginTop: "-10px"}} sx={{'& > legend': { mt: 3 }}}>
                                        <Rating
                                            name="simple-controlled"
                                            value={akyValue}
                                            onChange={(event, newValue) => {
                                            setAkyValue(newValue);
                                            updateRatingAky(newValue)
                                            alert("Vote Submitted");
                                            navigate('/home');
                                            }}
                                        />
                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow-sm">
                                <video controls resizeMode='contain'>
                                    <source src="https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Fdarklady%40gmail.com%2Fdragonflight-65f78732-8a9d-43a6-a1c7-9332aa72e4aa?alt=media&token=a653f9b3-9bc5-4004-8e3f-0bf56939c95f" type="video/mp4"/>
                                </video>
                                <div class="card-body">
                                    <p class="card-text">Creator: {darkLady['UserName']} </p>
                                    <p style={{marginTop: "-10px"}} class="card-text">Rating: {darkLady['Rating'].toFixed(2)}</p>
                                    <p style={{marginTop: "-10px"}} class="card-text">Rate this moovie</p>
                                    <Box style={{marginTop: "-10px"}} className="ratingSystemPos" sx={{'& > legend': { mt: 3 }}}>
                                        <Rating
                                            name="simple-controlled"
                                            value={darkLadyValue}
                                            onChange={(event, newValue) => {
                                            setDarkLadyValue(newValue);
                                            updateRatingDarkLady(newValue)
                                            alert("Vote Submitted");
                                            navigate('/home');
                                            }}
                                        />
                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow-sm">
                                <video controls resizeMode='contain'>
                                    <source src="https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Fsnowman%40gmail.com%2Fspider%20man-b5b1619c-7ff8-4241-b47e-a370d8413369?alt=media&token=eee1fd3f-a0a0-4343-8262-8afae7e3f7b2" type="video/mp4"/>
                                </video>
                                <div class="card-body">
                                    <p class="card-text">Creator: {snowMan['UserName']} </p>
                                    <p style={{marginTop: "-10px"}} class="card-text">Rating: {snowMan['Rating'].toFixed(2)}</p>
                                    <p style={{marginTop: "-10px"}} class="card-text">Rate this moovie</p>
                                    <Box style={{marginTop: "-10px"}} className="ratingSystemPos" sx={{'& > legend': { mt: 3 }}}>
                                        <Rating
                                            name="simple-controlled"
                                            value={snowManValue}
                                            onChange={(event, newValue) => {
                                            setSnowManValue(newValue);
                                            updateRatingSnowMan(newValue)
                                            alert("Vote Submitted");
                                            navigate('/home');
                                            }}
                                        />
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div> {/* Down Component */}
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