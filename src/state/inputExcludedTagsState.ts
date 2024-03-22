import { atom } from 'recoil'

import { Tag } from '@/types/Tag'

export const inputExcludedTagsState = atom<Tag[]>({
  key: 'inputExcludedTagsState',
  default: [],
})
