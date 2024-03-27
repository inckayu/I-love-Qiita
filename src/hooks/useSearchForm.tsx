import axios, { AxiosResponse } from 'axios'
import React, { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { fetchArticles } from '@/functions/fetchArticles'
import { slashConverter } from '@/functions/slashConverter'

import { Article } from '@/types/Article'

import {
  articleAuthorState,
  articleBodyState,
  articleExcludedTagsState,
  articleLastUpdateState,
  articlePublicationState,
  articleTagsState,
  queryState,
} from '@/state/articleQuery'
import { articleTitleState } from '@/state/articleQuery/articleTitleState'
import { articlesState } from '@/state/articlesState'
import { generatedSummariesState } from '@/state/generatedSummaries'
import { isOpenApiKeyModalState } from '@/state/isOpenApiKeyModalState'
import { isPagingDisabledState } from '@/state/isPagingDisabled'
import { isSearchingState } from '@/state/isSearchingState'
import { isSkeletonState } from '@/state/isSkeletonState'
import { pageNumberState } from '@/state/pageNumberState'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'

const useSearchForm = () => {
  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)
  const [, setIsOpenApiKeyModal] = useRecoilState(isOpenApiKeyModalState)
  const [, setArticles] = useRecoilState<Article[]>(articlesState)
  const [, setIsSearching] = useRecoilState<boolean>(isSearchingState)
  const [, setGeneratedSummaries] = useRecoilState<string[]>(generatedSummariesState)
  const [articleTitle, setArticleTitle] = useRecoilState<string>(articleTitleState)
  const articleBody = useRecoilValue(articleBodyState)
  const articleAuthor = useRecoilValue(articleAuthorState)
  const articlePublication = useRecoilValue(articlePublicationState)
  const articleLastUpdate = useRecoilValue(articleLastUpdateState)
  const articleTags = useRecoilValue(articleTagsState)
  const articleExcludedTags = useRecoilValue(articleExcludedTagsState)
  const [, setIsSkeleton] = useRecoilState<boolean>(isSkeletonState)
  const [, setPagingDisabled] = useRecoilState(isPagingDisabledState)
  const [, setQuery] = useRecoilState<string>(queryState)
  const [, setPageNumber] = useRecoilState<number>(pageNumberState)

  const fetchArticleAndSummary = useCallback(
    (query: string, page: number) => {
      interface SummaryResponse {
        summary: string
      }

      setIsSearching(true)
      fetchArticles(query, qiitaApiToken, page)
        .then(async (articles) => {
          if (articles.length > 0 && articles.length < 10) {
            setPagingDisabled((cur) => ({ ...cur, next: true }))
          } else {
            setPagingDisabled((cur) => ({ ...cur, next: false }))
          }
          if (articles.length === 0) {
            setIsSearching(false)
            setIsSkeleton(false)
            return
          }

          setArticles(articles)

          setTimeout(() => {
            setIsSkeleton(true)
          }, 4000)

          const summaries = await Promise.all(
            articles.map(async (article) => {
              try {
                const response: AxiosResponse<SummaryResponse> = await axios.post(
                  '/api/generateSummary',
                  {
                    article: article.body,
                  }
                )
                return response.data.summary
              } catch (error) {
                console.error('Failed to generate summary.', error)
                return 'Failed to generate summary.'
              }
            })
          )

          setTimeout(() => {
            setGeneratedSummaries(summaries)
            setIsSearching(false)
            setIsSkeleton(false)
          }, 2000)
        })
        .catch((e) => {
          console.error(e)
        })
    },
    [
      qiitaApiToken,
      setIsSearching,
      setIsSkeleton,
      setArticles,
      setPagingDisabled,
      setGeneratedSummaries,
    ]
  )

  const handleApiKeyModalClose = useCallback(() => {
    setIsOpenApiKeyModal(false)
  }, [setIsOpenApiKeyModal])

  const handleApiKeyButton = useCallback(() => {
    setIsOpenApiKeyModal(true)
  }, [setIsOpenApiKeyModal])

  const handleTitleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault() // フォームが送信されてリロードされないよう

      // FIXME: 正規表現でチェックする
      // FIXME: クエリの組み立てを関数に切り出す

      const title = articleTitle.length ? `title:${articleTitle.replace(/[\s\u3000]+/g, ',')}` : ''
      const body = articleBody.length ? `body:${articleBody.replace(/[\s\u3000]+/g, ',')}` : ''
      const author = articleAuthor.length
        ? `user:${articleAuthor.replace(/[\s\u3000]+/g, ',')}`
        : ''
      const publicationStart = articlePublication.start.length
        ? `created:>=${slashConverter(articlePublication.start)}`
        : ''
      const publicationEnd = articlePublication.end.length
        ? `created:<=${slashConverter(articlePublication.end)}`
        : ''
      const lastUpdateStart = articleLastUpdate.start.length
        ? `updated:>=${slashConverter(articleLastUpdate.start)}`
        : ''
      const lastUpdateEnd = articleLastUpdate.end.length
        ? `updated:<=${slashConverter(articleLastUpdate.end)}`
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
      setPageNumber(1)
      fetchArticleAndSummary(query, 1)
    },
    [
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
      setPageNumber,
      fetchArticleAndSummary,
    ]
  )

  const handleInputTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleTitle(e.target.value)
  }, [])

  const handleSearchFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }, [])

  return {
    fetchArticleAndSummary,
    handleApiKeyModalClose,
    handleApiKeyButton,
    handleTitleClick,
    handleInputTitle,
    handleSearchFormSubmit,
  }
}

export default useSearchForm
