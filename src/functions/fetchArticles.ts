import axios from 'axios'

import { Article } from '../types/Article'

export const fetchArticles = async (title: string, token: string): Promise<Article[]> => {
  // TODO: 詳細検索機能の実装後、検索条件はオブジェクトとかにまとめて引数として渡すようにする

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const query = `title:${title}`
  const res = await axios.get<Article[]>(
    `https://qiita.com/api/v2/items?per_page=5&query=${query}`,
    config
  )
  return res.data
}
