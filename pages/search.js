import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import fetch from "isomorphic-unfetch";
import clientCredentials from "../credentials/client";
import tmdb from '../credentials/tmdb';
import MovieCover from '../components/MovieCover'
import Layout from '../components/Layout'
import '../style.css'

function Search({ config, results, user, data }) {

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(clientCredentials);
    }
  })

  return (
    <Layout title="Search" user={user}>
      <section className="results covers">
        {config && results && results.map((result, index) => {
          return (
            <MovieCover
              firebase={firebase}
              user={user}
              key={index}
              type={'result'}
              result={result}
              data={data[result.id]}
              config={config}
            />
          )
        })}
      </section>
    </Layout>
  );
}

Search.getInitialProps = async ({req, query}) => {

  if (!req) return {
    config: null, 
    results: null,
    user: null,
    db: null,
    data: null
  };

  try {
    const configResponse = await fetch(`https://api.themoviedb.org/3/configuration?api_key=251ba64a492fa521304db43e5fa3d2ad`)
    const config = await configResponse.json();
    
    const resultsResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb.key}&query=${query.query}&page=1`);
    const results = await resultsResponse.json();

    const user = req && req.session ? req.session.decodedToken : null;

    if (!firebase.apps.length) {
      firebase.initializeApp(clientCredentials);
    }
  
    const db = req && req.firebaseServer ? req.firebaseServer.firestore() : firebase.firestore();

    let data = {
      interested: false,
      seen: false,
      favourite: false,
    };

    const userRef = user && db.collection(`${user.uid}`);
    if (userRef) {
      const snap = await userRef.get();
      snap && snap.forEach(s => data[s.id] = s.data());
    }

    return { config, results: results.results, user, data};

  } catch (error) {
    console.error(error);
    return {};
  }
}

export default Search;