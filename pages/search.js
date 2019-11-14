import React, {useState, useEffect} from "react";
import { withRouter } from "next/router";
import tmdb from '../credentials/tmdb';
import fetch from "isomorphic-unfetch";

function Search({ router }) {
  const [results, setResults] = useState([])

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb.key}&query=${router.query.title}&page=1`)
    .then(r => r.json())
    .then(data => setResults(data.results))

  return (
    <div>
      <form>

      </form>
      <section className="results">
        {results.map(result => (<p>{result.title}</p>))}
      </section>
    </div>
  );
}

export default withRouter(Search);