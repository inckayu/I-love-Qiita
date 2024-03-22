import { atom } from 'recoil'

export const articleTitleState = atom<string>({
  key: 'articleTitleState',
  default: '',
})
