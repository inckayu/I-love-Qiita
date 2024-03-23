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

  const { fetchArticleAndSummary } = useSearchForm()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleTitle(e.target.value)
  }

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleBody(e.target.value)
  }

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleAuthor(e.target.value)
  }

  const handlePublicationStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  const handlePublicationEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  const handleLastUpdateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  const handleLastUpdateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  const handleDetailedSearchModalClose = () => {
    setIsOpenDetailedSearchModal(false)
  }
  const handleDetailedSearchButton = () => {
    setIsOpenDetailedSearchModal(true)
  }
  const handleCancelButtonClick = () => {
    setIsOpenDetailedSearchModal(false)
  }
  const handleOKButtonClick = () => {
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
    console.log(query)
    setQuery(query)
    setIsOpenDetailedSearchModal(false)
    fetchArticleAndSummary(query, 1)
  }
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
