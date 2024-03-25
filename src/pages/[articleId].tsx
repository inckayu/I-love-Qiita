import CircularProgress from '@mui/material/CircularProgress'
// import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import sanitizeHtml from 'sanitize-html'

import { sanitizeHtml as sanitizeHtmlOptions } from '@/constants/sanitize'

import { decorateLink } from '@/functions/decorateLink'
import { downgradeHeadings } from '@/functions/downgradeHeadings'
import { fetchArticle } from '@/functions/fetchArticle'
import { getDataframeInIframe } from '@/functions/getDataframeInIframe'
import { pseudoCodingBlock } from '@/functions/pseudoCodingBlock'

import DetailedArticleHeader from '@/stories/DetailedArticleHeader/DetailedArticleHeader'
import Divider from '@/stories/Divider/Divider'
import LinkText from '@/stories/LinkText/LinkText'

import { Article } from '@/types/Article'

import CommonHead from '@/components/CommonHead'
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
    <>
      <CommonHead genre="website" />
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
                  <Divider widthUnit="%" width={90} thick={1} color="#B3B3B3" />
                </div>
                <div
                  className={styles.detailedarticle__body}
                  dangerouslySetInnerHTML={{
                    __html: decorateLink(
                      getDataframeInIframe(
                        sanitizeHtml(
                          downgradeHeadings(pseudoCodingBlock(article?.rendered_body)),
                          sanitizeHtmlOptions
                        )
                      )
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
    </>
  )
}

export default DetailedArticle

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const id = context.query.articleId
//   const token = process.env.NEXT_PUBLIC_QIITA_TOKEN
//   console.log(id, token)
//   if (typeof id !== 'string') return { props: {} }
//   if (!token) return { props: {} }
//   const content = await fetchArticle(id, token)
//   return { props: content }
// }
