import { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { queryState } from '@/state/articleQuery'
import { IsPagingDisabled, isPagingDisabledState } from '@/state/isPagingDisabled'
import { pageNumberState } from '@/state/pageNumberState'

import useSearchForm from './useSearchForm'

const usePaging = () => {
  const [pageNumber, setPageNumber] = useRecoilState<number>(pageNumberState)
  const { fetchArticleAndSummary } = useSearchForm()
  const [, setIsPagingDisabled] = useRecoilState<IsPagingDisabled>(isPagingDisabledState)
  const query = useRecoilValue<string>(queryState)

  const handlePrevButtonClick = useCallback(() => {
    setPageNumber((prev) => prev - 1)
    fetchArticleAndSummary(query, pageNumber - 1)
    setIsPagingDisabled((cur) => ({ ...cur, next: false }))
    if (pageNumber === 2) {
      setIsPagingDisabled((cur) => ({ ...cur, prev: true }))
    } else {
      setIsPagingDisabled((cur) => ({ ...cur, prev: false }))
    }
  }, [setPageNumber, fetchArticleAndSummary, query, pageNumber, setIsPagingDisabled])

  const handleNextButtonClick = useCallback(() => {
    setPageNumber((prev) => prev + 1)
    fetchArticleAndSummary(query, pageNumber + 1)
    if (pageNumber === 1) {
      setIsPagingDisabled((cur) => ({ ...cur, prev: false }))
    }
  }, [setPageNumber, fetchArticleAndSummary, query, pageNumber, setIsPagingDisabled])

  return {
    handlePrevButtonClick,
    handleNextButtonClick,
  }
}

export default usePaging
