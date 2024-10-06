// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	initializeAuth,
	getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyByHscWeQ2VjwwRg836aHbOVMeq2pXRZ9k",
	authDomain: "binbuddy-e93a6.firebaseapp.com",
	projectId: "binbuddy-e93a6",
	storageBucket: "binbuddy-e93a6.appspot.com",
	messagingSenderId: "756432160613",
	appId: "1:756432160613:web:3cadac441d6351ad01438c",
	measurementId: "G-4293Y3LN2L",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// Initialize Firebase Auth with persistence
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
	persistence: getReactNativePersistence(AsyncStorage),
});

export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = AsyncStorage;
