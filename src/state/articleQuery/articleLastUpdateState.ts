import { ArticleRange } from '@/types/ArticleRange'
import { atom } from 'recoil'

export const articleLastUpdateState = atom<ArticleRange>({
  key: 'articleLastUpdateState',
  default: {
    start: '',
    end: '',
  },
})
