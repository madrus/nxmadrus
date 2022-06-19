import { FC } from 'react'
import { Link } from 'react-router-dom'
import { AppBar } from '../../components/AppBar'
import { Layout } from '../../components/Layout1'

const Page2: FC = () => (
  <Layout>
    <AppBar />
    <div>
      <Link to="/">Click here to go back to root page.</Link>
    </div>
  </Layout>
)

export default Page2
