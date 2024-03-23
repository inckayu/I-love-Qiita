import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import sanitizeHtml from 'sanitize-html'

import { allowedTags } from '@/constants/allowedTags'

import { decorateLink } from '@/functions/decorateLink'
import { downgradeHeadings } from '@/functions/downgradeHeadings'
import { fetchArticle } from '@/functions/fetchArticle'
import { pseudoCodingBlock } from '@/functions/pseudoCodingBlock'

import DetailedArticleHeader from '@/stories/DetailedArticleHeader'
import Divider from '@/stories/Divider'
import LinkText from '@/stories/LinkText'

import { Article } from '@/types/Article'

import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import styles from '@/styles/modules/detailedarticle.module.scss'

const DetailedArticle = () => {
  const [article, setArticle] = useState<Article | null>(null)
  const qiitaApiToken = useRecoilValue(qiitaApiTokenState)
  const router = useRouter()

  useEffect(() => {
    const articleId = router.query.articleId
    if (articleId && typeof articleId === 'string') {
      fetchArticle(articleId, qiitaApiToken)
        .then((article) => {
          setArticle(article)
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }, [router.query.articleId, qiitaApiToken])

  return (
    <main className={styles.detailedarticle}>
      {article === null ? (
        <div className={styles.detailedarticle__circle}>
          <CircularProgress
            sx={{
              color: '#6f23d0',
            }}
            size={100}
          />
        </div>
      ) : (
        <>
          <div className={styles.detailedarticle__back}>
            <LinkText text="back" path="/" />
          </div>
          <div className={styles.detailedarticle__wrapper}>
            <div>
              <DetailedArticleHeader article={article} />
              <div className={styles.detailedarticle__divider}>
                <Divider />
              </div>
              <div
                className={styles.detailedarticle__body}
                dangerouslySetInnerHTML={{
                  __html: decorateLink(
                    sanitizeHtml(downgradeHeadings(pseudoCodingBlock(article?.rendered_body)), {
                      allowedTags: [...allowedTags, 'iframe'],
                      allowedAttributes: {
                        iframe: [
                          'src',
                          'data-content',
                          'frameborder',
                          'scrolling',
                          'loading',
                          'style',
                        ],
                        div: ['class', 'style'],
                        span: ['class'],
                      },
                      allowedIframeDomains: ['qiita.com'],
                    })
                  ),
                }}
              />
            </div>
          </div>
          <div className={styles.detailedarticle__back}>
            <LinkText text="back" path="/" />
          </div>
        </>
      )}
    </main>
  )
}

export default DetailedArticle
