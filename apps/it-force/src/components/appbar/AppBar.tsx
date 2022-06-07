import { FC } from 'react'

const AppBar: FC = () => {
  return (
    <div className="fixed z-10 h-12 md:h-14 w-full bg-primary border-b shadow-md">
      <nav
        role="navigation"
        className="h-14 max-w-4xl mx-auto px-3 md:px-8 lg:pt-1 top-0"
      >
        <div className="flex flex-row justify-between">
          <div className="mr-12 py-2">
            <a
              href={'/'}
              className={
                'text-2xl md:text-3xl text-link font-bold tracking-tighter leading-tight'
              }
            >
              {'IT Force'}
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AppBar
