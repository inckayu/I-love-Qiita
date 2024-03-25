import Footer from './Footer'

import type { Meta, StoryObj } from '@storybook/react'
/**
 * See [Figma](https://www.figma.com/file/PWNYfomzX4y31fwN8jpBqH/I-love-Qiita?type=design&node-id=4%3A4&mode=design&t=wiiXXUA0HmWS9jYN-1r).
 */
const meta = {
  title: 'Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {}
