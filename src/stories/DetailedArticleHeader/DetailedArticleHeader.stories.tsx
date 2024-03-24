import DetailedArticleHeader from './DetailedArticleHeader'
import { Article } from '../../types/Article'

import type { Meta, StoryObj } from '@storybook/react'
const meta = {
  title: 'DetailedArticleHeader',
  component: DetailedArticleHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DetailedArticleHeader>

export default meta

type Story = StoryObj<typeof meta>

const article: Article = {
  rendered_body: 'Example body',
  body: 'Example body',
  coediting: false,
  comments_count: 0,
  created_at: '2022-01-01T00:00:00Z',
  id: '1',
  likes_count: 0,
  private: false,
  reactions_count: 0,
  stocks_count: 0,
  title: 'This is the title of this article. This is the title of this article. ',
  updated_at: '2022-01-01T00:00:00Z',
  url: 'http://example.com',
  user: {
    description: 'Example description',
    facebook_id: 'example_facebook_id',
    followees_count: 0,
    followers_count: 0,
    github_login_name: 'example_github',
    id: '1',
    items_count: 0,
    linkedin_id: 'example_linkedin',
    location: 'Example location',
    name: 'Example name',
    organization: 'Example organization',
    permanent_id: 1,
    profile_image_url:
      'https://qiita-user-profile-images.imgix.net/https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F88263133%3Fv%3D4?ixlib=rb-4.0.0&auto=compress%2Cformat&lossless=0&w=128&s=0657cf11560c0950ebea97ece9787c20',
    team_only: false,
    twitter_screen_name: 'example_twitter',
    website_url: 'http://example.com',
  },
  slide: false,
}

export const Example: Story = {
  args: {
    article,
  },
}
