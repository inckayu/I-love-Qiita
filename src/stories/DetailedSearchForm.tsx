import useDetailedSearchForm from "@/hooks/useDetailedSearchForm"

import { Button } from "./Button"
import styles from "../styles/modules/detailedsearchform.module.scss"

const DetailedSearchForm = () => {
  const { handleCancelButtonClick, handleOKButtonClick } = useDetailedSearchForm()
  return (
    <div className={styles.detailedsearchform}>
      <div>aaa</div>
      <div>aaa</div>
      <div>aaa</div>
      <div className={styles.detailedsearchform__buttons}>
        <Button label="Cancel" variant="secondary" onClick={handleCancelButtonClick} />
        <Button label="OK" onClick={handleOKButtonClick} />
      </div>
    </div>
  )
}

export default DetailedSearchForm