import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

async function fetchAll() {
  const keys = await AsyncStorage.getAllKeys();
  const res = [];
  for (const key of keys) {
    const t = await AsyncStorage.getItem(key);
    res.push(JSON.parse(t));
  }
  return res;
}

async function editData(key, content) {
  await AsyncStorage.mergeItem(key, JSON.stringify(content));
}

async function deleteDate(key) {
  await AsyncStorage.removeItem(key);
}

function useAsyncResult(callback, initial) {
  const [res, setRes] = useState(initial);
  useFocusEffect(
    useCallback(() => {
      callback().then(setRes);
      return () => {
      };
    }, [])
  );
  return res;
}

const storeData = async (key, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
    // console.log('SUCCESS: Stored', data, 'with \"' + key.toString() + '\" as key.')
  } catch (e) {
    // console.log('ERROR: Something goes wrong when storing data :(')
  }
};

export {
  fetchAll,
  editData,
  deleteDate,
  useAsyncResult,
  storeData
}
