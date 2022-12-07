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
    const [akyValue, setAkyValue] = useState(3);
    const updateFieldsAky = doc(db, "userData", aky['Email']);

    const [darkLady, setDarkLady] = useState(JSON.parse(window.localStorage.getItem('dl')));   /* darklady */
    const [darkLadyValue, setDarkLadyValue] = useState(3);
    const updateFieldsDarkLady = doc(db, "userData", darkLady['Email']);

    const [yellowSnow, setYellowSnow] = useState(JSON.parse(window.localStorage.getItem('yellowsnow')));   /* yellowSnow */
    const [yellowSnowValue, setYellowSnowValue] = useState(3);
    const updateFieldsYellowSnow = doc(db, "userData", yellowSnow['Email']);
    
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

    async function updateRatingYellowSnow(newValue) {
        await updateDoc(updateFieldsYellowSnow, {
            "NumberOfVotes": yellowSnow['NumberOfVotes'] + 1,
            "SumOfVotes": yellowSnow['SumOfVotes'] + newValue,
            "Rating": yellowSnow['SumOfVotes'] / yellowSnow['NumberOfVotes']
        });
    }

    return(
        <div className="background">
            <div style={{ fontFamily: "DM-Sans", fontWeight: "bold", fontSize: "35px", color: 'white', marginTop: "9%", marginLeft: "9.7%", position: "absolute"}} >
                TOP RATED USERS
            </div>
            <div className="topRated">
            <Player fluid={false} width={"20%"} src={"https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Faky%40gmail.com%2F123-854eca6a-872a-44d5-a902-88e179250766?alt=media&token=e49f914f-7a6a-4237-a829-1b537df2e62e"}>
                <BigPlayButton position="center" />
            </Player>
                <div style={{width: "80%"}}>
                    <div style={{ color: "#cfc9b3", fontFamily: "DM Sans", display: "flex", marginLeft: "10%", marginTop: "2%", borderBottom: "3px solid #cfc9b3", fontSize: "35px"}}>
                        <div style={{marginRight: "19%", marginLeft: "7%", marginBottom: "2%"}}>
                            Creator
                        </div>
                        <div style={{marginRight: "17%", whiteSpace: 'nowrap' }}>
                            User Rating
                        </div>
                        <div style={{ whiteSpace: 'nowrap' }}>
                            Rate This Movie
                        </div>
                    </div>
                    <div style={{display: "flex", marginLeft: "20%" , marginBottom: "2%", fontSize: "30px"}}>
                        <div style={{marginRight: "7.5%", marginLeft: "-1%", marginTop: "2%"}}>
                            {aky['UserName']}
                        </div>
                        <div style={{marginRight: "3.5%", marginLeft: "23%", marginTop: "2%"}}>
                            {aky['Rating'].toFixed(2)}
                        </div>
                        <div style={{marginLeft: "30%", marginTop: "2%"}}>
                            <Box sx={{'& > legend': { mt: 3 }}}>
                                    <Rating
                                        name="simple-controlled"
                                        value={akyValue}
                                        onChange={(event, newValue) => {
                                        window.localStorage.setItem('newValue', JSON.stringify(newValue));
                                        updateRatingAky(newValue);
                                        alert("Vote Submitted");
                                        navigate("/home");
                                        }}
                                    />
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br> 
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>                
            <div className="topRated">
            <Player fluid={false} width={"20%"} src={"https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Fdarklady%40gmail.com%2Fasdasda-13639cb2-33cf-4713-95d4-42efa1bc8fd3?alt=media&token=47278f48-448a-4338-9c27-6a7ca28ec1b5"}>
                <BigPlayButton position="center" />
            </Player>
                <div style={{width: "80%"}}>
                    <div style={{ color: "#cfc9b3", fontFamily: "DM Sans", display: "flex", marginLeft: "10%", marginTop: "2%", borderBottom: "3px solid #cfc9b3", fontSize: "35px"}}>
                        <div style={{marginRight: "19%", marginLeft: "7%", marginBottom: "2%"}}>
                            Creator
                        </div>
                        <div style={{marginRight: "17%", whiteSpace: 'nowrap' }}>
                            User Rating
                        </div>
                        <div style={{ whiteSpace: 'nowrap' }}>
                            Rate This Movie
                        </div>
                    </div>
                    <div style={{display: "flex", marginLeft: "20%" , marginBottom: "2%", fontSize: "30px"}}>
                        <div style={{marginRight: "3.5%", marginLeft: "-4.5%", marginTop: "2%"}}>
                            {darkLady['UserName']}
                        </div>
                        <div style={{marginRight: "3.6%", marginLeft: "23%", marginTop: "2%"}}>
                            {darkLady['Rating'].toFixed(2)}
                        </div>
                        <div style={{marginLeft: "30%", marginTop: "2%"}}>
                            <Box sx={{'& > legend': { mt: 3 }}}>
                                    <Rating
                                        name="simple-controlled"
                                        value={darkLadyValue}
                                        onChange={(event, newValue) => {
                                        updateRatingDarkLady(newValue);
                                        alert("Vote Submitted");
                                        navigate("/home");
                                        }}
                                    />
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="topRated">
            <Player fluid={false} width={"20%"} src={"https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Fyellowsnowman%40gmail.com%2Faaa-7b1d9a08-140e-4ba4-ac5d-2c13b9d233a5?alt=media&token=ab9f82ff-c0f6-4f6e-a7c2-827e705f9933"}>
                <BigPlayButton position="center" />
            </Player>
                <div style={{width: "80%"}}>
                    <div style={{ color: "#cfc9b3", fontFamily: "DM Sans", display: "flex", marginLeft: "10%", marginTop: "2%", borderBottom: "3px solid #cfc9b3", fontSize: "35px"}}>
                        <div style={{marginRight: "19%", marginLeft: "7%", marginBottom: "2%"}}>
                            Creator
                        </div>
                        <div style={{marginRight: "17%", whiteSpace: 'nowrap' }}>
                            User Rating
                        </div>
                        <div style={{ whiteSpace: 'nowrap' }}>
                            Rate This Movie
                        </div>
                    </div>
                    <div style={{display: "flex", marginLeft: "20%" , marginBottom: "2%", fontSize: "30px"}}>
                        <div style={{marginRight: "-1%", marginLeft: "-9%", marginTop: "2%"}}>
                            {yellowSnow['UserName']}
                        </div>
                        <div style={{marginRight: "3.6%", marginLeft: "23%", marginTop: "2%"}}>
                            {yellowSnow['Rating'].toFixed(2)}
                        </div>
                        <div style={{marginLeft: "30%", marginTop: "2%"}}>
                            <Box sx={{'& > legend': { mt: 3 }}}>
                                <Rating
                                        name="simple-controlled"
                                        value={yellowSnowValue}
                                        onChange={(event, newValue) => {
                                        updateRatingYellowSnow(newValue);
                                        alert("Vote Submitted");
                                        navigate("/home");
                                        }}
                                    />
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}