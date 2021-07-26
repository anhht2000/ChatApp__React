import React, { useEffect, useState } from "react";
import { db } from "../firebase";

//custom hook to get data from filestore
function useFileStore(collection, condition) {
  const [document, setDocument] = useState([
    {
      photoURL:
        "https://secure.gravatar.com/avatar/338d5c74cb3d18ba58ad789c303f2f3d?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg",
    },
  ]);
  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");
    // condition = {
    //   fieldName : 'abc',
    //   operator: '==',
    //   compareValue: 'abc',
    // }
    if (condition) {
      if (!condition.compareValue) return; // vi cau dk where k thuc hien khi tham so 3 == null
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }
    //bat su kien thay doi real time cua dtb, nhan vao snapshot la du lieu cua fb vi vay phai chuyen sang obj cua js
    // su kien duoc thuc thi moi khi realtime db thay doi
    const unsubcribe = collectionRef.onSnapshot(function (snapshot) {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setDocument(data);
    });
    //clean
    return unsubcribe;
  }, [collection, condition]);
  return document;
}

export default useFileStore;
