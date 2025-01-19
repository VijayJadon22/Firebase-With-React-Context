import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref, get, child, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [name, setName] = useState("");

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => set(ref(database, key), data);

  // get(child(ref(database), "Grandfather")).then((snapshot) =>
  //   console.log(snapshot.val())
  // );

  useEffect(() => {
    onValue(ref(database, "Grandfather/Father/child"), (snapshot) => {
      setName(snapshot.val().Name);
    });
  }, []);

  return (
    <FirebaseContext.Provider
      value={{ signupUserWithEmailAndPassword, putData }}
    >
      <h3>Name is: {name}</h3>
      {props.children}
    </FirebaseContext.Provider>
  );
};
