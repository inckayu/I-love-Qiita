import { atom } from 'recoil'

export const qiitaApiTokenState = atom<string>({
  key: 'qiitaApiTokenState',
  default: '',
})
