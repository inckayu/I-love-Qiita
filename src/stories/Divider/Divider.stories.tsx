import Divider from './Divider'

import type { Meta, StoryObj } from '@storybook/react'
/**
 * With "%", Divider is not displayed in this Storybook.
 * */
const meta = {
  title: 'Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>

export default meta

type Story = StoryObj<typeof meta>

export const DetailedArticle: Story = {
  args: {
    widthUnit: 'px',
    width: 500,
    thick: 1,
    color: '#B3B3B3',
  },
}

export const GroupedDividers = {
  render: () => {
    return (
      <div>
        <Divider widthUnit="px" width={500} thick={1} color="#B3B3B3" />
        <div style={{ height: '50px' }} />
        <Divider widthUnit="px" width={700} thick={2} color="#6F23D0" />
        <div style={{ height: '50px' }} />
        <Divider widthUnit="px" width={1000} thick={5} color="#EC0000" />
      </div>
    )
  },
}
