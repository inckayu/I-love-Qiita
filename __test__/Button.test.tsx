import React from 'react'
import { render } from '@testing-library/react'
import { Button } from '../src/stories/Button/Button'

describe('Sample', () => {
  it('Should be rendered', async () => {
    render(<Button label="Button" size="medium" variant="primary" />)
  })
})
