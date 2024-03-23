import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Button } from './Button'

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Primary',
    disabled: false,
    onClick: fn(),
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    label: 'Secondary',
    disabled: false,
    onClick: fn(),
  },
}

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    label: 'Large',
    disabled: false,
    onClick: fn(),
  },
}

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    label: 'small',
    disabled: false,
    onClick: fn(),
  },
}
