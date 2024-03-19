import { atom } from 'recoil'

export const isErrorState = atom<boolean>({
  key: 'isErrorState',
  default: false,
})
