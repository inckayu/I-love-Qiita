import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isOpenApiKeyModalState } from '@/state/isOpenModalState'
import { fetchArticles } from '@/functions/fetchArticles'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import { articleTitleState } from '@/state/articleTitleState'
import { generateAbstract } from '@/functions/generateAbstract'
import { articlesState } from '@/state/articlesState'
import { isSearchingState } from '@/state/isSearchingState'
import { generatedAbstractsState } from '@/state/generatedAbstracts'
import { Article } from '@/types/Article'

const useSearchForm = () => {
  const [, setIsOpenApiKeyModal] = useRecoilState(isOpenApiKeyModalState)
  const articleTitle = useRecoilValue<string>(articleTitleState)
  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)
  const [, setArticles] = useRecoilState<Article[]>(articlesState)
  const [, setIsSearching] = useRecoilState<boolean>(isSearchingState)
  const [, setGeneratedAbstracts] = useRecoilState<string[]>(
    generatedAbstractsState
  )

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

      const summaries = await Promise.all(
        articles.map((article) => generateAbstract(article.body))
      )
      console.log(summaries)
      setGeneratedAbstracts(summaries)
      setIsSearching(false)
    })
  }
  return {
    handleApiKeyModalClose,
    handleApiKeyButton,
    handleTitleClick,
  }
}

export default useSearchForm
