import React from "react";
import tmdb from '../credentials/tmdb';
import fetch from "isomorphic-unfetch";
import Layout from '../components/Layout'
import '../style.css'

function Search({ config, results }) {
  return (
    <Layout>
      <section className="results covers">
        {config && results && results.map((result, index) => (
          <div key={"result-"+index} className="cover">
            <h3 className="title">{result.title}</h3>
            {result.poster_path ? (
              <img src={`${config.images.secure_base_url}${config.images.poster_sizes[2]}/${result.poster_path}`}></img>
            ) : null}
            <div className="controls">
              <button>Interested</button>
              <button>Seen</button>
              <button>Favourite</button>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}

Search.getInitialProps = async ({query}) => {
  const configResponse = await fetch(`https://api.themoviedb.org/3/configuration?api_key=251ba64a492fa521304db43e5fa3d2ad`)
  const config = await configResponse.json();
  const resultsResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb.key}&query=${query.query}&page=1`);
  const results = await resultsResponse.json();
  return { config, results: results.results };
}

export default Search;