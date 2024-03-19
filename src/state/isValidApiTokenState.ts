import { atom } from 'recoil'

export const isValidApiKeyTokenState = atom<boolean>({
  key: 'isValidApiKeyTokenState',
  default: false,
})
