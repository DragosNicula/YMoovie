import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion} from "firebase/firestore";
import { app } from "../../firebase";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import share from '../images/share.png';
import trend from '../images/trend.png';
import rating from '../images/rating.png';
import portfolio from '../images/portfolio.png';
import userLogo from "../images/userLogo.jpg";

export function TopRated() {
    const db = getFirestore(app);
    const navigate = useNavigate();
    const [author, setAuthorName] = useState();
    const [comment, setComment] = useState();
    const [commentsList, setCommentsList] = useState([]);
    const [commentsStatusArray, setCommentsStatusArray] = useState([]);
    const [forceRender, setForceRender] = useState();

    useEffect(() => {
        for (let i = 0; i < 3; ++i) {
            setCommentsStatusArray((result) => [...result, false]);
        }
    }, [])

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

    async function sendCommentToDatabaseAky() {
        const path = doc(db, "userData", "aky@gmail.com", "movies", "Elden Ring");
        const newDoc = await updateDoc(path, {
            Comments: arrayUnion(comment),
            Author: arrayUnion(author)
        })
        setComment("");
    }

    function setCommentToTrueAky() {
        commentsStatusArray[0] = true;
    }

    function setCommentToFalseAky() {
        commentsStatusArray[0] = false;
        setForceRender({...forceRender});
    }

    async function getCommentsAky() {
        const path = doc(db, "userData", "aky@gmail.com", "movies", "Elden Ring");
        const docSnap = await getDoc(path);
        if (docSnap.exists()) {
            setCommentsList(docSnap.data());
        } else {
        console.log("No such document!");
        } 
    }

    function displayCommentsAky() {
        setAllCommentsToFalse();
        getCommentsAky();
        if (commentsStatusArray[0] == false) {
            setCommentToTrueAky();
        }
    }

    async function sendCommentToDatabaseDarkLady() {
        const path = doc(db, "userData", "darklady@gmail.com", "movies", "Spider Man 2");
        const newDoc = await updateDoc(path, {
            Comments: arrayUnion(comment),
            Author: arrayUnion(author)
        })
        setComment("");
    }

    async function updateRatingDarkLady(newValue) {
        await updateDoc(updateFieldsDarkLady, {
            "NumberOfVotes": darkLady['NumberOfVotes'] + 1,
            "SumOfVotes": darkLady['SumOfVotes'] + newValue,
            "Rating": darkLady['SumOfVotes'] / darkLady['NumberOfVotes']
        });
    }

    function setCommentToTrueDarkLady() {
        commentsStatusArray[1] = true;
    }

    function setCommentToFalseDarkLady() {
        commentsStatusArray[1] = false;
        setForceRender({...forceRender});
    }

    async function getCommentsDarkLady() {
        const path = doc(db, "userData", "darklady@gmail.com", "movies", "Spider Man 2");
        const docSnap = await getDoc(path);
        if (docSnap.exists()) {
            setCommentsList(docSnap.data());
        } else {
        console.log("No such document!");
        } 
    }

    function displayCommentsDarkLady() {
        setAllCommentsToFalse();
        getCommentsDarkLady();
        if (commentsStatusArray[1] == false) {
            setCommentToTrueDarkLady();
        }
    }

    async function updateRatingSnowMan(newValue) {
        await updateDoc(updateFieldsSnowMan, {
            "NumberOfVotes": snowMan['NumberOfVotes'] + 1,
            "SumOfVotes": snowMan['SumOfVotes'] + newValue,
            "Rating": snowMan['SumOfVotes'] / snowMan['NumberOfVotes']
        });
    }

    async function sendCommentToDatabaseSnowMan() {
        const path = doc(db, "userData", "snowman@gmail.com", "movies", "NFS Unbound");
        const newDoc = await updateDoc(path, {
            Comments: arrayUnion(comment),
            Author: arrayUnion(author)
        })
        setComment("");
    }

    function setCommentToTrueSnowMan() {
        commentsStatusArray[2] = true;
    }

    function setCommentToFalseSnowMan() {
        commentsStatusArray[2] = false;
        setForceRender({...forceRender});
    }

    async function getCommentsSnowMan() {
        const path = doc(db, "userData", "snowman@gmail.com", "movies", "NFS Unbound");
        const docSnap = await getDoc(path);
        if (docSnap.exists()) {
            setCommentsList(docSnap.data());
        } else {
        console.log("No such document!");
        } 
    }

    function displayCommentsSnowMan() {
        setAllCommentsToFalse();
        getCommentsSnowMan();
        if (commentsStatusArray[2] == false) {
            setCommentToTrueSnowMan();
        }
    }

    function setAllCommentsToFalse() {
        commentsStatusArray.map((item, i) => {
            commentsStatusArray[i] = false;
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

                        <div class="col"> {/* Aky */}
                            <div class="card shadow-sm">
                                <video controls resizeMode='contain'>
                                    <source src="https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Faky%40gmail.com%2FElden%20Ring?alt=media&token=d856e367-2a04-47e4-930e-2c2254825d46" type="video/mp4"/>
                                </video>
                                <div class="card-body" >
                                    <p style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}} class="card-text">Creator: {aky['UserName']} </p>
                                    <p style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}} class="card-text">Rating: {aky['Rating'].toFixed(2)}</p>
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}} >
                                        <p class="card-text">Rate this moovie: </p>
                                        <Box style={{marginLeft: "10px"}} sx={{'& > legend': { mt: 3 }}}>
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

                                <div style={{marginTop: "-5px", marginLeft: "25px", marginRight: "25px", marginBottom: "25px", border: "1px solid #d2b891", borderRadius: "20px"}}> {/* rate + submit comment */}
                                    <p style={{marginTop: "10px"}} class="card-text">Add a comment</p>
                                    <input onChange={(event) => setAuthorName(event.target.value)} style={{width: "90%", margin: "auto"}} type="text" placeholder="Enter your name..." className="form-control" id="floatingInput"></input>
                                    <br></br>
                                    <textarea onChange={(event) => setComment(event.target.value)} style={{width: "90%", margin: "auto"}} placeholder="Enter your comment..." class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    <br></br>
                                    <a onClick={() => sendCommentToDatabaseAky()} style={{color: "white", marginBottom: "20px"}} class="btn btn-info " role="button" aria-pressed="true">Submit Comment</a>
                                    <br></br>
                                </div>

                                <div> {/* display comments */}
                                    {commentsStatusArray[0]== true && (
                                        <div style= {{marginTop: "-5px", marginLeft: "25px", marginRight: "25px", marginBottom: "25px", border: "1px solid #d2b891", borderRadius: "20px"}}>
                                            <br></br>
                                            <button onClick={() => setCommentToFalseAky()} style={{color: "white", marginBottom: "20px"}} class="btn btn-danger" > Hide Comments </button>
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
                                    { commentsStatusArray[0] == false && (
                                        <div>
                                            <button onClick={()=> displayCommentsAky()} style={{color: "white", marginBottom: "20px"}} class="btn btn-danger" >Show Comments</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>



                        <div class="col"> {/* Dark Lady */}
                            <div class="card shadow-sm">
                                <video controls resizeMode='contain'>
                                    <source src="https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Fdarklady%40gmail.com%2FSpider%20Man%202?alt=media&token=05047ffd-591d-4a53-a21d-a9c64f801e85" type="video/mp4"/>
                                </video>
                                <div class="card-body">
                                    <p style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}} class="card-text">Creator: {darkLady['UserName']} </p>
                                    <p style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}} class="card-text">Rating: {darkLady['Rating'].toFixed(2)}</p>
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}} >
                                        <p class="card-text">Rate this moovie: </p>
                                        <Box style={{marginLeft: "10px"}} className="ratingSystemPos" sx={{'& > legend': { mt: 3 }}}>
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

                                    <div style={{marginTop: "-5px", marginLeft: "25px", marginRight: "25px", marginBottom: "25px", border: "1px solid #d2b891", borderRadius: "20px"}}> {/* rate + submit comment */}
                                        <p style={{marginTop: "10px"}} class="card-text">Add a comment</p>
                                        <input onChange={(event) => setAuthorName(event.target.value)} style={{width: "90%", margin: "auto"}} type="text" placeholder="Enter your name..." className="form-control" id="floatingInput"></input>
                                        <br></br>
                                        <textarea onChange={(event) => setComment(event.target.value)} style={{width: "90%", margin: "auto"}} placeholder="Enter your comment..." class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                        <br></br>
                                        <a onClick={() => sendCommentToDatabaseDarkLady()} style={{color: "white", marginBottom: "20px"}} class="btn btn-info " role="button" aria-pressed="true">Submit Comment</a>
                                        <br></br>
                                    </div>
                                    <div> {/* display comments */}
                                        {commentsStatusArray[1]== true && (
                                            <div style= {{marginTop: "-5px", marginLeft: "25px", marginRight: "25px", marginBottom: "25px", border: "1px solid #d2b891", borderRadius: "20px"}}>
                                                <br></br>
                                                <button onClick={() => setCommentToFalseDarkLady()} style={{color: "white", marginBottom: "20px"}} class="btn btn-danger" > Hide Comments </button>
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
                                        { commentsStatusArray[1] == false && (
                                            <div>
                                                <button onClick={()=> displayCommentsDarkLady()} style={{color: "white", marginBottom: "20px"}} class="btn btn-danger" >Show Comments</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col"> {/* Snow Man */}
                            <div class="card shadow-sm">
                                <video controls resizeMode='contain'>
                                    <source src="https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Fsnowman%40gmail.com%2FNFS%20Unbound?alt=media&token=b2fc139f-6336-4d56-a2fd-2ef1b5468d62" type="video/mp4"/>
                                </video>
                                <div class="card-body">
                                    <p style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}} class="card-text">Creator: {snowMan['UserName']} </p>
                                    <p style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}} class="card-text">Rating: {snowMan['Rating'].toFixed(2)}</p>
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}}>
                                        <p class="card-text">Rate this moovie: </p>
                                        <Box style={{marginLeft: "10px"}} className="ratingSystemPos" sx={{'& > legend': { mt: 3 }}}>
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
                                    <div style={{marginTop: "-5px", marginLeft: "25px", marginRight: "25px", marginBottom: "25px", border: "1px solid #d2b891", borderRadius: "20px"}}> {/* rate + submit comment */}
                                        <p style={{marginTop: "10px"}} class="card-text">Add a comment</p>
                                        <input onChange={(event) => setAuthorName(event.target.value)} style={{width: "90%", margin: "auto"}} type="text" placeholder="Enter your name..." className="form-control" id="floatingInput"></input>
                                        <br></br>
                                        <textarea onChange={(event) => setComment(event.target.value)} style={{width: "90%", margin: "auto"}} placeholder="Enter your comment..." class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                        <br></br>
                                        <a onClick={() => sendCommentToDatabaseSnowMan()} style={{color: "white", marginBottom: "20px"}} class="btn btn-info " role="button" aria-pressed="true">Submit Comment</a>
                                        <br></br>
                                    </div>
                                    <div> {/* display comments */}
                                        {commentsStatusArray[2]== true && (
                                            <div style= {{marginTop: "-5px", marginLeft: "25px", marginRight: "25px", marginBottom: "25px", border: "1px solid #d2b891", borderRadius: "20px"}}>
                                                <br></br>
                                                <button onClick={() => setCommentToFalseSnowMan()} style={{color: "white", marginBottom: "20px"}} class="btn btn-danger" > Hide Comments </button>
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
                                        {commentsStatusArray[2] == false && (
                                            <div>
                                                <button onClick={()=> displayCommentsSnowMan()} style={{color: "white", marginBottom: "20px"}} class="btn btn-danger" >Show Comments</button>
                                            </div>
                                        )}
                                    </div>
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