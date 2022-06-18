import { FC } from 'react'

type AppBarProps = {
  name?: string
}

const AppBar: FC<AppBarProps> = ({ name }) => (
  <h1 className={'text-3xl underline'}>{`Hello ${name}`}</h1>
)

export default AppBar
