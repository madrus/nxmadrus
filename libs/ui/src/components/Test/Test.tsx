import { FC } from 'react'
import '../../shared/styles/main.css'

type TestProps = {
  name?: string
}

export const Test: FC<TestProps> = ({ name }) => (
  <h1 className={'text-3xl underline'}>{`Hello ${name}`}</h1>
)
