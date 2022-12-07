import React, { useState, useEffect } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase.js';
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import avatar from "../images/avatar.jpg";
import "../../../node_modules/video-react/dist/video-react.css"
import { Player, BigPlayButton } from 'video-react';

export function UserProfile(props) {
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
            <div className='background'>
                <div style={{position: "absolute", width: "100%", height: "28%", backgroundColor: "rgba(0,0,0,0.7)", marginTop: "6.3%"}}>
                    <div className="userProfile" style={{ marginTop: "2%", display: "flex", width: "100%"}}>
                        <div style={{display: "flex"}}>
                            <img style={{ borderRadius: "50%", width: "200px", height: "200px", marginLeft: "312px", marginTop: "-1%"}} src={avatar}/>
                            <div style={{ textAlign: "left" }}>
                                <div style={{ color: "#ef5651", fontFamily: "DM Sans", fontWeight: "bold", fontSize: "38px", marginLeft: "13%", marginTop: "8%", whiteSpace: 'nowrap'}}>
                                    MY PROFILE
                                </div>
                                <div style={{ color: "#cfc9b3", fontFamily: "DM Sans", fontWeight: "bold", fontSize: "25px", marginLeft: "13%", marginTop: "4%", whiteSpace: 'nowrap'}}>
                                    {user['FirstName']} {user['LastName']} 
                                </div>
                                <div style={{ color: "#cfc9b3", fontFamily: "DM Sans", fontSize: "25px", marginLeft: "13%", marginTop: "-3%", whiteSpace: 'nowrap'}}>
                                    {user['Email']} 
                                </div>
                            </div>
                        </div> 
                        <div style={{ textAlign: "left", color: "#ef5651", fontFamily: "DM Sans", fontSize: "38px", marginLeft: "400px", marginTop: "1.4%", whiteSpace: 'nowrap' }}>
                            <div style={{ display: "flex" }}>
                                USERNAME:
                                <div style={{color: "#cfc9b3", marginLeft: "5%"}}> 
                                    {user['UserName']}
                                </div>
                            </div>
                            <div>
                                RATING: 
                                <Rating style={{marginLeft: "5%"}} name="read-only" value={user['Rating']} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="userProfile" style={{marginLeft: "-8.5%", marginTop: "15%"}}>
                        <div style={{ color: "#ef5651", fontFamily: "DM Sans", fontSize: "30px"}}>
                            RECENT MOVIES
                        </div>
                    </div>
                    <div className="userProfile" style={{marginTop: "18%", marginLeft: "14%", width: "80%"}}>
                    {moviesList.map((url) => {
                            return (
                            <div style={{display: "flex", marginTop: "2%"}}>
                                <Player fluid={false} width={"20%"} src={url}>
                                    <BigPlayButton position="center" />
                                </Player>
                                <div style={{width: "70%"}}>
                                    <div style={{ color: "#cfc9b3", fontFamily: "DM Sans", display: "flex", marginLeft: "5%", marginTop: "2%", borderBottom: "3px solid #cfc9b3", fontSize: "35px"}}>
                                        <div style={{marginRight: "19%", marginLeft: "4%", marginBottom: "2%"}}>
                                            Creator
                                        </div>
                                        <div style={{marginRight: "17%", whiteSpace: 'nowrap' }}>
                                            User Rating
                                        </div>
                                        <div style={{ whiteSpace: 'nowrap' }}>
                                            Rate This Movie
                                        </div>
                                    </div>
                                    <div style={{display: "flex", marginLeft: "15%" , marginBottom: "2%", fontSize: "30px"}}>
                                        <div style={{marginRight: "7.5%", marginLeft: "-4%", marginTop: "2%"}}>
                                            {user['UserName']}
                                        </div>
                                        <div style={{marginRight: "3.5%", marginLeft: "25%", marginTop: "2%"}}>
                                            {user['Rating'].toFixed(2)}
                                        </div>
                                        <div style={{marginLeft: "31%", marginTop: "2%"}}>
                                            <Box sx={{'& > legend': { mt: 3 }}}>
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={value}
                                                        onChange={(event, newValue) => {
                                                        setValue(newValue);
                                                        updateField();
                                                        alert("Vote Submitted");
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
            </div>
        </div>
        

    )
}

