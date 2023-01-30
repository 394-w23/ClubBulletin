import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
import { useCallback, useEffect, useState } from "react";
import { getDatabase, onValue, ref, update } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// -- Production Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBQZqOv4h0oW2NPYvj6xLvnrzH5_CH-NgQ",
//   authDomain: "clubbulletin-e6cf8.firebaseapp.com",
//   databaseURL: "https://clubbulletin-e6cf8-default-rtdb.firebaseio.com",
//   projectId: "clubbulletin-e6cf8",
//   storageBucket: "clubbulletin-e6cf8.appspot.com",
//   messagingSenderId: "128903378781",
//   appId: "1:128903378781:web:f9945c665b876759689ab4",
// };

// -- Test Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMwPuqe10GRZZBNPBUpcj2v_vTB5L61fs",
  authDomain: "clubbulletintest.firebaseapp.com",
  databaseURL: "https://clubbulletintest-default-rtdb.firebaseio.com",
  projectId: "clubbulletintest",
  storageBucket: "clubbulletintest.appspot.com",
  messagingSenderId: "1064844111586",
  appId: "1:1064844111586:web:42ce9affef576c142038bb",
};

const firebaseApp = initializeApp(firebaseConfig);

const database = getDatabase(firebaseApp);
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebaseApp), new GoogleAuthProvider());
};
const firebaseSignOut = () => signOut(getAuth(firebaseApp));
export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState({});

  useEffect(() => onAuthStateChanged(getAuth(firebaseApp), setUser), []);

  return [user];
};

const storage = getStorage(firebaseApp);

// Initialize Firebase

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export default storage;
