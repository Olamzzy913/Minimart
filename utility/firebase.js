import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE34yaIG4U3hYKarB00KlKdgSnWVvuEPs",
  authDomain: "minimart-4b869.firebaseapp.com",
  projectId: "minimart-4b869",
  storageBucket: "minimart-4b869.appspot.com",
  messagingSenderId: "229779240710",
  appId: "1:229779240710:web:8e988b5d97e285e3025087",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

let currentUserUid;

// Function to create a user and store additional data
export const createUserAndStoreData = async (
  email,
  password,

  basicData,
  additionalData
) => {
  try {
    // Step 1: Create the user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Step 2: Add additional data to Firestore
    const userDocRef = doc(db, "users", user.uid); // Use the user's UID as the document ID
    await setDoc(userDocRef, { ...basicData, ...additionalData });

    console.log("User and additional data stored successfully");
    return user;
  } catch (error) {
    console.error("Error during user creation or data storage:", error);
    throw error;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  const currentUser = await signInWithEmailAndPassword(auth, email, password);
  currentUserUid = currentUser.user.uid;
  return currentUser;
};
export const uid = () => {
  return currentUserUid;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
