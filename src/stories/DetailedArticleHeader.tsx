import BookmarkIcon from '@mui/icons-material/Bookmark'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Link from "next/link"

import formatDate from "@/functions/formatDate"
import { getUserName } from "@/functions/getUserName"

import { Article } from "@/types/Article"

import { Button } from "./Button"
import Tag from './Tag'
import UserInfo from "./UserInfo"
import styles from "../styles/modules/detailedarticle.module.scss"

interface DetailedArticleHeaderProps {
  article: Article
}
const DetailedArticleHeader = ({article}: DetailedArticleHeaderProps) => {
  return (
    <div>
      <div className={styles.detailedarticle__top}>
            <h1 className={styles.detailedarticle__title}>{article.title}</h1>
            <Link href={article.url} rel="noopener noreferrer" target="_blank">
              <Button variant="primary" size="large" label="Read in Qiita" />
            </Link>
          </div>

          <div className={styles.detailedarticle__tags}>
            {article.tags
              ? article.tags.map((tag, index) => (
                  <div className={styles.detailedarticle__tagwrapper} key={index}>
                    <Tag tag={tag.name} />
                  </div>
                ))
              : null}
          </div>
          <div className={styles.detailedarticle__info}>
            <div className={styles.detailedarticle__times}>
              <div>投稿：{formatDate(article.created_at)}</div>
              <div>更新：{formatDate(article.updated_at)}</div>
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
          <div className={styles.detailedarticle__icons}>
            <div className={styles.detailedarticle__icon}>
              <FavoriteIcon />
              <div>{article.likes_count}</div>
            </div>
            <div className={styles.detailedarticle__icon}>
              <BookmarkIcon />
              <div>{article.stocks_count}</div>
            </div>
          </div>
    </div>
  )
}
export default DetailedArticleHeader