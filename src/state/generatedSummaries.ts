import { atom } from 'recoil'

export const generatedSummariesState = atom<string[]>({
  key: 'generatedSummariesState',
  default: [],
})
