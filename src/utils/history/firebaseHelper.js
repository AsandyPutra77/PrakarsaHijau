import { getAuth } from "firebase/auth";
import { collection, addDoc, query, orderBy, limit, getDocs, deleteDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const saveEmissionResult = async (userId, emissions) => {
  const resultRef = collection(db, "users", userId, "emissionHistory");
  await addDoc(resultRef, {
    emissions,
    timestamp: serverTimestamp(),
  });
};

const getEmissionHistory = async (userId) => {
  const historyRef = collection(db, "users", userId, "emissionHistory");
  const q = query(historyRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  
  const history = [];
  querySnapshot.forEach((doc) => {
    history.push(doc.data());
  });

  return history;
};

const clearEmissionHistory = async (userId) => {
  const auth = getAuth();
  if (!auth.currentUser) {
    throw new Error("User not authenticated.");
  }

  const historyRef = collection(db, "users", userId, "emissionHistory");
  const querySnapshot = await getDocs(query(historyRef));
  
  const deletionPromises = [];
  querySnapshot.forEach((doc) => {
    deletionPromises.push(deleteDoc(doc.ref));
  });

  await Promise.all(deletionPromises);
  return true;
};

const listenToEmissionHistory = (userId, callback) => {
  const historyRef = collection(db, "users", userId, "emissionHistory");
  const q = query(historyRef, orderBy("timestamp", "desc"));

  // Menggunakan onSnapshot untuk mendengarkan perubahan data realtime
  return onSnapshot(q, (querySnapshot) => {
    const history = [];
    querySnapshot.forEach((doc) => {
      history.push(doc.data());
    });
    callback(history);
  });
};

export { saveEmissionResult, getEmissionHistory, clearEmissionHistory, listenToEmissionHistory };
