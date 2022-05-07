// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyrhVDxKEaV5upiYe6ErJ3WpVgSWVLqLg",
  authDomain: "coincollection-44595.firebaseapp.com",
  projectId: "coincollection-44595",
  storageBucket: "coincollection-44595.appspot.com",
  messagingSenderId: "572532360773",
  appId: "1:572532360773:web:27e273b2d7c811e066852c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

const storage = getStorage(app);

const storageRef = ref(storage);

const coinStorageRef = ref(storage, "coins");
export { database, storage, storageRef, coinStorageRef };
