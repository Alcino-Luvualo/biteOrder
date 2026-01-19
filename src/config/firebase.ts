import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvE8MAecisHoItPfB2vzysixPwzGxqD_0",
    authDomain: "biteorder-2025.firebaseapp.com",
    projectId: "biteorder-2025",
    storageBucket: "biteorder-2025.firebasestorage.app",
    appId: "1:420465671784:web:eb3b23d0301f26109005dd",
    measurementId: "G-5N46J9CMS1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
