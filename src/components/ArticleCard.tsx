import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'
import sanitizeHtml from 'sanitize-html'

import SkeletonArticleCard from './SkeletonArticleCard'
import UserInfo from './UserInfo'
import formatDate from '../functions/formatDate'
import { getUserName } from '../functions/getUserName'
import { titleHighlighter } from '../functions/titleHighlighter'
import { articleTitleState } from '../state/articleQuery/articleTitleState'
import styles from '../styles/modules/articlecard.module.scss'
import { Article } from '../types/Article'

interface ArticleCardProps {
  article: Article
  summary: string
  isSkeleton: boolean
}

/* eslint react/display-name: 0 */
const ArticleCard = React.memo(({ article, summary, isSkeleton }: ArticleCardProps) => {
  const articleTitle = useRecoilValue<string>(articleTitleState)
  const words = articleTitle.split(/[\u{20}\u{3000}]/u)

  return isSkeleton ? (
    <SkeletonArticleCard />
  ) : (
    <Link key={article.id} href={article.id} className={styles.articlecard}>
      <div className={styles.articlecard__left}>
        <div>
          <div
            className={styles.articlecard__title}
            dangerouslySetInnerHTML={{
              __html: titleHighlighter(sanitizeHtml(article.title), words),
            }}
          />
          <div className={styles.articlecard__date}>{formatDate(article.created_at)}</div>
        </div>
        <UserInfo
          user={{
            organization: article.user.organization,
            name: getUserName({
              name: article.user.name,
              id: article.user.id,
            }),
            profile_image_url: article.user.profile_image_url,
          }}
        />
      </div>
      <div className={styles.articlecard__right}>{summary}</div>
    </Link>
  )
})
export default ArticleCard
