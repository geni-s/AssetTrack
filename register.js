import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



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
const db = getFirestore(app);



const register = document.getElementById("register");
register.addEventListener("click", async () => {
   const name=document.getElementById("name").value;
   const email=document.getElementById("email").value;
   const password=document.getElementById("password").value;
   if(name == ""|| email == "" || password == "")
   {
    alert("bhr de bhayiii plzz")
    return;
   }
   try {
        const userCredential =await createUserWithEmailAndPassword(auth,email,password);

        const user = userCredential.user;
           
    
            await addDoc(collection(db, "users"), {
               id: user.uid,
                name:name,


               email: email,
               role: "user"
            
               
           });
   
           alert("hoshiyar ho gya tu to kr liyaa tuneee");
   
           document.getElementById("name").value = "";
           document.getElementById("email").value = "";
           document.getElementById("password").value = "";
           window.location.href = "userlogin.html";
           
   } catch (error) {

    if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
    }

    else if (error.code === "auth/weak-password") {
        alert("Password must be at least 6 characters long.");
    }

    else if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered.");
    }

    else {
        alert("Something went wrong.");
    }

    console.log(error);
}

});


