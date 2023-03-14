import React from 'react';
import facebook from "../images/facebook.png";
import linkedin from "../images/linkedin.png";
import phone from "../images/phone.png";
import instagram from "../images/instagram.png";
import share from '../images/share.png';
import trend from '../images/trend.png';
import rating from '../images/rating.png';
import portfolio from '../images/portfolio.png';

export function Contact() {

    return(
        <div>
            <div style={{marginTop: "-50px"}} class="b-example-divider"></div>
            <div class="container px-1 py-5">
                <div style={{marginTop: "50px"}} class="col">
                    <div class="row row-cols-2 row-cols-sm-2 g-4">
                        <div class="col d-flex flex-column gap-2">
                            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                <img src={instagram} style={{width: "100px"}} />
                                <h4 style={{marginLeft: "10px"}} class="fw-semibold mb-0">YMoovie</h4>
                            </div>
                        </div>
                        <div class="col d-flex flex-column gap-2">
                            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                <img src={linkedin} style={{width: "100px"}} />
                                <h4 style={{marginLeft: "10px"}} class="fw-semibold mb-0">YMoovie</h4>
                            </div>
                        </div>
                        <div class="col d-flex flex-column gap-2">
                            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                <img src={facebook} style={{width: "100px"}} />
                                <h4 style={{marginLeft: "10px"}} class="fw-semibold mb-0">YMoovie</h4>
                            </div>
                        </div>
                        <div class="col d-flex flex-column gap-2" >
                            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-white bg-gradient fs-4 rounded-3">
                                <img src={phone} style={{width: "100px"}} />
                                <h4 style={{marginLeft: "10px"}} class="fw-semibold mb-0">+123456</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div> {/* Down Component */}
            <div class="b-example-divider"></div>
                <div class="container px-4 py-5">
                    <h2 class="pb-2 border-bottom">Explore the world’s leading artwork portfolios platform</h2>
                    <div class="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
                        <div class="col d-flex flex-column align-items-center gap-2">
                            <h3 style={{marginLeft: "30px"}} class="fw-bold">Why you should use YMoovie right now ?</h3>
                            <p class="text-muted">Millions of artists around the world showcase their portfolio work on YMoovie - the home to the world’s best design and creative professionals.</p>
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