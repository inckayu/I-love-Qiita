import { atom } from 'recoil'

export const articleAuthorState = atom<string>({
  key: 'articleAuthorState',
  default: '',
})
