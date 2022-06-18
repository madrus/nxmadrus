import { FC } from 'react'

type TestProps = {
  name?: string
}

export const Test: FC<TestProps> = ({ name }) => (
  <h1 className={'text-3xl underline'}>{`Hello ${name}`}</h1>
)
