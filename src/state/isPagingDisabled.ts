import { atom } from 'recoil'

export interface IsPagingDisabled {
  prev: boolean
  next: boolean
}

export const isPagingDisabledState = atom<IsPagingDisabled>({
  key: 'isPagingDisabledState',
  default: { prev: true, next: false },
})
