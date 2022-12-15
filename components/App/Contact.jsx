import React from 'react';
import facebook from "../images/facebook.png";
import linkedin from "../images/linkedin.png";
import phone from "../images/phone.png";
import instagram from "../images/instagram.png";

export function Contact() {

    return(
        <div className="contact">
            <div className="contactTitle">
                CONTACT US
            </div>
            <div style={{display: "block", marginTop: "15%"}}>
                <div style={{display: "flex"}}>
                    <div className='contactComponent'>
                        <img src={instagram} style={{height: "50px", width: "50px", marginRight: "8px"}} />
                        <h1>YMOOVIE</h1>
                    </div>
                    <div className='contactComponent' style={{marginLeft: "auto"}}>
                        <img src={facebook} style={{height: "50px", width: "50px", marginRight: "8px"}} />
                        <h1>YMOOVIE</h1>
                    </div>
                </div>
            </div>
            <div style={{display: "block", marginTop: "2%"}}>
                <div style={{display: "flex"}}>
                    <div className='contactComponent'>
                        <img src={phone} style={{height: "50px", width: "50px", marginRight: "8px"}} />
                        <h1>+40741198713</h1>
                    </div>
                    <div className='contactComponent' style={{marginLeft: "auto"}}>
                        <img src={linkedin} style={{height: "50px", width: "50px", marginRight: "8px"}} />
                        <h1>YMOOVIE</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}