import axios from 'axios'

import { Tag } from '@/types/Tag'

export const fetchTag = async (id: string, token: string): Promise<Tag> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get<Tag>(`https://qiita.com/api/v2/tags/${id}`, config)
  return res.data
}
