import React, { useState, useEffect} from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase.js';
import '../../App.css';
import Button from 'react-bootstrap/Button';
import video from '../images/video.mp4';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logoMicNegru.png';
import linkedin from '../images/linkedin.png';
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';



export function Home() {
    const storage = getStorage(app);
    const navigate = useNavigate();

    function redirect() {
        navigate("/topRated")
    }
    
    return(
        <div>
            <div>
                <div className="videoTag" style={{zIndex:1}}>
                    <video autoPlay loop muted>
                        <source src={video} type='video/mp4' />
                    </video>
                </div>
                <div className="homeComponentCenter"  style={{zIndex:2}}>
                    <div className='homeComponentTextBold'>Explore the world’s leading</div>
                    <div className='homeComponentTextBold' style={{marginTop: "-30px"}}> artwork portfolios </div>
                    <div className='homeComponentTextNormal' style={{marginTop: "20px"}}>Millions of artists around the world showcase their portfolio work</div>
                    <div className='homeComponentTextNormal'>on YMoovie - the home to the world’s best design and creative professionals.</div>
                    <br></br>
                    <br></br>
                    <Button className="homeComponentButton" onClick={() => redirect()} style={{fontSize: "20px", backgroundColor: "#00cfff", borderColor: "#00cfff"}}>Let's watch some movies from top rating users</Button>
                </div>
            </div>
            <div className='homeBorder'>
            </div>
            <div className="homeComponentBottom">
                <img src={logo} className='homeLogo'/>
                <div>YMoovie is the world’s leading </div>
                <div>community for creatives to share, grow, and get hired. </div>
                <div className='homeContacts'>
                    <div style={{marginTop: "10px"}}>
                        <img src={facebook} className='homeContactsLogo'/>
                        YMoovie
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <img src={instagram} className='homeContactsLogo'/>
                        YMoovie
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <img src={linkedin} className='homeContactsLogo'/>
                        YMoovie
                    </div>
                </div>
            </div>
        </div>
        
    )
}