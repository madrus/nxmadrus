import { FC } from 'react'
import { Routes as ReactRoutes, Route } from 'react-router-dom'
import { Home, Page2 } from '../../views'

const Routes: FC = () => {
  return (
    <ReactRoutes>
      <Route index element={<Home />} />
      <Route path="/page2" element={<Page2 />} />
    </ReactRoutes>
  )
}

export default Routes
