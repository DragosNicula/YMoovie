import React, { useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";
import { app } from "../../firebase";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';

export function TopRated() {
    const db = getFirestore(app);
    const navigate = useNavigate();
    const [aky, setAky] = useState(JSON.parse(window.localStorage.getItem('aky')));   /* aky */
    const [AkyValue, setAkyValue] = useState(3);
    const updateFieldsAky = doc(db, "userData", aky['Email']);

    const [darkLady, setdarkLady] = useState(JSON.parse(window.localStorage.getItem('dl')));   /* darklady */
    const [darkLadyValue, setDarkLadyValue] = useState(3);
    const updateFieldsDarkLady = doc(db, "userData", darkLady['Email']);

    const [yellowSnow, setYellowSnow] = useState(JSON.parse(window.localStorage.getItem('yellowsnow')));   /* yellowSnow */
    const [yellowSnowValue, setYellowSnowValue] = useState(3);
    const updateFieldsYellowSnow = doc(db, "userData", yellowSnow['Email']);
    
    async function updateRatingAky() {
        await updateDoc(updateFieldsAky, {
            "NumberOfVotes": aky['NumberOfVotes'] + 1,
            "Rating": (aky['Rating'] + AkyValue) / 1.7
        });
    }

    async function updateRatingDarkLady() {
        await updateDoc(updateFieldsDarkLady, {
            "NumberOfVotes": darkLady['NumberOfVotes'] + 1,
            "Rating": (darkLady['Rating'] + darkLadyValue) / 1.7
        });
    }

    async function updateRatingYellowSnow() {
        await updateDoc(updateFieldsYellowSnow, {
            "NumberOfVotes": yellowSnow['NumberOfVotes'] + 1,
            "Rating": (yellowSnow['Rating'] + yellowSnowValue) / 1.7
        });
    }

    return(
        <div className="background">
            <div style={{color: 'white', marginTop: "8%", marginLeft: "43%", position: "absolute"}} >
                <h1>Top Rated Users</h1>
            </div>
            <div className="topRated">
            <Player fluid={false} width={"500%"} src={"https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Faky%40gmail.com%2F123-854eca6a-872a-44d5-a902-88e179250766?alt=media&token=e49f914f-7a6a-4237-a829-1b537df2e62e"}>
                <BigPlayButton position="center" />
            </Player>
                <div style={{marginBottom: "5%", marginTop: "5%", marginLeft: "10%", marginRight: "4%"}}>
                    <div>
                        <h5>Creator</h5>
                    </div>
                    <div>
                        <h1>{aky['UserName']}</h1>
                    </div>
                </div>
                <div style={{marginTop: "5%", marginLeft: "15%"}}>
                    <div>
                        <h5>User Rating</h5>
                    </div>
                    <div>
                        <h5>{aky['Rating'].toFixed(2)}</h5>
                    </div>
                </div>
                <div style={{marginTop: "5%", marginLeft: "15%", marginRight: "5%"}}>
                    <div >
                        <h5>Rate this moovie</h5>
                    </div>
                    <div>
                        <Box sx={{'& > legend': { mt: 3 }}}>
                                <Rating
                                    name="simple-controlled"
                                    value={AkyValue}
                                    onChange={(event, newValue) => {
                                    setAkyValue(newValue);
                                    updateRatingAky();
                                    alert("Vote Submitted");
                                    navigate("/home");
                                    }}
                                />
                        </Box>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>                 
            <div className="topRated" style={{marginTop: "25%"}}>
            <Player fluid={false} width={"500%"} src={"https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Fdarklady%40gmail.com%2Fasdasda-13639cb2-33cf-4713-95d4-42efa1bc8fd3?alt=media&token=47278f48-448a-4338-9c27-6a7ca28ec1b5"}>
                <BigPlayButton position="center" />
            </Player>
                <div style={{marginBottom: "5%",marginTop: "5%", marginLeft: "8%"}}>
                    <div>
                        <h5>Creator</h5>
                    </div>
                    <div>
                        <h1>{darkLady['UserName']}</h1>
                    </div>
                </div>
                <div style={{marginTop: "5%", marginLeft: "15%"}}>
                    <div>
                        <h5>User Rating</h5>
                    </div>
                    <div>
                        <h5>{darkLady['Rating'].toFixed(2)}</h5>
                    </div>
                </div>
                <div style={{marginTop: "5%", marginLeft: "15%", marginRight: "5%"}}>
                    <div >
                        <h5>Rate this moovie</h5>
                    </div>
                    <div>
                        <Box sx={{'& > legend': { mt: 3 }}}>
                                <Rating
                                    name="simple-controlled"
                                    value={darkLadyValue}
                                    onChange={(event, newValue) => {
                                    setDarkLadyValue(newValue);
                                    updateRatingDarkLady();
                                    alert("Vote Submitted");
                                    navigate("/home");
                                    }}
                                />
                        </Box>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="topRated" style={{marginTop: "35%"}}>
            <Player fluid={false} width={"500%"} src={"https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2FYellowSnowMan%40gmail.com%2FAc%20Vallhalla-2667d9e3-678e-4375-81f2-2df3c0737b3c?alt=media&token=b5745be9-fe8a-45b1-8e76-c070395f93e5"}>
                <BigPlayButton position="center" />
            </Player>
                <div style={{marginBottom: "5%", marginTop: "5%", marginLeft: "5%", marginRight: "-5%"}}>
                    <div>
                        <h5>Moovie made by</h5>
                    </div>
                    <div>
                        <h1>{yellowSnow['UserName']}</h1>
                    </div>
                </div>
                <div style={{marginTop: "5%", marginLeft: "15%"}}>
                    <div>
                        <h5>User Rating</h5>
                    </div>
                    <div>
                        <h5>{yellowSnow['Rating'].toFixed(2)}</h5>
                    </div>
                </div>
                <div style={{marginTop: "5%", marginLeft: "15%", marginRight: "5%"}}>
                    <div >
                        <h5>Rate this moovie</h5>
                    </div>
                    <div>
                        <Box sx={{'& > legend': { mt: 3 }}}>
                                <Rating
                                    name="simple-controlled"
                                    value={yellowSnowValue}
                                    onChange={(event, newValue) => {
                                    setYellowSnowValue(newValue);
                                    updateRatingYellowSnow();
                                    alert("Vote Submitted");
                                    navigate("/home");
                                    }}
                                />
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}