import React from 'react'
import { useRecoilValue } from 'recoil'

import usePaging from '@/hooks/usePaging'

import { IsPagingDisabled, isPagingDisabledState } from '@/state/isPagingDisabled'
import { pageNumberState } from '@/state/pageNumberState'

import LinkText from '../stories/LinkText/LinkText'
import styles from '../styles/modules/paging.module.scss'

const Paging = () => {
  const { handlePrevButtonClick, handleNextButtonClick } = usePaging()
  const pageNumber = useRecoilValue<number>(pageNumberState)
  const isPagingDisabled = useRecoilValue<IsPagingDisabled>(isPagingDisabledState)

  return (
    <div className={styles.paging}>
      <LinkText
        text="prev"
        path=""
        disabled={isPagingDisabled.prev}
        onClick={() => void handlePrevButtonClick()}
      />
      <div className={styles.paging__page}>{pageNumber}</div>
      <LinkText
        text="next"
        path=""
        disabled={isPagingDisabled.next}
        onClick={() => void handleNextButtonClick()}
      />
    </div>
  )
}

export default Paging
