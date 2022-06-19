import { FC } from 'react'
import { Link } from 'react-router-dom'

const AppBar: FC = () => {
  const navStyle = 'px-3 md:px-8 lg:pt-1 z-50'
  const flexNav = 'flex items-center h-12 md:h-14'
  const flexBar = 'flex flex-col'
  const fixedStyle = 'fixed w-full bg-primary border-b shadow-md'

  return (
    <nav
      role="navigation"
      className={
        'fixed flex w-full justify-between items-center h-24 px-3 bg-primary border-b shadow-md z-50'
      }
    >
      <div>
        <Link
          to="/"
          className={
            'text-2xl md:text-3xl text-link font-bold tracking-tighter leading-tight'
          }
        >
          <div>{'IT Force'}</div>
        </Link>
      </div>
      <ul className="flex gap-4 text-link">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/page2">Page 2</Link>
        </li>
      </ul>
    </nav>
  )
}

export default AppBar
