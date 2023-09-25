import { db } from '../firebase'

import { collection, doc, getDoc, setDoc, updateDoc  } from 'firebase/firestore'

export const addToData = async (coll, item, props) => {
	const citiesRef = collection(db, coll)

	await setDoc(doc(citiesRef, item), props)
}

export const getData = async (coll, item, callback) => {
	const docRef = doc(db, coll, item)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		callback(docSnap.data())
	} else {
		console.log(`Отсутствует документ - /${coll}/${item}`)
	}
}

export const updateData = async (coll, item, props) => {
  const washingtonRef = doc(db, coll, item);

  await updateDoc(washingtonRef, props);
}