import { atom } from 'recoil'

export const isValidApiKeyTokenState = atom<boolean>({
  key: 'isValidApiKeyTokenState',
  default:
    process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEFAULT_QIITA_TOKEN === 'true'
      ? true
      : false,
})
