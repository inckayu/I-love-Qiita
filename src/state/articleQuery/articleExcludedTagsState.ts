import { atom } from 'recoil'

import { Tag } from '@/types/Tag'

export const articleExcludedTagsState = atom<Tag[]>({
  key: 'articleExcludedTagsState',
  default: [],
})
