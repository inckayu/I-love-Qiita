import { atom } from 'recoil'

export const generatedAbstractsState = atom<string[]>({
  key: 'generatedAbstractsState',
  default: [],
})
