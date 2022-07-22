import React, { FC, ReactNode } from 'react'
import cn from 'classnames'

type ContainerProps = {
  children: ReactNode
  className?: string
  [x: string]: unknown
}

const Container: FC<ContainerProps> = ({ className, children, ...rest }) => (
  <div
    {...rest}
    className={cn(className, 'w-full max-w-2xl mx-auto')}
    role={'presentation'}
  >
    {children}
  </div>
)

export default Container
