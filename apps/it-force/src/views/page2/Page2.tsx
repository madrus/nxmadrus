import { AppBar } from '@madrus/ui'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../../components/layout'

const Page2: FC = () => (
  <Layout>
    <AppBar name={'Big Boss'} />
    <div>
      <Link to="/">Click here to go back to root page.</Link>
    </div>
  </Layout>
)

export default Page2
