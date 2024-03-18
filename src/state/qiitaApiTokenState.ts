import { atom } from 'recoil'

export const qiitaApiTokenState = atom<string>({
  key: 'qiitaApiTokenState',
  default:
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_QIITA_TOKEN
      : '',
})
