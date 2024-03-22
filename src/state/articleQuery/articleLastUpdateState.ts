import { atom } from 'recoil'

import { ArticleRange } from '@/types/ArticleRange'

export const articleLastUpdateState = atom<ArticleRange>({
  key: 'articleLastUpdateState',
  default: {
    start: '',
    end: '',
  },
})
