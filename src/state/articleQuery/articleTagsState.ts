import { atom } from 'recoil'

import { Tag } from '@/types/Tag'

export const articleTagsState = atom<Tag[]>({
  key: 'articleTagsState',
  default: [],
})
