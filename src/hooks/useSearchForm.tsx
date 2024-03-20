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
import { isSkeletonState } from '@/state/isSkeletonState'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'

const useSearchForm = () => {
  const [, setIsOpenApiKeyModal] = useRecoilState(isOpenApiKeyModalState)
  const articleTitle = useRecoilValue<string>(articleTitleState)
  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)
  const [, setArticles] = useRecoilState<Article[]>(articlesState)
  const [, setIsSearching] = useRecoilState<boolean>(isSearchingState)
  const [, setGeneratedSummaries] = useRecoilState<string[]>(generatedSummariesState)
  const [, setArticleTitle] = useRecoilState<string>(articleTitleState)
  const [, setIsSkeleton] = useRecoilState<boolean>(isSkeletonState)

  const handleApiKeyModalClose = () => {
    setIsOpenApiKeyModal(false)
  }

  const handleApiKeyButton = () => {
    setIsOpenApiKeyModal(true)
  }

  const handleTitleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault() // フォームが送信されてリロードされないよう
    setIsSearching(true)
    fetchArticles(articleTitle, qiitaApiToken)
      .then(async (articles) => {
        setArticles(articles)

        // A
        setTimeout(() => {
          console.log("aaa")
          setIsSkeleton(true)
        }, 4000) // ローディングサークルでユーザを待たせるのはUX的に4秒が限度と仮定

        // B
        const summaries = await Promise.all(
          articles.map((article) => generateSummary(article.body))
        )
        
        // C
        setTimeout(() => {
          setGeneratedSummaries(summaries)
          setIsSearching(false)
          setIsSkeleton(false)
          console.log("bbb")
        }, 1000)

        // FIXME: Cの処理を必ず最後に実行してisSkeletonをfalseにするために、処理時間(s)が 4 = A < B + C = B + 1となるようにしている。
        // 検索と要約生成の時間に必ず+1秒されてしまうのが欠点
        // スマートな書き方ではないので要修正
        
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleTitle(e.target.value)
  }

  const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return {
    handleApiKeyModalClose,
    handleApiKeyButton,
    handleTitleClick,
    handleInputTitle,
    handleSearchFormSubmit,
  }
}

export default useSearchForm
