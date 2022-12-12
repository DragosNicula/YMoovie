import React, { useState, useEffect } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase.js';
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import avatar from "../images/avatar.jpg";
import "../../../node_modules/video-react/dist/video-react.css"
import { Player, BigPlayButton } from 'video-react';
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

    useEffect(() => {
        listAll(moviesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setMoviesList((prev) => [...prev, url])
                })
            })
        })
    }, [])

    
    async function updateField() {
        console.log(value);
        await updateDoc(updateFields, {
            "NumberOfVotes": user['NumberOfVotes'] + 1,
            "Rating": (user['Rating'] + value) / 1.5
          });
    }

    return(
        <div>
            <div className='userProfileDetails'>
                <div className='userProfileCenterLeft'>
                    <img className='userProfileLogo' src={avatar}/>
                    <div className="userProfileMyProfile">
                        MY PROFILE
                    </div>
                    <div className="userProfileName">
                        {user['FirstName']}
                        <a> </a>
                        {user['LastName']}
                    </div>
                    <div className="userProfileEmail">
                        {user['Email']}
                    </div>
                </div>
                <div className='userProfileCenterRight'>
                    <div className='userProfileUsername'>
                        <div style={{color: "#ef5651", paddingRight: "10px"}}>
                            Username:
                        </div>
                        <div style={{color: "white"}}>
                            {user['UserName']}
                        </div>
                    </div>
                </div>
                <div className='userProfileCenterRight'>
                    <div className='userProfileRating'>
                        <div style={{color: "#ef5651", paddingRight: "10px"}}>
                            Rating:
                        </div>
                        <div style={{color: "white"}}>
                            <Rating name="read-only" value={user['Rating']} readOnly />
                        </div>
                    </div>
                </div>
            </div>


            <div className='movieComponent'>
            {moviesList.map((url) => {
                    return (
                    <div> 
                        <div className='movie'>
                            <Player fluid={false} src={url}>
                                <BigPlayButton position="center" />
                            </Player>
                        </div>
                        <div className='center'>
                            <div className="movieBorder">
                            </div>
                            <div className='movieText'>
                                <div className='movieTextCreator'>
                                    CREATOR
                                </div>
                                <div className='movieTextUserRating'>
                                    USER RATING
                                </div>
                                <div className='movieTextRateMovie'>
                                    RATE THIS MOVIE
                                </div>
                            </div>
                            <div className='movieTextWhite'>
                                <div className='movieTextUsername'>
                                    {user['UserName']}
                                </div>
                                <div className='movieTextRating'>
                                    {user['Rating'].toPrecision(3)}
                                </div>
                                <div className='movieRatingSystem'>
                                    <Box sx={{'& > legend': { mt: 3 }}}>
                                            <Rating
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                setValue(newValue);
                                                updateField();
                                                alert("Vote Submitted");
                                                navigate('/home');
                                                }}
                                            />
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

