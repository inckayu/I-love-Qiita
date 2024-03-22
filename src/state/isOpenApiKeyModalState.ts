import { atom } from 'recoil'

export const isOpenApiKeyModalState = atom<boolean>({
  key: 'isOpenApiKeyModalState',
  default: false,
})
