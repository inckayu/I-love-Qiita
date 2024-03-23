import { PublicationTimeline } from '@/types/PublicationTimeline'
import { atom } from 'recoil'

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
