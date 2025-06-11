import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBmFHlrd4eKYel4Pk9GAHWauc4UdqZGgU4",
  authDomain: "voice-productivity-app.firebaseapp.com",
  projectId: "voice-productivity-app",
  storageBucket: "voice-productivity-app.firebasestorage.app",
  messagingSenderId: "349790922344",
  appId: "1:349790922344:web:f7c7c41466651917bc7ddd"
};

const app = initializeApp(firebaseConfig);

export default app;