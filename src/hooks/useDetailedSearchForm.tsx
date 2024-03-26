import React, { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { convertToHalfWidth } from '@/functions/convertToHalfWidth'
import { isValidFormatDate } from '@/functions/isValidFormatDate'
import { slashConverter } from '@/functions/slashConverter'

import { PublicationTimeline } from '@/types/PublicationTimeline'

import {
  articleAuthorState,
  articleBodyState,
  articleExcludedTagsState,
  articleLastUpdateState,
  articlePublicationState,
  articleTagsState,
  articleTitleState,
  queryState,
} from '@/state/articleQuery'
import { isOpenDetailedSearchModalState } from '@/state/isOpenDetailedSearchModalState'
import { isValidDateFormatsState } from '@/state/isValidDateFormatsState'
import { pageNumberState } from '@/state/pageNumberState'

import useSearchForm from './useSearchForm'

const useDetailedSearchForm = () => {
  const [, setIsOpenDetailedSearchModal] = useRecoilState(isOpenDetailedSearchModalState)
  const [articleTitle, setArticleTitle] = useRecoilState(articleTitleState)
  const [articleBody, setArticleBody] = useRecoilState(articleBodyState)
  const [articleAuthor, setArticleAuthor] = useRecoilState(articleAuthorState)
  const [articlePublication, setArticlePublication] = useRecoilState(articlePublicationState)
  const [articleLastUpdate, setArticleLastUpdate] = useRecoilState(articleLastUpdateState)
  const articleTags = useRecoilValue(articleTagsState)
  const articleExcludedTags = useRecoilValue(articleExcludedTagsState)
  const [, setQuery] = useRecoilState(queryState)
  const [, setIsValidDateFormats] = useRecoilState<PublicationTimeline>(isValidDateFormatsState)
  const [, setPageNumber] = useRecoilState<number>(pageNumberState)

  const { fetchArticleAndSummary } = useSearchForm()

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setArticleTitle(e.target.value)
    },
    [setArticleTitle]
  )

  const handleBodyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setArticleBody(e.target.value)
    },
    [setArticleBody]
  )

  const handleAuthorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setArticleAuthor(e.target.value)
    },
    [setArticleAuthor]
  )

  const handlePublicationStartChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsValidDateFormats((cur) => {
        return {
          ...cur,
          publication: {
            start: isValidFormatDate(e.target.value),
            end: cur.publication.end,
          },
        }
      })
      setArticlePublication((cur) => {
        return {
          ...cur,
          start: e.target.value,
        }
      })
    },
    [setArticlePublication, setIsValidDateFormats]
  )

  const handlePublicationEndChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsValidDateFormats((cur) => {
        return {
          ...cur,
          publication: {
            start: cur.publication.start,
            end: isValidFormatDate(e.target.value),
          },
        }
      })
      setArticlePublication((cur) => {
        return {
          ...cur,
          end: e.target.value,
        }
      })
    },
    [setArticlePublication, setIsValidDateFormats]
  )

  const handleLastUpdateStartChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsValidDateFormats((cur) => {
        return {
          ...cur,
          lastUpdate: {
            start: isValidFormatDate(e.target.value),
            end: cur.lastUpdate.end,
          },
        }
      })
      setArticleLastUpdate((cur) => {
        return {
          ...cur,
          start: e.target.value,
        }
      })
    },
    [setArticleLastUpdate, setIsValidDateFormats]
  )

  const handleLastUpdateEndChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsValidDateFormats((cur) => {
        return {
          ...cur,
          lastUpdate: {
            start: cur.lastUpdate.start,
            end: isValidFormatDate(e.target.value),
          },
        }
      })
      setArticleLastUpdate((cur) => {
        return {
          ...cur,
          end: e.target.value,
        }
      })
    },
    [setArticleLastUpdate, setIsValidDateFormats]
  )

  const handleDetailedSearchModalClose = useCallback(() => {
    setIsOpenDetailedSearchModal(false)
  }, [setIsOpenDetailedSearchModal])

  const handleDetailedSearchButton = useCallback(() => {
    setIsOpenDetailedSearchModal(true)
  }, [setIsOpenDetailedSearchModal])

  const handleCancelButtonClick = useCallback(() => {
    setIsOpenDetailedSearchModal(false)
  }, [setIsOpenDetailedSearchModal])

  const handleOKButtonClick = useCallback(() => {
    // FIXME: 正規表現でチェックする
    // FIXME: クエリの組み立てを関数に切り出す

    const title = articleTitle.length ? `title:${articleTitle.replace(/[\s\u3000]+/g, ',')}` : ''
    const body = articleBody.length ? `body:${articleBody.replace(/[\s\u3000]+/g, ',')}` : ''
    const author = articleAuthor.length ? `user:${articleAuthor.replace(/[\s\u3000]+/g, ',')}` : ''
    const publicationStart = articlePublication.start.length
      ? `created:>=${slashConverter(convertToHalfWidth(articlePublication.start))}`
      : ''
    const publicationEnd = articlePublication.end.length
      ? `created:<=${slashConverter(convertToHalfWidth(articlePublication.end))}`
      : ''
    const lastUpdateStart = articleLastUpdate.start.length
      ? `updated:>=${slashConverter(convertToHalfWidth(articleLastUpdate.start))}`
      : ''
    const lastUpdateEnd = articleLastUpdate.end.length
      ? `updated:<=${slashConverter(convertToHalfWidth(articleLastUpdate.end))}`
      : ''
    const tags = articleTags.map((tag) => `tag:${tag.id}`).join(' ') // NOTE: joinの引数は半角空白
    const excludedTags = articleExcludedTags.map((tag) => `-tag:${tag.id}`).join(' ')
    const query = [
      title,
      body,
      author,
      publicationStart,
      publicationEnd,
      lastUpdateStart,
      lastUpdateEnd,
      tags,
      excludedTags,
    ].join(' ')
    setQuery(query)
    setIsOpenDetailedSearchModal(false)
    setPageNumber(1)
    fetchArticleAndSummary(query, 1)
  }, [
    articleTitle,
    articleBody,
    articleAuthor,
    articlePublication.start,
    articlePublication.end,
    articleLastUpdate.start,
    articleLastUpdate.end,
    articleTags,
    articleExcludedTags,
    setQuery,
    setIsOpenDetailedSearchModal,
    setPageNumber,
    fetchArticleAndSummary,
  ])

  return {
    handleTitleChange,
    handleBodyChange,
    handleAuthorChange,
    handlePublicationStartChange,
    handlePublicationEndChange,
    handleLastUpdateStartChange,
    handleLastUpdateEndChange,
    handleDetailedSearchModalClose,
    handleDetailedSearchButton,
    handleCancelButtonClick,
    handleOKButtonClick,
  }
}

export default useDetailedSearchForm
