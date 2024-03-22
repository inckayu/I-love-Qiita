import axios from 'axios'

import { Tag } from '@/types/Tag'

export const fetchTags = async (token: string): Promise<Tag[]> => {
  // TODO: 詳細検索機能の実装後、検索条件はオブジェクトとかにまとめて引数として渡すようにする

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get<Tag[]>(`https://qiita.com/api/v2/tags?sort=count&per_page=100`, config)
  return res.data
}
