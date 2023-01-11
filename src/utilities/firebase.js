import { initializeApp } from "firebase/app";
import { useCallback, useEffect, useState } from "react";
import { getDatabase, onValue, ref, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQZqOv4h0oW2NPYvj6xLvnrzH5_CH-NgQ",
  authDomain: "clubbulletin-e6cf8.firebaseapp.com",
  databaseURL: "https://clubbulletin-e6cf8-default-rtdb.firebaseio.com",
  projectId: "clubbulletin-e6cf8",
  storageBucket: "clubbulletin-e6cf8.appspot.com",
  messagingSenderId: "128903378781",
  appId: "1:128903378781:web:f9945c665b876759689ab4",
};

const firebase = initializeApp(firebaseConfig);

const database = getDatabase(firebase);

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


