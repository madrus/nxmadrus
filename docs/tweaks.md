# Tweaks

This is a log of some tweaks I undertake and test out. No guarantee they are working. Everything is an experiment.

## Normalize

Not sure it is necessary if using Tailwind CSS Preflight. But here is how:

### Installation

```bash
yarn add react-normalize
```

### Usage

```ts
import { FC } from 'react'
import Normalize from 'react-normalize'

const App: FC = ({ children }) => (
  <>
    <Normalize />
    {children}
  </>
)
```
