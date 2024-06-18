import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef } from "firebase/database";

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCmeJFDotmvfhMtcD-d6_m9kxeEW6fl0lg",
    authDomain: "smm-satcomm.firebaseapp.com",
    databaseURL: "https://smm-satcomm-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smm-satcomm",
    storageBucket: "smm-satcomm.appspot.com",
    messagingSenderId: "958446750270",
    appId: "1:958446750270:web:a25dbdc3f334c4a30f1f6f"
})

const db = getDatabase(firebaseApp)

export const modbus = dbRef(db, 'modbus/sensor')