import { FC, ReactNode } from 'react'
import cn from 'classnames'

type ContainerProps = {
  children: ReactNode
  className?: string
  [x: string]: unknown
}

const Container: FC<ContainerProps> = ({ className, children, ...rest }) => (
  <div
    {...rest}
    className={cn('w-full max-w-5xl mx-auto', className)}
    role={'presentation'}
  >
    {children}
  </div>
)

export default Container
