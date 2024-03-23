import { atom } from 'recoil'

import { ArticleRange } from '@/types/ArticleRange'

export const articlePublicationState = atom<ArticleRange>({
  key: 'articlePublicationState',
  default: {
    start: '',
    end: '',
  },
})
