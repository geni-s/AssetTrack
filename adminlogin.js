import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyAxMmwGBxQlP6nq99uzuio-BlCBccsM4Zs",
    authDomain: "al0000.firebaseapp.com",
    databaseURL: "https://al0000-default-rtdb.firebaseio.com",
    projectId: "al0000",
    storageBucket: "al0000.firebasestorage.app",
    messagingSenderId: "191861001021",
    appId: "1:191861001021:web:d84b5b8afe5cda67acd354"
  };

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);






const login = document.getElementById("login");
login.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{

        const userCredential =
        await signInWithEmailAndPassword(auth,email,password);

        const user = userCredential.user;

        if(user.uid !== "haeUHOYxkKNcTSuGuAkGdR7v4ST2"){
            alert("Wrong Email or Password");
            return;
        }

        window.location.href = "index.html";

    }
    catch(error){

        alert("Wrong Email or Password");

    }

});





