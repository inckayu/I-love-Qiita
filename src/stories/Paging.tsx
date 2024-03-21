import React from 'react'
import { useRecoilState } from 'recoil'

import useSearchForm from '@/hooks/useSearchForm'

import { IsPagingDisabled, isPagingDisabledState } from '@/state/isPagingDisabled'


import { pageNumberState } from '@/state/pageNumberState'

import LinkText from './LinkText'
import styles from '../styles/modules/paging.module.scss'


const Paging = () => {
  const [pageNumber, setPageNumber] = useRecoilState<number>(pageNumberState)
  const {fetchArticleAndSummary} = useSearchForm()
  const [isPagingDisabled, setIsPagingDisabled] = useRecoilState<IsPagingDisabled>(isPagingDisabledState)

  const handlePrevButtonClick = () => {
    console.log('prev')
    console.log(pageNumber)
    setPageNumber((prev) => prev - 1)
    fetchArticleAndSummary(pageNumber - 1)
    setIsPagingDisabled((cur) => ({...cur, next: false}))
    if (pageNumber === 2) {
      setIsPagingDisabled((cur) => ({...cur, prev: true}))
    } else {
      setIsPagingDisabled((cur) => ({...cur, prev: false}))
    }
  }

  const handleNextButtonClick = () => {
    console.log('next')
    console.log(pageNumber)
    setPageNumber((prev) => prev + 1)
    fetchArticleAndSummary(pageNumber + 1)
    if (pageNumber === 1) {
      setIsPagingDisabled((cur) => ({...cur, prev: false}))
    }
  }

  return (
    <div className={styles.paging}>
      <LinkText text="prev" path="" disabled={isPagingDisabled.prev} onClick={() => void handlePrevButtonClick()} />
      <div className={styles.paging__page}>{pageNumber}</div>
      <LinkText text="next" path="" disabled={isPagingDisabled.next} onClick={() => void handleNextButtonClick()} />
    </div>
  )
}

export default Paging
