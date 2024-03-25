import { atom } from 'recoil'

export const articleBodyState = atom<string>({
  key: 'articleBodyState',
  default: '',
})
