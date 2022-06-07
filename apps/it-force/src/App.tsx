import { Test } from '@madrus/ui'
import { FC } from 'react'
import Normalize from 'react-normalize'

import { Route, Routes, Link } from 'react-router-dom'

export const App: FC = () => {
  return (
    <>
      <Normalize />
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <h1>Welcome it-force</h1>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <>
              <Test name={'Big Boss'} />
              <div>
                <Link to="/">Click here to go back to root page.</Link>
              </div>
            </>
          }
        />
      </Routes>
      {/* END: routes */}
    </>
  )
}