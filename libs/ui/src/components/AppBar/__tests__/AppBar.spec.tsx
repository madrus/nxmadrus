// @vitest-environment jsdom
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import AppBar from '../AppBar'

describe('AppBar', () => {
  it('should render successfully', () => {
    const { baseElement, getByText } = render(<AppBar name={'Tester'} />)
    expect(baseElement).toBeTruthy()
    expect(getByText(/tester/i)).toBeInTheDocument()
  })
})
