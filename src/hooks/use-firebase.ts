import { ref, onValue, off, update } from 'firebase/database';
import { useState, useEffect } from 'react';
import { dbFirebase } from '../libs/firebase';

export const useFirebase = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [responseInitial, setResponseInitial] = useState<any>(null);
  const [keyList, setKeyList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getFromDatabase = (refName: string) => {
    setLoading(true);
    setError(null);

    const starCountRef = ref(dbFirebase, refName);
    const rootRef = ref(dbFirebase, '/');

    const rootListener = onValue(
      rootRef,
      (snapshot) => {
        const keys: string[] = [];
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            keys.push(childSnapshot.key as string);
          });
        }
        setKeyList(keys);
      },
      (err) => {
        setError(`Error getting keys: ${err.message}`);
      }
    );

    const dataListener = onValue(
      starCountRef,
      (snapshot) => {
        
        if (snapshot.exists()) {
          console.log('xxxxxxxx', starCountRef, snapshot.val());
          
          setResponse(snapshot.val());
        } else {
          setResponse(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(`Error getting data: ${err.message}`);
        setLoading(false);
      }
    );

    return () => {
      off(rootRef, 'value', rootListener);
      off(starCountRef, 'value', dataListener);
    };
  };

  const getDataInitial = (refName: string) => {
    setLoading(true);
    setError(null);

    const starCountRef = ref(dbFirebase, refName);
    const rootRef = ref(dbFirebase, '/');

    const rootListener = onValue(
      rootRef,
      (snapshot) => {
        const keys: string[] = [];
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            keys.push(childSnapshot.key as string);
          });
        }
        setKeyList(keys);
      },
      (err) => {
        setError(`Error getting keys: ${err.message}`);
      }
    );

    const dataListener = onValue(
      starCountRef,
      (snapshot) => {
        
        if (snapshot.exists()) {
          setResponseInitial(snapshot.val());
        } else {
          setResponseInitial(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(`Error getting data: ${err.message}`);
        setLoading(false);
      }
    );

    return () => {
      off(rootRef, 'value', rootListener);
      off(starCountRef, 'value', dataListener);
    };
  };

  // Actualizar datos en Firebase
  const updateDatabase = (refName: string, data: any) => {
    setLoading(true);
    setError(null);

    const updateRef = ref(dbFirebase, refName);

    return update(updateRef, data) // Asegúrate de devolver la promesa
      .then(() => {
        setLoading(false);
        console.log('Data updated successfully');
      })
      .catch((err) => {
        setError(`Error updating data: ${err.message}`);
        setLoading(false);
      });
  };

  return {
    keyList,
    getFromDatabase,
    getDataInitial,
    updateDatabase,
    responseInitial,
    response,
    loading,
    error,
  };
};
