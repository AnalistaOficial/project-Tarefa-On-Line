// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMoHYRN2ctzQfiNszAExCN8YCKQrPEk3Y",
    authDomain: "projeto-01-b56b3.firebaseapp.com",
    projectId: "projeto-01-b56b3",
    storageBucket: "projeto-01-b56b3.firebasestorage.app",
    messagingSenderId: "239702609691",
    appId: "1:239702609691:web:c4647f59fc561633320dbe",
    measurementId: "G-FF2VNY6Y8G"
  };
  
  // Initialize Firebase

  const dbConfig = initializeApp(firebaseConfig);
  
  const db = getFirestore(dbConfig);

  const auth = getAuth(dbConfig);

  export { db, auth };