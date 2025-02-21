import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBggildCh55h2X7AaQpEYzdnUR22MiinKg',
  authDomain: 'alibot-6d746.firebaseapp.com',
  projectId: 'alibot-6d746',
  databaseURL: "https://alibot-6d746-default-rtdb.firebaseio.com",
  storageBucket: "alibot-6d746.appspot.com",
  messagingSenderId: "116756243654",
  appId: "1:116756243654:web:502e98a2b2a0d601d2a3c7",
  measurementId: "G-6L7JRHLKBG"
}

const app = initializeApp(firebaseConfig);
const dbFirebase = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  dbFirebase,
  storage,
  auth,
  googleProvider
};