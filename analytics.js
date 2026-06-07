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
const auth = getAuth(app);

let totalAssets = 0;
let availableInventory = 0;
let activeBookings = 0;
let overdueReturns = 0;

const categoryUsage = {};

async function loadAnalytics(){

    totalAssets = 0;
    availableInventory = 0;
    activeBookings = 0;
    overdueReturns = 0;

    for(const key in categoryUsage){
        delete categoryUsage[key];
    }

    const assetSnapshot =
    await getDocs(collection(db,"assets"));

    assetSnapshot.forEach((doc)=>{

        const data = doc.data();
        totalAssets++;
        
        if(data.avail === "available"){
        availableInventory += Number(data.quantity);}
        

    });

    const requestSnapshot =
    await getDocs(collection(db,"requests"));

    requestSnapshot.forEach((doc)=>{

        const data = doc.data();
        categoryUsage[data.category] =
        (categoryUsage[data.category] || 0) + 1;

        if(data.status === "Approved"){

            activeBookings++;


            if(
                data.dueDate &&
                data.dueDate.toDate() < new Date()
            ){
                overdueReturns++;
            }

        }

    });


    document.getElementById("totalAssets")
    .innerHTML =
    `Total Assets: ${totalAssets}`;

    document.getElementById("availableAssets")
    .innerHTML =
    `Available Inventory: ${availableInventory}`;

    document.getElementById("activeBookings")
    .innerHTML =
    `Active Bookings: ${activeBookings}`;

    document.getElementById("overdueReturns")
    .innerHTML =
    `⚠Overdue Returns: ${overdueReturns}`;


    createBarChart();

    createPieChart();
}

function createBarChart(){

    new Chart(
        document.getElementById("barChart"),
        {
            type:"bar",
            data:{
                labels:Object.keys(categoryUsage),
                datasets:[
                    {
                        label:"Requests By Category",
                        data:Object.values(categoryUsage)
                    }
                ]
            }
        }
    );

}
function createPieChart(){

    new Chart(
        document.getElementById("pieChart"),
        {
            type:"pie",
            data:{
                labels:[
                    "Available Inventory",
                    "Active Bookings",
                    "Overdue Returns"
                ],
                datasets:[
                    {
                        data:[
                            availableInventory,
                            activeBookings,
                            overdueReturns
                        ]
                    }
                ]
            }
        }
    );

}
loadAnalytics();