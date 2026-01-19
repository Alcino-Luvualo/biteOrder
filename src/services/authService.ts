import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "firebase/auth";
import { auth } from "../config/firebase";

export const loginWithEmail = (email: string, pass: string) =>
    signInWithEmailAndPassword(auth, email, pass);

export const registerWithEmail = (email: string, pass: string) =>
    createUserWithEmailAndPassword(auth, email, pass);

export const loginWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

export const logout = () => signOut(auth);
