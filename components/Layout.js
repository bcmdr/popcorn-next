import React from 'react'
import Link from "next/link";
import Head from "next/head";

export default function Layout({children}) {
  return (
    <div id="Layout">
      <Head>
        <title>Popcorn</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <nav>
        <ul>
          <li>
            <Link href="/search">
              <a>Search</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}