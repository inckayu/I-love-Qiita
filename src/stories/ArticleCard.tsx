import Link from 'next/link'
import React from 'react'

import formatDate from '@/functions/formatDate'
import { getUserName } from '@/functions/getUserName'

import { Article } from '@/types/Article'

import SkeletonArticleCard from './SkeletonArticleCard'
import UserInfo from './UserInfo'
import styles from '../styles/modules/articlecard.module.scss'

interface ArticleCardProps {
  article: Article
  summary: string
  isSkeleton: boolean
}

const ArticleCard = ({ article, summary, isSkeleton }: ArticleCardProps) => {
  return isSkeleton ? <SkeletonArticleCard /> : (
    <Link key={article.id} href={article.id} className={styles.articlecard}>
      <div className={styles.articlecard__left}>
        <div>
          <div className={styles.articlecard__title}>{article.title}</div>
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
}
export default ArticleCard
