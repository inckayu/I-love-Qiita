import axios from 'axios'

import { Article } from '../types/Article'

export const fetchArticles = async (
  query: string,
  token: string,
  page: number
): Promise<Article[]> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get<Article[]>(
    `https://qiita.com/api/v2/items?page=${page}&per_page=10${query.length ? `&query=${query}` : ''}`,
    config
  )
  return res.data
}
