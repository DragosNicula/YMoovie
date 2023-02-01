import React, { useState, useEffect} from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase.js';
import '../../App.css';
import video from '../images/video.mp4';
import { useNavigate } from 'react-router-dom';
import share from '../images/share.png';
import trend from '../images/trend.png';
import rating from '../images/rating.png';
import portfolio from '../images/portfolio.png';

export function Home() {
    const storage = getStorage(app);
    const navigate = useNavigate();

    function redirect() {
        navigate("/topRated")
    }
    
    return(
        <div>
            <div>
                <div style={{position: "relative", zIndex: 2}}>
                    <div className="centerComponent">
                        <div class="col-md-5 p-lg-5 mx-auto my-5">
                            <p style={{color: "white"}} className="text1" >Explore the world's leading artwork portfolios</p>
                            <p style={{color: "white"}} className="text3" >Millions of artists around the world showcase their portfolio work on YMoovie The home to the world's best design and creative professionals.</p>
                            <a class="btn btn-info me-2" style={{color: "white"}} href="/toprated">Let's watch some movies from top rating users</a>
                        </div>
                        <div class="product-device shadow-sm d-none d-md-block"></div>
                        <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                    </div>
                </div>
                <div className="videoTag"> {/* Center Component */}
                    <div id="video-viewport">
                        <video autoPlay muted loop>
                            <source src={video} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
            <div style={{marginTop: "50px"}}> {/* Down Component */}
                <div class="b-example-divider"></div>
                    <div class="container px-4 py-5">
                        <h2 class="pb-2 border-bottom">Explore the world’s leading artwork portfolios platform</h2>
                        <div class="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
                            <div class="col d-flex flex-column align-items-center gap-2">
                                <h3 style={{marginLeft: "30px"}} class="fw-bold">Why you should use YMoovie right now ?</h3>
                                <p class="text-muted">Millions of artists around the world showcase their portfolio work on YMoovie - the home to the world’s best design and creative professionals.</p>
                                <a href="/register" class="btn btn-outline-info me-2">Register Now</a>
                            </div>

                            <div class="col">
                                <div class="row row-cols-1 row-cols-sm-2 g-4">
                                    <div class="col d-flex flex-column gap-2">
                                        <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                            <img src={share} style={{width: "50px"}} />
                                        </div>
                                        <h4 class="fw-semibold mb-0">Sharing</h4>
                                        <p class="text-muted">Share your work together with 1 million other users around the world</p>
                                    </div>

                                    <div class="col d-flex flex-column gap-2">
                                        <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                            <img src={portfolio} style={{width: "50px"}} />
                                        </div>
                                        <h4 class="fw-semibold mb-0">Portfolio</h4>
                                        <p class="text-muted">YMoovie is the world's largest creative network for showcasing and discovering creative work.</p>
                                    </div>

                                    <div class="col d-flex flex-column gap-2">
                                        <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                            <img src={trend} style={{width: "50px"}} />
                                        </div>
                                        <h4 class="fw-semibold mb-0">Trending</h4>
                                        <p class="text-muted">The pulse of what's trending on YMoovie. Check out the latest trailers, comedy clips, and everything else that people are watching right now.</p>
                                    </div>

                                    <div class="col d-flex flex-column gap-2" >
                                        <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                            <img src={rating} style={{width: "50px"}} />
                                        </div>
                                        <h4 class="fw-semibold mb-0">Rating System</h4>
                                        <p class="text-muted">Find out the opinion of other users about your work!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}