import React, { useState, useEffect } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase.js';
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import avatar from "../images/avatar.png";
import cover from "../images/cover-test.jpg";
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
        await updateDoc(updateFields, {
            "NumberOfVotes": user['NumberOfVotes'] + 1,
            "Rating": (user['Rating'] + value) / 1.5
          });
    }

    return(
        <div>
            <div className='background'>
                <div className='userProfile'>
                    <img style={{border: "5px solid #00cfff", width: "470%", height: "200px"}} src={cover} />
                    
                </div>
                <div className="userProfile" style={{marginTop: "18%", marginLeft: "20%", display: "flex"}}>
                        <img style={{border: "5px solid #00cfff", borderRadius: "50%", width: "25%"}} src={avatar}/>
                        <div style={{ marginTop: "7%", marginLeft: "5%", textAlign: "left"}}>
                            <h4>Username: {user['UserName']}</h4>
                            <h4>Name: {user['FirstName']} {user['LastName']}</h4>
                            <h4>Email: {user['Email']}</h4>
                        </div>
                        <div style={{ marginTop: "8%", marginLeft: "20%" }}>
                            <h3>User Rating</h3>
                            <Rating name="read-only" value={user['Rating']} readOnly />
                        </div>
                </div>
                <div className="userProfile" style={{marginLeft: "22%", marginTop: "31%"}}>
                    <div style={{fontSize: "25px"}}>Recent Movies</div>
                </div>
                <div className="userProfile" style={{marginTop: "30%", marginLeft: "13%", width: "80%"}}>
                {moviesList.map((url) => {
                        return (
                        <div style={{display: "flex", marginTop: "5%", borderRadius: "10px", border: "solid #00cfff"}}>
                            <Player fluid={false} width={"500%"} src={url}>
                                <BigPlayButton position="center" />
                            </Player>
                            <div style={{marginLeft: "50%", marginRight: "5%", marginTop: "5%",marginBottom: "5%"}}>
                                <h4>Rate this movie </h4>
                                <Box style={{ marginLeft: "10px" }} sx={{'& > legend': { mt: 3 }}}>
                                    <Rating
                                        name="simple-controlled"
                                        value={value}
                                        onChange={(event, newValue) => {
                                        setValue(newValue);
                                        updateField();
                                        }}
                                    />
                                </Box>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
        

    )
}

