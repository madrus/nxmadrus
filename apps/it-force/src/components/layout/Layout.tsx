/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, ReactNode } from 'react'
// import BottomBar from './BottomBar'
// import { Container } from './common'
// import Footer from './Footer'
import { AppBar } from '../appbar'

type LayoutProps = {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={'relative min-h-screen'}>
    <AppBar />
    {/* <main className={'absolute overflow-y-auto top-12 md:top-14 px-3 md:px-8'}> */}
    {/* <Container>
        <main className='px-3 md:px-4 py-2 mt-12 mb-8 lg:mb-52 overflow-auto'>
        */}
    {/* {children} */}
    {/* </main>
        </Container>
        <Footer />
        <BottomBar />
        */}
    {/* </main> */}
  </div>
)

export default Layout
