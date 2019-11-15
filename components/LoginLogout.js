import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import clientCredentials from "../credentials/client"

export default function LoginLogout(props) {
  const [user, setUser] = useState(props.user || null);

  const handleLogin = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  const handleLogout = () => {
    firebase.auth().signOut();
  }
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(clientCredentials);
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        return user
          .getIdToken()
          .then(token => {
            // eslint-disable-next-line no-undef
            return fetch("/api/login", {
              method: "POST",
              // eslint-disable-next-line no-undef
              headers: new Headers({ "Content-Type": "application/json" }),
              credentials: "same-origin",
              body: JSON.stringify({ token })
            });
          });
      } else {
        setUser(null);
        // eslint-disable-next-line no-undef
        fetch("/api/logout", {
          method: "POST",
          credentials: "same-origin"
        });
      }
    })
  });
  return user ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
}
