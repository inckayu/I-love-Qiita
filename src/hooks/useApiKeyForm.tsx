import { errorTextState } from '@/state/errorTextState'
import { isErrorState } from '@/state/isErrorState'
import { isOpenApiKeyModalState } from '@/state/isOpenModalState'
import { isValidApiKeyTokenState } from '@/state/isValidApiTokenState'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import { useRecoilState } from 'recoil'
import axios from 'axios'
import { Article } from '@/types/Article'

const useApiKeyForm = () => {
  const [qiitaApiToken, setQiitaApiToken] = useRecoilState(qiitaApiTokenState)
  const [, setIsOpenApiKeyModal] = useRecoilState(isOpenApiKeyModalState)
  const [, setIsValidApiKeyToken] = useRecoilState(isValidApiKeyTokenState)
  const [, setIsError] = useRecoilState(isErrorState)
  const [, setErrorText] = useRecoilState(errorTextState)

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
      setErrorText('Authentication failed. Please check the key validity')
      return false
    }
    return true
  }

  const checkApiKey = (apiKey: string) => {
    if (apiKey === '') return // apiKeyが空文字列の場合はエラーテキストではなくボタンをdisabledにしてユーザに示す
    if (apiKey.match(/^\w+$/) === null) {
      setIsError(true)
      setErrorText('Invalid format. Please input again')
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
      setIsValidApiKeyToken(true)
    }
  }
  return {
    checkValidApiKey,
    checkApiKey,
    handleInputAPIKey,
    handleClick,
  }
}

export default useApiKeyForm
