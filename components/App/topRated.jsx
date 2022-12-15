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
            <div className='topRatedTitle'>
                TOP RATED USERS
            </div>
            <div style={{marginTop: "150px"}}>
                <div className='topRatedParent'>
                    <div className='topRatedChildren'>
                        <div className='topRatedItem1'>
                            <Player fluid={false} src={'https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Faky%40gmail.com%2Fnfs-9da66b84-3c4f-4602-ab55-fab0eecdd626?alt=media&token=ec77099c-61df-4ae0-be15-835482b89a1f'}>
                                <BigPlayButton position="center" />
                            </Player>
                        </div>
                        <table className='topRatedItem2'>
                            <tr className='table1Item2'>
                                <th className='table1Column'>CREATOR</th>
                                <th className='table1Column'>USER RATING</th>
                                <th style={{paddingRight: "40px"}}>RATE THIS MOVIE</th>
                            </tr>
                            <tr className='table2Item2'>
                                <th className='table2Column'>{aky['UserName']}</th>
                                <th className='table2Column'>{aky['Rating'].toFixed(2)}</th>
                                <th style={{padingRight: "40px"}}>
                                    <Box sx={{'& > legend': { mt: 3 }}}>
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
                                </th>
                            </tr>
                        </table>
                    </div>

                    <div className='topRatedChildren'>
                        <div className='topRatedItem1'>
                            <Player fluid={false} src={'https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Fdarklady%40gmail.com%2Fdragonflight-65f78732-8a9d-43a6-a1c7-9332aa72e4aa?alt=media&token=a653f9b3-9bc5-4004-8e3f-0bf56939c95f'}>
                                <BigPlayButton position="center" />
                            </Player>
                        </div>
                        <table className='topRatedItem2'>
                            <tr className='table1Item2'>
                                <th className='table1Column'>CREATOR</th>
                                <th className='table1Column'>USER RATING</th>
                                <th style={{paddingRight: "40px"}}>RATE THIS MOVIE</th>
                            </tr>
                            <tr className='table2Item2'>
                                <th className='table2Column'>{darkLady['UserName']}</th>
                                <th className='table2Column'>{darkLady['Rating'].toFixed(2)}</th>
                                <th style={{padingRight: "40px"}}>
                                <Box sx={{'& > legend': { mt: 3 }}}>
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
                                </th>
                            </tr>
                        </table>
                    </div>
                    <div className='topRatedChildren' style={{marginBottom: "100px"}}>
                        <div className='topRatedItem1'>
                            <Player fluid={false} src={'https://firebasestorage.googleapis.com/v0/b/ymoovie-a4a92.appspot.com/o/Movies%2Fsnowman%40gmail.com%2Fspider%20man-b5b1619c-7ff8-4241-b47e-a370d8413369?alt=media&token=eee1fd3f-a0a0-4343-8262-8afae7e3f7b2'}>
                                <BigPlayButton position="center" />
                            </Player>
                        </div>
                        <table className='topRatedItem2'>
                            <tr className='table1Item2'>
                                <th className='table1Column'>CREATOR</th>
                                <th className='table1Column'>USER RATING</th>
                                <th style={{paddingRight: "40px"}}>RATE THIS MOVIE</th>
                            </tr>
                            <tr className='table2Item2'>
                                <th className='table2Column'>{snowMan['UserName']}</th>
                                <th className='table2Column'>{snowMan['Rating'].toFixed(2)}</th>
                                <th style={{padingRight: "40px"}}>
                                <Box sx={{'& > legend': { mt: 3 }}}>
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
                                </th>
                            </tr>
                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}