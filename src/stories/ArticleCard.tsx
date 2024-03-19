import { Article } from '@/types/Article'
import Link from 'next/link'
import React from 'react'
import UserInfo from './UserInfo'
import styles from '../styles/modules/articlecard.module.scss'
import formatDate from '@/functions/formatDate'
import { getUserName } from '@/functions/getUserName'

interface ArticleCardProps {
  article: Article
  abstract: string
}

const ArticleCard = ({ article, abstract }: ArticleCardProps) => {
  return (
    <Link key={article.id} href={article.id} className={styles.articlecard}>
      <div className={styles.articlecard__left}>
        <div>
          <div className={styles.articlecard__title}>{article.title}</div>
          <div className={styles.articlecard__date}>
            {formatDate(article.created_at)}
          </div>
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
      <div className={styles.articlecard__right}>{abstract}</div>
    </Link>
  )
}
export default ArticleCard
