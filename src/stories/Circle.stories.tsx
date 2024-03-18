import type { Meta, StoryObj } from '@storybook/react'
import Circle from './Circle'

const meta = {
  title: 'Circle',
  component: Circle,
  tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
}

export default meta
type Story = StoryObj<typeof meta>

export const Red: Story = {
  args: {
    color: 'red',
    size: 'small',
  },
}

export const Blue: Story = {
  args: {
    color: 'blue',
    size: 'small',
  },
}

export const Green: Story = {
  args: {
    color: 'green',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    color: 'red',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    color: 'red',
  },
}
