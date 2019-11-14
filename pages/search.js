import React, {useState, useEffect} from "react";
import { withRouter } from "next/router";
import tmdb from '../credentials/tmdb';
import fetch from "isomorphic-unfetch";
import Layout from '../components/Layout'

function Search({ router }) {
  const [results, setResults] = useState([])

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb.key}&query=${router.query.query}&page=1`)
    .then(r => r.json())
    .then(data => setResults(data.results))

  return (
    <Layout>
      <form action="" method="get">
        <input type="text" name="query" id="query" required/>
        <input type="submit" value="Search" />
      </form>
      <ul>
        {results && results.map((result, index) => (
          <li key={'result-'+index}>{result.title}</li>
        ))}
      </ul>
    </Layout>
  );
}

export default withRouter(Search);