import React from 'react'
import { fetchArticles } from '@/functions/fetchArticles'
import { generateSummary } from '@/functions/generateSummary'
import { slashConverter } from '@/functions/slashConverter'
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
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import { Article } from '@/types/Article'
import { useRecoilState, useRecoilValue } from 'recoil'

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

  const handleApiKeyModalClose = () => {
    setIsOpenApiKeyModal(false)
  }

  const handleApiKeyButton = () => {
    setIsOpenApiKeyModal(true)
  }

  const handleTitleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault() // フォームが送信されてリロードされないよう

    // FIXME: 正規表現でチェックする
    // FIXME: クエリの組み立てを関数に切り出す

    const title = articleTitle.length ? `title:${articleTitle.replace(/[\s\u3000]+/g, ',')}` : ''
    const body = articleBody.length ? `body:${articleBody.replace(/[\s\u3000]+/g, ',')}` : ''
    const author = articleAuthor.length ? `user:${articleAuthor.replace(/[\s\u3000]+/g, ',')}` : ''
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
    fetchArticleAndSummary(query, 1)
  }

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleTitle(e.target.value)
  }

  const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const fetchArticleAndSummary = (query: string, page: number) => {
    setIsSearching(true)
    console.log(page)
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
        }, 2000)

        // FIXME: Cの処理を必ず最後に実行してisSkeletonをfalseにするために、処理時間(s)が 4 = A < B + C = B + 2となるようにしている。
        // 検索と要約生成の時間に必ず+2秒されてしまうのが欠点
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
