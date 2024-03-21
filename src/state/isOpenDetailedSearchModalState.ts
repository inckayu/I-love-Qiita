import { atom } from 'recoil'

export const isOpenDetailedSearchModalState = atom<boolean>({
  key: 'isOpenDetailedSearchModalState',
  default: false,
})
