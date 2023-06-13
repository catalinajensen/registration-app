// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAyMv_rgn5iPqloRtLSJowAqucxWuCRmZ0',
  authDomain: 'registration-app-e5753.firebaseapp.com',
  databaseURL: 'https://registration-app-e5753-default-rtdb.firebaseio.com',
  projectId: 'registration-app-e5753',
  storageBucket: 'registration-app-e5753.appspot.com',
  messagingSenderId: '821851506494',
  appId: '1:821851506494:web:2a1965d4e5f9743a67ce6f'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
