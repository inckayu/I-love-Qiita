import { atom } from 'recoil'

export const isVerifingState = atom<boolean>({
  key: 'isVerifingState',
  default: false,
})
