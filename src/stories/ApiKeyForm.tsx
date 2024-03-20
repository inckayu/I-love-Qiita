import { Button } from './Button'
import styles from '../styles/modules/apikeyform.module.scss'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import { useRecoilValue } from 'recoil'
import TextBox from './TextBox'
import { isErrorState } from '@/state/isErrorState'
import { errorTextState } from '@/state/errorTextState'
import useApiKeyForm from '@/hooks/useApiKeyForm'

const ApiKeyForm = () => {
  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)
  const isError = useRecoilValue<boolean>(isErrorState)
  const errorText = useRecoilValue<string>(errorTextState)
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
        <Button label="Register" onClick={handleClick} disabled={qiitaApiToken === '' || isError} />
      </div>
    </div>
  )
}

export default ApiKeyForm
