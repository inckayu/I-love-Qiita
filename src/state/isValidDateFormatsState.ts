import { atom } from 'recoil'

import { PublicationTimeline } from '@/types/PublicationTimeline'

// 日付の初期値は空文字列なのでtrueにしておく
export const isValidDateFormatsState = atom<PublicationTimeline>({
  key: 'isValidDateFormatsState',
  default: {
    publication: {
      start: true,
      end: true,
    },
    lastUpdate: {
      start: true,
      end: true,
    },
  },
})
