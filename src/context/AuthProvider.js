import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import addDatabase from "../firebase/services";

export const AuthContext = React.createContext();

function AuthProvider(props) {
  // state
  const [user, SetUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  //sign in
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const ggProvider = new firebase.auth.GoogleAuthProvider();
  //fb
  const handleFbLogin = async (e) => {
    e.preventDefault();
    console.log("fb");
    const data = await auth.signInWithPopup(fbProvider);
    console.log(data);
    const { additionalUserInfo, user } = data;
    const { isNewUser, profile, providerId } = additionalUserInfo;

    //kiem tra xem co phai nguoi dung moi khong, neu phai thi them du lieu vao database
    if (isNewUser) {
      const newData = {
        displayName: profile.name,
        email: profile.email,
        photoURL: profile.picture,
        uid: user.b.u,
        providerId: providerId,
      };
      addDatabase("users", newData);
    }
  };
  //gg
  const handleGgLogin = async (e) => {
    e.preventDefault();
    const data = await auth.signInWithPopup(ggProvider);
    console.log(data);
    const { additionalUserInfo, user } = data;
    const { isNewUser, profile, providerId } = additionalUserInfo;

    //kiem tra xem co phai nguoi dung moi khong, neu phai thi them du lieu vao database
    if (isNewUser) {
      const newData = {
        displayName: profile.name,
        email: profile.email,
        photoURL: profile.picture,
        uid: user.metadata.a,
        providerId: providerId,
      };
      addDatabase("users", newData);
    }
  };
  const handleSignOut = async () => {
    await firebase.auth().signOut();
    SetUser({});
  };
  useEffect(() => {
    const sign = auth.onAuthStateChanged(async (user) => {
      console.log(user);
      //sign in thanh cong
      if (user) {
        setIsLoading(true); //set du lieu
        SetUser({ ...user, uid: user.metadata.a });
        history.push("/chat");
        return;
      }
      //dang nhap that bai
      history.push("/login");
    });
    return () => {
      sign();
    };
  }, [history]);
  return (
    <AuthContext.Provider
      value={{ handleFbLogin, handleGgLogin, handleSignOut, isLoading, user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
