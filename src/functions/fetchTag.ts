import axios from 'axios'

import { Tag } from '@/types/Tag'

export const fetchTag = async (id: string): Promise<Tag> => {
  const config = {
    // APIのアクセストークンは記事一覧画面で設定するので記事詳細画面のURLに直接飛んだ場合もタグ情報を取得できるようにする
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get<Tag>(`https://qiita.com/api/v2/tags/${id}`, config)
  return res.data
}
