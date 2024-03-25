import React, { ReactElement } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../src/stories/Button/Button'

describe('Sample', () => {
  it('コンポーネントのレンダリングのテスト', async () => {
    render(<Button label="Button" />)
  })
})
