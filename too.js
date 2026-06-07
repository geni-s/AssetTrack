import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth,
 onAuthStateChanged
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

const db = getFirestore(app);



const auth = getAuth(app);
const all= document.getElementById("all");

all.addEventListener("click", () => {
    
         window.location.href = "request.html";
   


    
});
const ap= document.getElementById("ap");

ap.addEventListener("click", () => {
    
         window.location.href = "showuser.html";
   


    
});

const kll=document.getElementById("kll")
kll.addEventListener("click", () => {
    
         window.location.href = "filter.html";
   


    
});
const chpp=document.getElementById("chpp")
chpp.addEventListener("click", () => {
    
         window.location.href = "userside.html";
   


    
});


onAuthStateChanged(auth, async (user) => {

    if(!user){
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    console.log("Logged in as:", user.email);
let myRequests = 0;
let approved = 0;
let pending = 0;
let returnedAssets = 0;

const requestSnapshot =
await getDocs(collection(db,"requests"));

requestSnapshot.forEach((doc)=>{

    const data = doc.data();

    if(data.userId !== user.uid){
        return;
    }

    myRequests++;

    if(data.status === "Approved"){
        approved++;
    }

    if(data.status === "Pending"){
        pending++;
    }

    if(data.status === "Returned"){
        returnedAssets++;
    }

});
document.getElementById("myRequests")
.innerHTML =
`My Requests: ${myRequests}`;

document.getElementById("approved")
.innerHTML =
`Approved: ${approved}`;

document.getElementById("pending")
.innerHTML =
`Pending: ${pending}`;

document.getElementById("returned")
.innerHTML =
`Returned: ${returnedAssets}`;
new Chart(
    document.getElementById("pieChart"),
    {
        type:"pie",
        data:{
            labels:[
                "Approved",
                "Pending",
                "Returned"
            ],
            datasets:[
                {
                    data:[
                        approved,
                        pending,
                        returnedAssets
                    ]
                }
            ]
        }
    }
);
const myCategoryUsage = {};

requestSnapshot.forEach((doc)=>{

    const data = doc.data();

    if(data.userId !== user.uid){
        return;
    }

    myCategoryUsage[data.category] =
    (myCategoryUsage[data.category] || 0) + 1;

});
console.log(myCategoryUsage);

new Chart(
    document.getElementById("barChart"),
    {
        type: "bar",
        data: {
            labels: Object.keys(myCategoryUsage),
            datasets: [
                {
                    label: "My Requests By Category",
                    data: Object.values(myCategoryUsage)
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }
);

});



