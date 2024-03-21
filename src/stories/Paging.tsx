import React from 'react'
import { useRecoilState } from 'recoil'

import useSearchForm from '@/hooks/useSearchForm'

import { pageNumberState } from '@/state/pageNumberState'

import LinkText from './LinkText'
import styles from '../styles/modules/paging.module.scss'

const Paging = () => {
  const [pageNumber, setPageNumber] = useRecoilState<number>(pageNumberState)
  const {fetchArticleAndSummary} = useSearchForm()

  const handlePrevButtonClick = () => {
    console.log('prev')
    if (pageNumber < 2) return
    setPageNumber((prev) => prev - 1)
    fetchArticleAndSummary(pageNumber - 1)
  }

  const handleNextButtonClick = () => {
    console.log('next')
    setPageNumber((prev) => prev + 1)
    fetchArticleAndSummary(pageNumber + 1)
  }

  return (
    <div className={styles.paging}>
      <LinkText text="prev" path="" onClick={() => void handlePrevButtonClick()} />
      <div className={styles.paging__page}>{pageNumber}</div>
      <LinkText text="next" path="" onClick={() => void handleNextButtonClick()} />
    </div>
  )
}

export default Paging
