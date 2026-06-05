import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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

const db = getFirestore(app);
const submit=document.getElementById("submit");
submit.addEventListener("click", async () => {

    const assetname = document.getElementById("text1").value;

    const quantity = document.getElementById("text2").value;
    const description = document.getElementById("text3").value;
    const location = document.getElementById("text4").value;
    const category = document.getElementById("category").value;
    if(assetname === "" || quantity === "" || description === "" || category === ""|| location === ""){
    alert("Fill all fields");
    return;
}
    try {

        await addDoc(collection(db, "assets"), {
            asset: assetname,
            quantity: quantity,
            description: description,
            location:location,
            category: category
        });

        alert("assets Added Successfully");

        document.getElementById("text1").value = "";
        document.getElementById("text2").value = "";
        document.getElementById("text3").value = "";
        document.getElementById("text4").value = "";
        document.getElementById("category").value = "";


    } catch (error) {
        console.log(error);
    }

});
