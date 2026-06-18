import {initializeApp}
from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import {
getFirestore,
doc,
setDoc,
getDoc,
updateDoc,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const config = {
    apiKey: "AIzaSyC0KC1CuUkzRSORNyPNA9hfLJl-dUsqz4o",
    authDomain: "wolf-7a867.firebaseapp.com",
    projectId: "wolf-7a867",
    storageBucket: "wolf-7a867.firebasestorage.app",
    messagingSenderId: "301835688244",
    appId: "1:301835688244:web:95a226a3b6d3e8d01bed61"
  };

const app=initializeApp(config);

export const db=getFirestore(app);

export {
doc,
setDoc,
getDoc,
updateDoc,
onSnapshot
};
