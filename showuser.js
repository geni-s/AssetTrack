import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
   deleteDoc,
  doc
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

const db = getFirestore(app);
const auth = getAuth(app);

const requestcontainer = document.getElementById("request");
let requests = [];
async function getrequest() {

    const querySnapshot = await getDocs(collection(db, "requests"));

requestcontainer.innerHTML = "";
requests = [];

    querySnapshot.forEach((doc) => {

        const data = doc.data();
        const user= auth.currentUser;
        if(user.uid !== data.userId){
        return;
    }
        requests.push(
          {id:doc.id,
           ... data});

requestcontainer.innerHTML += `
<div class="request" id="${doc.id}">

    <h2>Asset Name: ${data.assetName}</h2>

    <p>User Email: ${data.userEmail}</p>

    <p>User name: ${data.username}</p>

    <p>Category: ${data.category}</p>

    <p>Status: ${data.status}</p>



</div>
`;

    });
if(requestcontainer.innerHTML === ""){
    requestcontainer.innerHTML = `
        <h2>No requests submitted</h2>
    `;
}
}


getrequest();