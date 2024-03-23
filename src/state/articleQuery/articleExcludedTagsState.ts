import { Tag } from '@/types/Tag'
import { atom } from 'recoil'

export const articleExcludedTagsState = atom<Tag[]>({
  key: 'articleExcludedTagsState',
  default: [],
})
