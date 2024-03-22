import { atom } from 'recoil'

import { Tag } from '@/types/Tag'

export const inputTagsState = atom<Tag[]>({
  key: 'inputTagsState',
  default: [],
})
