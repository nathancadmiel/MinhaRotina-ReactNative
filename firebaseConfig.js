import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configurações reais do seu projeto Minharotina
const firebaseConfig = {
  apiKey: "AIzaSyD91NEIYyZLuxx66SlPaTQbzIpG8Bdevjg",
  authDomain: "minharotina-c834e.firebaseapp.com",
  projectId: "minharotina-c834e",
  storageBucket: "minharotina-c834e.firebasestorage.app",
  messagingSenderId: "260760626381",
  appId: "1:260760626381:web:5ffc18b5ca54914944b584",
  measurementId: "G-5NQE2XL950"
};

// Inicializa o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// Exporta a Autenticação (Auth) e o Banco de Dados (Firestore)
export const auth = getAuth(app);
export const db = getFirestore(app);