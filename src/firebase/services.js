import { db } from ".";
import firebase from "firebase";

export default function addDatabase(collection, data) {
  const query = db.collection(collection);
  //add data
  query.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}
