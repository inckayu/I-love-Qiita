import { fn } from '@storybook/test'

import TextBox from './TextBox'

import type { Meta, StoryObj } from '@storybook/react'
const meta = {
  title: 'TextBox',
  component: TextBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof TextBox>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    value: '',
    label: 'label',
    width: 240,
    placeholder: 'placeholder',
    required: true,
    errorText: 'errorText',
    onChange: fn(),
    isError: true,
  },
}
