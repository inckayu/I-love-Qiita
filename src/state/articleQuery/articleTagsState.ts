import { Tag } from '@/types/Tag'
import { atom } from 'recoil'

export const articleTagsState = atom<Tag[]>({
  key: 'articleTagsState',
  default: [],
})
