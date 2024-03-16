export interface Article {
  rendered_body: string
  body: string
  coediting: boolean
  comments_count: number
  created_at: string
  group?: null
  id: string
  likes_count: number
  private: boolean
  reactions_count: number
  stocks_count: number
  tags?: TagsEntity[] | null
  title: string
  updated_at: string
  url: string
  user: User
  page_views_count?: null
  team_membership?: null
  organization_url_name?: null
  slide: boolean
}
export interface TagsEntity {
  name: string
  versions?: null[] | null
}
export interface User {
  description?: null
  facebook_id?: null
  followees_count: number
  followers_count: number
  github_login_name?: null
  id: string
  items_count: number
  linkedin_id?: null
  location?: null
  name: string
  organization?: null
  permanent_id: number
  profile_image_url: string
  team_only: boolean
  twitter_screen_name?: null
  website_url?: null
}
