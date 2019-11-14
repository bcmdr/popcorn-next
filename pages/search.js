import React, { useState } from "react";
import { withRouter } from "next/router";
import tmdb from '../credentials/tmdb';
import fetch from "isomorphic-unfetch";
import Layout from '../components/Layout'

function Search({ router, config, results }) {
  // const [config, setConfig] = useState(null)
  // const [results, setResults] = useState(null)

  // useEffect(()=> {
  //   if (config == null ) {
  //     fetch(`https://api.themoviedb.org/3/configuration?api_key=251ba64a492fa521304db43e5fa3d2ad`)
  //       .then(r => r.json())
  //       .then(data=>setConfig(data))
  //   }
  //   if (results == null) {
  //      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb.key}&query=${router.query.query}&page=1`)
  //       .then(r => r.json())
  //       .then(data => {
  //         console.log(results)
  //         setResults(data.results)}
  //       )
  //   }
  // })

  return (
    <Layout>
      <form action="" method="get">
        <input type="text" name="query" id="query" required/>
        <input type="submit" value="Search" />
      </form>
      <section className="results">
        {config && results && results.map((result, index) => (
          <div key={"result-"+index} className="cover">
            <img src={`${config.images.secure_base_url}${config.images.poster_sizes[3]}/${result.poster_path}`}></img>
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

Search.getInitialProps = async ({ req }) => {
  const configResponse = await fetch(`https://api.themoviedb.org/3/configuration?api_key=251ba64a492fa521304db43e5fa3d2ad`)
  const config = await configResponse.json();
  const resultsResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb.key}&query=${'hello'}&page=1`);
  const results = await resultsResponse.json();
  return { config, results: results.results };
}

export default withRouter(Search);

// export default class Search extends Component {
//   static async getInitialProps(context) {
//     const configResponse = await fetch(`https://api.themoviedb.org/3/configuration?api_key=251ba64a492fa521304db43e5fa3d2ad`)
//     const config = await configResponse.json();
//     const resultsResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb.key}&query=${'hello'}&page=1`);
//     const results = await resultsResponse.json();
//     return { config, results };
//   }
//   constructor(props) {
//     super(props);
//     this.state = {
//       config: this.props.config,
//       results: this.props.results.results
//     };
//   }
//   // async componentDidMount() {
//   //   const configResponse = await fetch(`https://api.themoviedb.org/3/configuration?api_key=251ba64a492fa521304db43e5fa3d2ad`)
//   //   const config = await configResponse.json();
//   //   const resultsResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb.key}&query=${'hello'}&page=1`);
//   //   const results = await resultsResponse.json();
//   //   this.setState({results, config})
//   //   console.log(this.state)
//   // }
//   render() {
//     return (
//       <Layout>
//         <form action="" method="get">
//           <input type="text" name="query" id="query" required/>
//           <input type="submit" value="Search" />
//         </form>
//         <section className="results">
//           {this.config && this.results && this.results.results.map((result, index) => (
//             <div key={"result-"+index} className="cover">
//               <img src={`${this.config.images.secure_base_url}${config.images.poster_sizes[3]}/${result.poster_path}`}></img>
//               <div className="controls">
//                 <button>Interested</button>
//                 <button>Seen</button>
//                 <button>Favourite</button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </Layout>
//     )
//   }
// }