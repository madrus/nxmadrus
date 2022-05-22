import { render } from '@testing-library/react'

import { Test } from './Test'

describe('Test', () => {
  it('should render successfully', () => {
    const { baseElement, getByText } = render(<Test name={'Tester'} />)
    expect(baseElement).toBeTruthy()
    expect(getByText(/tester/i)).toBeInTheDocument()
  })
})
