import { Article } from '@/types/Article'
import { atom } from 'recoil'

export const articlesState = atom<Article[]>({
  key: 'articlesState',
  default: [],
})
