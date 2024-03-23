import { ArticleRange } from '@/types/ArticleRange'
import { atom } from 'recoil'

export const articlePublicationState = atom<ArticleRange>({
  key: 'articlePublicationState',
  default: {
    start: '',
    end: '',
  },
})
