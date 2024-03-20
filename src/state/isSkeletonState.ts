import { atom } from 'recoil'

export const isSkeletonState = atom<boolean>({
  key: 'isSkeletonState',
  default: false,
})
