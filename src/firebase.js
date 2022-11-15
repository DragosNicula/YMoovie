import { initializeApp } from 'firebase/app';
    

const firebaseConfig = {
    apiKey: "AIzaSyBn_HoOrrTWo1RHxc0OQBFDEkIiACP4OJg",
    authDomain: "y-moovie.firebaseapp.com",
    projectId: "y-moovie",
    storageBucket: "y-moovie.appspot.com",
    messagingSenderId: "58996453293",
    appId: "1:58996453293:web:23db60219f09228726fb24",
    measurementId: "G-5WBMHZRJ82"  
};

export const app = initializeApp(firebaseConfig);
