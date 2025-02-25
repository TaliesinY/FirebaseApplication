import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhqGBEjRd_--WSA467vzwhOzN_7sSIEPY",
  authDomain: "fir-workshop-c5607.firebaseapp.com",
  databaseURL: "https://fir-workshop-c5607-default-rtdb.firebaseio.com",
  projectId: "fir-workshop-c5607",
  storageBucket: "fir-workshop-c5607.firebasestorage.app",
  messagingSenderId: "720286887522",
  appId: "1:720286887522:web:bfe3bef59828e7fc9aab3b",
  measurementId: "G-CF3D78SNVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const loggedInUserId = localStorage.getItem('loggedinUserId');
    if (loggedInUserId) {
      const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            document.getElementById('loggedUserFName').innerText = userData.firstName;
            document.getElementById('loggedUserEmail').innerText = userData.email;
            document.getElementById('loggedUserLName').innerText = userData.lastName;
          } else {
            console.log('No such document');
          }
        })
        .catch((error) => {
          console.error("Error getting document: ", error);
        });
    }
  } else {
    console.log('User is not signed in');
  }
});

const logoutButton=document.getElementById('logout');

logoutButton.addEventListener('click', (event) => {
    localStorage.removeItem('loggedinUserId');
    signOut(auth)
    .then(() => {
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.log('Error signing out');
    })
})
