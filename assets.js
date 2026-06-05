import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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

const ass = document.getElementById("assets");
let assets = [];
async function getAss() {

    const querySnapshot = await getDocs(collection(db, "assets"));

    ass.innerHTML = "";
    assets = [];

    querySnapshot.forEach((doc) => {

        const data = doc.data();
        assets.push(
          {id:doc.id,
           ... data});

        ass.innerHTML += `
        
        <div class="assets id="${doc.id}">

            <h2>Asset Name: ${data.asset}</h2>

            <p>Description: ${data.description}</p>

            <p>Quantity: ${data.quantity}</p>
            <p>Location: ${data.location}</p>
             
             
        

            <p>Category: ${data.category}</p>
            <div id="kru">
            <button class="Delete" onclick="Delete('${doc.id}')">
              Delete
            </button>
            <button class="Edit" onclick="Edit('${doc.id}')">
              Edit
            </button>
           
            </div>


        </div>
        
        `;

    });
}

getAss();

window.Delete = async function(id) {

   try {

      await deleteDoc(doc(db, "assets", id));


      alert("Deleted successfully");
      getAss();

   } catch(error) {

      console.log(error);
      alert("Error deleting ");

   }

}

window.Edit = function(id) {

    localStorage.setItem("editId", id);
    window.location.href = "addassets.html";

}






