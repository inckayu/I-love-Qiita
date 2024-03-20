import { useRecoilValue } from 'recoil'

import useApiKeyForm from '@/hooks/useApiKeyForm'

import { errorTextState } from '@/state/errorTextState'
import { isErrorState } from '@/state/isErrorState'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'

import { Button } from './Button'
import TextBox from './TextBox'
import styles from '../styles/modules/apikeyform.module.scss'
import { isVerifingState } from '@/state/isVerifingState'

const ApiKeyForm = () => {
  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)
  const isError = useRecoilValue<boolean>(isErrorState)
  const errorText = useRecoilValue<string>(errorTextState)
  const isVerifing = useRecoilValue<boolean>(isVerifingState)
  const { handleInputAPIKey, handleClick } = useApiKeyForm()

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
          onClick={() => void handleClick()}
          disabled={qiitaApiToken === '' || isError}
          isLoading={isVerifing}
        />
      </div>
    </div>
  )
}

export default ApiKeyForm
