import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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
const user = auth.currentUser;


const ass = document.getElementById("assets");
let assets = [];
const assetFilter = localStorage.getItem("asset") || "";
const categoryFilter = localStorage.getItem("category") || "";
const availFilter = localStorage.getItem("avail") || "";
localStorage.removeItem("asset");
localStorage.removeItem("category");
localStorage.removeItem("avail");
async function getAss() {

    const querySnapshot = await getDocs(collection(db, "assets"));

    ass.innerHTML = "";
    assets = [];

    querySnapshot.forEach((doc) => {

        const data = doc.data();
   const matchesAsset =
    assetFilter === "" ||
    data.asset.toLowerCase().includes(assetFilter.toLowerCase());

   const matchesCategory =
    categoryFilter === "" ||
    data.category === categoryFilter;

   const matchesAvail =
    availFilter === "" ||
    data.avail === availFilter;

if (!(matchesAsset && matchesCategory && matchesAvail)) {
    return;
}
        assets.push(
          {id:doc.id,
           ... data});

        ass.innerHTML += `
        
       <div class="assets" id="${doc.id}">

            <h2>Asset Name: ${data.asset}</h2>

            <p>Description: ${data.description}</p>

            <p>Quantity: ${data.quantity}</p>
            <p>Location: ${data.location}</p>
            <p>Status: ${data.avail}</p>
             
             
        

            <p>Category: ${data.category}</p>
         
            <div id="kru">
            ${data.avail === "available" ? `
             <button class="Reque" onclick="Reque('${doc.id}')">
               Request
             </button>` : ""}</div>


        </div>
        
        `;

    });
}

getAss();


window.Reque = async function(id) {

   const user = auth.currentUser;

   if(!user){
      alert("Please login first");
      return;
   }

   try {

      const assetRef = doc(db, "assets", id);
      const assetSnap = await getDoc(assetRef);
      const assetData = assetSnap.data();
      const usersSnapshot = await getDocs(collection(db, "users"));

let username = "";

usersSnapshot.forEach((userDoc) => {
   const userData = userDoc.data();

   if(userData.email === user.email){
      username = userData.name;
   }
});

      await addDoc(
         collection(db, "requests"),
         {
            assetId: id,
            assetName: assetData.asset,
            category: assetData.category,
            userEmail: user.email,
            userId: user.uid,
            username: username,
            status: "Pending",
            requestDate: new Date()
         }
      );

      alert("Request Submitted");

   } catch(error) {

      console.log(error);
      alert("Error");

   }

}





