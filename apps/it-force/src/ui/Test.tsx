import { FC } from 'react'

type TestProps = {
  name?: string
}

export const Test: FC<TestProps> = ({ name }) => <h1>{`Hello ${name}`}</h1>
