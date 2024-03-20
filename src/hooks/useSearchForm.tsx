import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { fetchArticles } from '@/functions/fetchArticles'
import { generateSummary } from '@/functions/generateSummary'

import { Article } from '@/types/Article'

import { articleTitleState } from '@/state/articleTitleState'
import { articlesState } from '@/state/articlesState'
import { generatedSummariesState } from '@/state/generatedSummaries'
import { isOpenApiKeyModalState } from '@/state/isOpenModalState'
import { isSearchingState } from '@/state/isSearchingState'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'

const useSearchForm = () => {
  const [, setIsOpenApiKeyModal] = useRecoilState(isOpenApiKeyModalState)
  const articleTitle = useRecoilValue<string>(articleTitleState)
  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)
  const [, setArticles] = useRecoilState<Article[]>(articlesState)
  const [, setIsSearching] = useRecoilState<boolean>(isSearchingState)
  const [, setGeneratedSummaries] = useRecoilState<string[]>(generatedSummariesState)
  const [, setArticleTitle] = useRecoilState<string>(articleTitleState)

  const handleApiKeyModalClose = () => {
    setIsOpenApiKeyModal(false)
  }

  const handleApiKeyButton = () => {
    setIsOpenApiKeyModal(true)
  }

  const handleTitleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault() // フォームが送信されてリロードされないよう
    setIsSearching(true)
    fetchArticles(articleTitle, qiitaApiToken).then(async (articles) => {
      setArticles(articles)

      const summaries = await Promise.all(articles.map((article) => generateSummary(article.body)))
      console.log(summaries)
      setGeneratedSummaries(summaries)
      setIsSearching(false)
    })
  }

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleTitle(e.target.value)
  }

  return {
    handleApiKeyModalClose,
    handleApiKeyButton,
    handleTitleClick,
    handleInputTitle,
  }
}

export default useSearchForm
