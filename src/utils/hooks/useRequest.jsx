import React, { useState } from "react";
import { db, auth } from "../../firebase/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export const useRequest = () => {
  const [roleStatus, setRoleStatus] = useState('onProcess');

  const handleRoleUpgrade = async () => {
    setRoleStatus('loading');
    try {
      const requestDoc = doc(db, 'upgradeRequests', auth.currentUser.uid);
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      const now = new Date();
      const date = now.toISOString().split('T')[0]; 
      const day = now.toLocaleString('en-US', { weekday: 'long' }); 
      const time = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); 

      await setDoc(requestDoc, {
        userId: auth.currentUser.uid,
        requestedRole: 'advance',
        status: 'pending',
        date: date,
        day: day,
        timeRequest: time
      });

      await updateDoc(userDoc, {
        status: 'pending'
      });

      setRoleStatus('onProcess');

    } catch (error) {
      console.error('Failed to request role upgrade', error);
      setRoleStatus('failed');
    }
  }

  return [roleStatus, handleRoleUpgrade];
};