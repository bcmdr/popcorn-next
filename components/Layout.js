import React from 'react'
import Link from "next/link";
import Head from "next/head";

export default function Layout({children}) {
  const links = {
    '/': 'Home',
    '/search': 'Search'
  }
  return (
    <div id="Layout">
      <Head>
        <title>Popcorn</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <header>
        <nav>
          <ul>
            {Object.keys(links).map((key) => (
              <li key={key}>
                <Link href={key}>
                  <a>{links[key]}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        Powered by <span style={{color: "#01d277"}}>The Movie DB</span>
      </footer>
    </div>
  )
}