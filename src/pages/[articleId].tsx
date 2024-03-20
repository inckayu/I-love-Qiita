import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Article } from '@/types/Article'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import { useRecoilValue } from 'recoil'
import Tag from '@/stories/Tag'
import UserInfo from '@/stories/UserInfo'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Divider from '@/stories/Divider'
import { Button } from '@/stories/Button'
import formatDate from '@/functions/formatDate'
import LinkText from '@/stories/LinkText'
import styles from '@/styles/modules/detailedarticle.module.scss'
import Link from 'next/link'
import { getUserName } from '@/functions/getUserName'
import { fetchArticle } from '@/functions/fetchArticle'
import sanitizeHtml from 'sanitize-html'

const DetailedArticle = () => {
  const [article, setArticle] = useState<Article | null>(null)
  const qiitaApiToken = useRecoilValue(qiitaApiTokenState)
  const router = useRouter()

  useEffect(() => {
    const articleId = router.query.articleId
    console.log(articleId)
    if (articleId && typeof articleId === 'string') {
      fetchArticle(articleId, qiitaApiToken).then((article) => {
        console.log(article)
        setArticle(article)
      })
    }
  }, [router.query.articleId, qiitaApiToken])

  return article === null ? (
    <div>loading...</div>
  ) : (
    <main className={styles.detailedarticle}>
      <div className={styles.detailedarticle__back}>
        <LinkText text="back" path="/" />
      </div>
      <div className={styles.detailedarticle__wrapper}>
        <div>
          <div className={styles.detailedarticle__top}>
            <div className={styles.detailedarticle__title}>{article.title}</div>
            <Link href={article.url} rel="noopener noreferrer" target="_blank">
              <Button variant="primary" size="large" label="Read in Qiita" />
            </Link>
          </div>

          <div className={styles.detailedarticle__tags}>
            {article.tags
              ? article.tags.map((tag, index) => (
                  <div
                    className={styles.detailedarticle__tagwrapper}
                    key={index}
                  >
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
          <div className={styles.detailedarticle__divider}>
            <Divider />
          </div>
          <div
            className={styles.detailedarticle__body}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(article.rendered_body),
            }}
          />
        </div>
      </div>
      <div className={styles.detailedarticle__back}>
        <LinkText text="back" path="/" />
      </div>
    </main>
  )
}

export default DetailedArticle
