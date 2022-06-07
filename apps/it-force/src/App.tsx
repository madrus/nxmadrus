import { Test } from '@madrus/ui'
import { FC } from 'react'

import { Route, Routes, Link } from 'react-router-dom'
import { Layout } from './components/layout'

export const App: FC = () => {
  return (
    <Layout>
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
    </Layout>
  )
}
