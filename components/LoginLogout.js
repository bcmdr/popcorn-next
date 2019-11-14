import React from "react";
import firebase from "firebase/app";

export default function LoginLogout(props) {
  const handleLogin = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  const handleLogout = () => {
    firebase.auth().signOut();
  }
  return props.user ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
}
