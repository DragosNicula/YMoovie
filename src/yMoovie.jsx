import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom' 
import { Register } from './components/User/register'
import { Login } from './components/User/login'
import { AddMovie } from './components/App/addMovie'
import { Contact } from './components/App/Contact'
import { TopRated } from './components/App/topRated'
import { Home } from './components/App/home'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from './firebase.js'
import { UserProfile } from './components/User/userProfile'
import { NavBar } from './components/App/navBar'
import './App.css';
import "@fontsource/montserrat";
import "@fontsource/dm-sans"
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function YMoovie() {
    const [statusLogin, setStatusLogin] = useState(null);
    const [statusEmail, setStatusEmail] = useState();
    const [userData, setUserData] = useState(null);
    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setStatusLogin(user);
              setStatusEmail(user.email);
            }
        });
    });

    async function getData() {
        const db = getFirestore(app);
        const docRef1 = doc(db, "userData", 'aky@gmail.com');
        const docRef2 = doc(db, "userData", 'darklady@gmail.com');
        const docRef3 = doc(db, "userData", 'yellowsnowman@gmail.com');
        const docSnap1 = await getDoc(docRef1);
        const docSnap2 = await getDoc(docRef2);
        const docSnap3 = await getDoc(docRef3);
        if (docSnap1.exists()) {
            window.localStorage.setItem('aky', JSON.stringify(docSnap1.data()));
            window.localStorage.setItem('dl', JSON.stringify(docSnap2.data()));
            window.localStorage.setItem('yellowsnow', JSON.stringify(docSnap3.data()));
        }
    }
    getData();


    return(
        <div>
            <NavBar statusLogin={statusLogin}/>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/AddMovie" element={<AddMovie statusLogin={statusLogin}/>} />
                    <Route path="/TopRated" element={<TopRated />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Register" element={<Register setStatusEmail={setStatusEmail} />} />
                    <Route path="/Login"  element={<Login setStatusEmail={setStatusEmail} />} />
                    <Route path="/MyProfile"  element={<UserProfile userData={userData}/>} />
                </Routes>
            </div>
        </div>
    )
}