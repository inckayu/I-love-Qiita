import React, { useState } from 'react'
import { Button } from './Button'
import { TextField } from '@mui/material'
import styles from '../styles/modules/apikeyform.module.scss'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import { useRecoilState } from 'recoil'
import TextBox from './TextBox'
import { Article } from '@/types/Article'
import axios from 'axios'
import { isOpenApiKeyModalState } from '@/state/isOpenModalState'

const ApiKeyForm = () => {
  const [qiitaApiToken, setQiitaApiToken] = useRecoilState(qiitaApiTokenState)
  const [isOpenApiKeyModal, setIsOpenApiKeyModal] = useRecoilState(
    isOpenApiKeyModalState
  )
  const [isError, setIsError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const checkValidApiKey = async (apiKey: string): Promise<boolean> => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    }

    try {
      console.log(config)
      await axios.get<Article[]>(
        `https://qiita.com/api/v2/items?per_page=1`,
        config
      )
    } catch {
      setIsError(true)
      setErrorText('Invalid API key') // FIXME: 正規表現にマッチしなかった場合との区別がつきにくい
      return false
    }
    return true
  }

  const checkApiKey = (apiKey: string) => {
    if (apiKey === '') return // apiKeyが空文字列の場合はエラーテキストではなくボタンをdisabledにしてユーザに示す
    if (apiKey.match(/^\w+$/) === null) {
      setIsError(true)
      setErrorText('Invalid format')
      return
    }
    setIsError(false)
    setErrorText('')
  }

  const handleInputAPIKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQiitaApiToken(e.target.value)
    checkApiKey(e.target.value)
  }

  const handleClick = async () => {
    if (await checkValidApiKey(qiitaApiToken)) {
      setQiitaApiToken(qiitaApiToken)
      setIsOpenApiKeyModal(false)
    }
  }

  return (
    <div className={styles.apikeyform}>
      <h2 className={styles.apikeyform__title}>Register your API key</h2>
      <div className={styles.apikeyform__textfield}>
        <TextBox
          value={qiitaApiToken}
          placeholder="your API key"
          errorText={errorText}
          onChange={handleInputAPIKey}
          isError={isError} // テキストボックスが一つしか無いのでrequiredは不要
        />
      </div>
      <div className={styles.apikeyform__button}>
        <Button
          label="Register"
          onClick={handleClick}
          disabled={qiitaApiToken === '' || isError}
        />
      </div>
    </div>
  )
}

export default ApiKeyForm
