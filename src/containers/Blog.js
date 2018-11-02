
import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ pages }) => (
  <div>
    <h1>It's blog time.</h1>
    <br />
    All Posts:
    <ul>
      {pages.map(page => (
        <li key={page.slug}>
          <Link to={`/read/${page.slug}/`}>{page.title}</Link>
        </li>
      ))}
    </ul>
  </div>
))
