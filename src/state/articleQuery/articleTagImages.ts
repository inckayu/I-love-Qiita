import { atom } from 'recoil'

export const articleTagImagesState = atom<(string | null)[]>({
  key: 'articleTagImagesState',
  default: [],
})
