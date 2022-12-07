import React from 'react';
import facebook from "../images/facebook.png";
import linkedin from "../images/linkedin.png";
import phone from "../images/phone.png";
import instagram from "../images/instagram.png";

export function Contact() {

    return(
        <div className="background">
            <div className='contactTitle'>
                CONTACT US
            </div>
            <div className="contactPosition">
                <div className="contact">
                    <div className="contactTextLeft">
                        <div style={{ display: "flex" }}>
                            <img src={instagram} style={{height: "50px", width: "50px", marginRight: "10%"}} />
                            <h1>YMOOVIE</h1>
                        </div>
                        <br></br>
                        <div style={{ display: "flex" }}>
                            <img src={phone} style={{height: "50px", width: "50px", marginRight: "10%"}} />
                            <h1>+40741198713</h1>
                        </div>
                    </div>
                </div>
                <div className="contact">
                    <div className="contactTextRight">
                    <div style={{ display: "flex" }}>
                            <img src={facebook} style={{height: "50px", width: "50px", marginRight: "10%"}} />
                            <h1>YMOOVIE</h1>
                        </div>
                        <br></br>
                        <div style={{ display: "flex" }}>
                            <img src={linkedin} style={{height: "50px", width: "50px", marginRight: "10%"}} />
                            <h1>YMOOVIE</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}