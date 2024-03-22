import useDetailedSearchForm from '@/hooks/useDetailedSearchForm'

import { Button } from './Button'
import TagsAutoComplete from './TagsAutoComplete'
import TextBox from './TextBox'
import styles from '../styles/modules/detailedsearchform.module.scss'

export default function DetailedSearchForm() {
  const { handleCancelButtonClick, handleOKButtonClick } = useDetailedSearchForm()

  return (
    <div className={styles.detailedsearchform}>
      <h2 className={styles.detailedsearchform__title}>Detailed Search Options</h2>
      <div className={styles.detailedsearchform__textboxes}>
        <TextBox value="" label="Title" placeholder="Keywords in the article body" />
        <TextBox value="" label="body" placeholder="Keywords in the article body" />
        <TextBox value="" label="Author" placeholder="Keywords in the article body" />
      </div>
      <div className={styles.detailedsearchform__ranges}>
        <div>
          <div className={styles.detailedsearchform__rangename}>Publication Range</div>
          <div className={styles.detailedsearchform__range}>
            <TextBox value="" label="Start" width={104} placeholder="yyyy/MM/dd" />
            <TextBox value="" label="End" width={104} placeholder="yyyy/MM/dd" />
          </div>
        </div>

        <div>
          <div className={styles.detailedsearchform__rangename}>Last Update Range</div>
          <div className={styles.detailedsearchform__range}>
            <TextBox value="" label="Start" width={104} placeholder="yyyy/MM/dd" />
            <TextBox value="" label="End" width={104} placeholder="yyyy/MM/dd" />
          </div>
        </div>
      </div>
      <div className={styles.detailedsearchform__tag}>
        <TagsAutoComplete label="Tags" />
        <TagsAutoComplete label="Tags to Exclude" />
      </div>
      <div className={styles.detailedsearchform__buttons}>
        <div>
          <Button label="Cancel" variant="secondary" onClick={handleCancelButtonClick} />
        </div>
        <div>
          <Button label="OK" onClick={handleOKButtonClick} />
        </div>
      </div>
    </div>
  )
}
