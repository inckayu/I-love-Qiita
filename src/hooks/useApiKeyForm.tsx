import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { Article } from '@/types/Article'

import { errorTextState } from '@/state/errorTextState'
import { isErrorState } from '@/state/isErrorState'
import { isOpenApiKeyModalState } from '@/state/isOpenApiKeyModalState'
import { isValidApiKeyTokenState } from '@/state/isValidApiTokenState'
import { isVerifingState } from '@/state/isVerifingState'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'

const useApiKeyForm = () => {
  const [qiitaApiToken, setQiitaApiToken] = useRecoilState(qiitaApiTokenState)
  const [, setIsOpenApiKeyModal] = useRecoilState(isOpenApiKeyModalState)
  const [, setIsValidApiKeyToken] = useRecoilState(isValidApiKeyTokenState)
  const [, setIsError] = useRecoilState(isErrorState)
  const [, setErrorText] = useRecoilState(errorTextState)
  const [, setIsVerifing] = useRecoilState(isVerifingState)

  const checkValidApiKey = useCallback(
    async (apiKey: string): Promise<boolean> => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }

      try {
        await axios.get<Article[]>(`https://qiita.com/api/v2/items?per_page=1`, config)
      } catch {
        setIsError(true)
        setErrorText('Authentication failed. Please check the key validity')
        setIsVerifing(false)
        return false
      }
      return true
    },
    [setIsError, setErrorText, setIsVerifing]
  )

  const checkApiKey = useCallback(
    (apiKey: string) => {
      if (apiKey === '') return // apiKeyが空文字列の場合はエラーテキストではなくボタンをdisabledにしてユーザに示す
      if (apiKey.match(/^\w+$/) === null) {
        setIsError(true)
        setErrorText('Invalid format. Please input again')
        setIsVerifing(false)
        return
      }
      setIsError(false)
      setErrorText('')
    },
    [setIsError, setErrorText, setIsVerifing]
  )

  const handleInputAPIKey = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQiitaApiToken(e.target.value)
      checkApiKey(e.target.value)
    },
    [setQiitaApiToken, checkApiKey]
  )

  const handleClick = useCallback(async () => {
    setIsVerifing(true)
    if (await checkValidApiKey(qiitaApiToken)) {
      setQiitaApiToken(qiitaApiToken)
      setIsOpenApiKeyModal(false)
      setIsValidApiKeyToken(true)
      setIsVerifing(false)
      Cookies.set('qiitaToken', qiitaApiToken, { expires: 30 })
    }
  }, [
    qiitaApiToken,
    checkValidApiKey,
    setIsVerifing,
    setQiitaApiToken,
    setIsOpenApiKeyModal,
    setIsValidApiKeyToken,
  ])

  return {
    handleInputAPIKey,
    handleClick,
  }
}

export default useApiKeyForm
