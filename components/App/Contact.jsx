import React from 'react';
import facebook from "../images/facebook.png";
import linkedin from "../images/linkedin.png";
import phone from "../images/phone.png";
import instagram from "../images/instagram.png";

export function Contact() {

    return(
        <div className="contact">
            <div className="contactTitle">
                Contact Us
            </div>
            <div>
                <div className='contactComponent1'>
                    <div>
                        <img className="contactImage" src={facebook}/>
                        <a style={{marginLeft: "10px"}}>Y-Moovie</a>
                    </div>
                    <div>
                        <img className="contactImage" src={instagram}/>
                        <a style={{marginLeft: "10px"}}>Y-Moovie</a>
                    </div>
                </div>
                <div className="contactComponent2">
                    <div style={{display: "flex"}}>
                        <img className="contactImage" src={linkedin}/>
                        <a style={{marginLeft: "10px"}}>Y-Moovie</a>
                    </div>
                    <div style={{display: "flex", marginRight: "15px"}}>
                        <img className="contactImage" src={phone}/>
                        <a style={{marginLeft: "10px"}}>+123456</a>
                    </div>
                </div>
            </div>
        </div>
    )
}