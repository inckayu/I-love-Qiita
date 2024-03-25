import { fn } from '@storybook/test'

import LinkText from './LinkText'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'LinkText',
  component: LinkText,
  parameters: {
    layout: 'centered',
  },
  args: { onClick: fn() },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkText>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    text: 'link text',
    path: 'http://example.com',
    disabled: false,
    onClick: fn(),
  },
}
