import axios from 'axios'

import { Article } from '@/types/Article'

export const fetchArticle = async (id: string, token: string): Promise<Article> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get<Article>(`https://qiita.com/api/v2/items/${id}`, config)
  return res.data
}
