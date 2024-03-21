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
  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)
  const [, setArticles] = useRecoilState<Article[]>(articlesState)
  const [isSearching, setIsSearching] = useRecoilState<boolean>(isSearchingState)
  const [, setGeneratedSummaries] = useRecoilState<string[]>(generatedSummariesState)
  const [articleTitle, setArticleTitle] = useRecoilState<string>(articleTitleState)
  const [isSkeleton, setIsSkeleton] = useRecoilState<boolean>(isSkeletonState)

  const handleApiKeyModalClose = () => {
    setIsOpenApiKeyModal(false)
  }

  const handleApiKeyButton = () => {
    setIsOpenApiKeyModal(true)
  }

  const handleTitleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault() // フォームが送信されてリロードされないよう
    fetchArticleAndSummary(1)
  }

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleTitle(e.target.value)
  }

  const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const fetchArticleAndSummary = (page: number) => {
    setIsSearching(true);
    console.log("isSearching", isSearching)
    console.log("isSkeleton", isSkeleton)
    fetchArticles(articleTitle, qiitaApiToken, page)
      .then(async (articles) => {
        setArticles(articles)

        // A
        setTimeout(() => {
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
        }, 1000)

        // FIXME: Cの処理を必ず最後に実行してisSkeletonをfalseにするために、処理時間(s)が 4 = A < B + C = B + 1となるようにしている。
        // 検索と要約生成の時間に必ず+1秒されてしまうのが欠点
        // スマートな書き方ではないので要修正
        
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return {
    handleApiKeyModalClose,
    handleApiKeyButton,
    handleTitleClick,
    handleInputTitle,
    handleSearchFormSubmit,
    fetchArticleAndSummary,
  }
}

export default useSearchForm
