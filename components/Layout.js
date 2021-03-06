import React from 'react'
import Link from "next/link";
import Head from "next/head";
import LoginLogout from "./LoginLogout"

import '../style.css'

export default function Layout({title, user, children}) {
  const links = {
    '/': 'Home',
    '/search': 'Search'
  }
  return (
    <div className="Layout">
      <Head>
        <title>PopCorn - {title}</title>
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
            <li key={'login'}><LoginLogout user={user} /></li>
          </ul>
        </nav>
        <section className="search">
          <form action="/search" method="get">
            <input type="text" name="query" id="query" required/>
            <input type="submit" value="Search" />
          </form>
        </section>
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