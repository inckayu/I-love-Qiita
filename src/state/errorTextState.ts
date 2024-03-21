import { atom } from 'recoil'

export const errorTextState = atom<string>({
  key: 'errorTextState',
  default: '',
})
