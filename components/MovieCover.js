import React, { useState, useEffect } from 'react';
import "firebase/firestore";
import clientCredentials from "../credentials/client"

function MovieCover(props) {

  const [data, setData] = useState(props.data || {
    interested: false,
    seen: false,
    favourite: false
  });

  const handleInterested = () => {
    setData({
      interested: !data.interested,
      seen: data.seen,
      favourite: data.favourite
    })
  }

  const handleSeen = () => {
    setData({
      interested: data.interested,
      seen: !data.seen,
      favourite: data.favourite
    })
  }

  const handleFavourite = () => {
    setData({
      interested: data.interested,
      seen: data.seen,
      favourite: !data.favourite
    })
  }

  useEffect(() => {
    async function fetchData() {
      if (!props.user) return;
      if (!props.firebase.apps.length) {
        props.firebase.initializeApp(clientCredentials);
      }
      let movieRef = props.firebase.firestore().collection(`${props.user.uid}`).doc(`${props.result.id}`);
      movieRef.set({
        interested: data.interested,
        seen: data.seen,
        favourite: data.favourite
      });
    }
    fetchData();
  }, [data])


  return (
    <div className="cover">
      <h3 className="title">{props.result.title}</h3>
      {props.result.poster_path ? (
        <img src={`${props.config.images.secure_base_url}${props.config.images.poster_sizes[2]}/${props.result.poster_path}`}></img>
      ) : null}
      { props.user? (
        <div className="controls">
          <button data-val={data.interested} onClick={handleInterested}>Interested</button>
          <button data-val={data.seen} onClick={handleSeen}>Seen</button>
          <button data-val={data.favourite} onClick={handleFavourite}>Favourite</button>
        </div>
        ) : null
      }
    </div>
  )
}

export default MovieCover;