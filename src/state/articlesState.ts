import { atom } from 'recoil'

import { Article } from '@/types/Article'

export const articlesState = atom<Article[]>({
  key: 'articlesState',
  default: [],
})
