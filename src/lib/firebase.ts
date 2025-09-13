import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-1309214019-eeae0',
  appId: '1:334253084473:web:d68987c983ecb10bc8e2e8',
  storageBucket: 'studio-1309214019-eeae0.firebasestorage.app',
  apiKey: 'AIzaSyDU1c0eXuROL6ybW1cd3L04cLpcvMWpxFo',
  authDomain: 'studio-1309214019-eeae0.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '334253084473',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
