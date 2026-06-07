import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
   deleteDoc,
 
  
  getDoc,
  
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

const requestcontainer = document.getElementById("request");
let requests = [];
async function getrequest() {

    const querySnapshot = await getDocs(collection(db, "requests"));

requestcontainer.innerHTML = "";
requests = [];

    querySnapshot.forEach((doc) => {

        const data = doc.data();
    if(data.status === "Rejected"||data.status === "Approved"||data.status === "Returned"){
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

    <div id="kru">

        <button onclick="Approve('${doc.id}')">
            Approve
        </button>

        <button onclick="Reject('${doc.id}')">
            Reject
        </button>

    </div>

</div>
`;

    });
    if(requests.length === 0){
    requestcontainer.innerHTML = `
        <h2>No Pending Requests</h2>
    `;
}
}

getrequest();

window.Reject = async function(id){

    try{

        await updateDoc(
            doc(db,"requests",id),
            {
                status:"Rejected"
            }
        );

        alert("Nhi dene wala saman");

        getrequest();

    }
    catch(error){

        console.log(error);

    }

}

window.Approve = async function(id){

    try{
        const requestRef = doc(db, "requests", id);
        const requestSnap = await getDoc(requestRef);
        const requestData = requestSnap.data();
        const assetRef = doc(db, "assets", requestData.assetId);
        const assetSnap = await getDoc(assetRef);
        const assetData = assetSnap.data();
        const due = new Date();

         due.setDate(due.getDate() + 7);

        const currentQuantity = assetData.quantity;
                await updateDoc(assetRef, {

            quantity: currentQuantity - 1

        });
        await updateDoc(
            doc(db,"requests",id),
            {
                status:"Approved",
                dueDate: due

            }

        );

        alert("Lala Kya yaad rkhega lele");

        getrequest();

    }
    catch(error){

        console.log(error);

    }

}
