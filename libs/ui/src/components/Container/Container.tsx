import { FC, ReactNode } from 'react'

const Container: FC<{ children: ReactNode }> = ({ children, ...rest }) => (
  <div {...rest} role={'presentation'} aria-label={'presentational container'}>
    {children}
  </div>
)

export default Container
