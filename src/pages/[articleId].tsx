import CircularProgress from '@mui/material/CircularProgress'
import { GetServerSideProps } from 'next'
import sanitizeHtml from 'sanitize-html'

import { sanitizeHtml as sanitizeHtmlOptions } from '@/constants/sanitize'

import { decorateLink } from '@/functions/decorateLink'
import { downgradeHeadings } from '@/functions/downgradeHeadings'
import { fetchArticle } from '@/functions/fetchArticle'
import { getDataframeInIframe } from '@/functions/getDataframeInIframe'
import { pseudoCodingBlock } from '@/functions/pseudoCodingBlock'

import DetailedArticleHeader from '@/stories/DetailedArticleHeader/DetailedArticleHeader'
import Divider from '@/stories/Divider/Divider'
import Footer from '@/stories/Footer/Footer'
import LinkText from '@/stories/LinkText/LinkText'

import { Article } from '@/types/Article'

import CommonHead from '@/components/CommonHead'
import styles from '@/styles/modules/detailedarticle.module.scss'

interface Props {
  article: Article | null
}

const DetailedArticle = ({ article }: Props) => {
  // TODO: 404ページを作成する
  if (!article) return <div>記事が見つかりませんでした。</div>

  return (
    <>
      <CommonHead
        genre="article"
        title={article.title}
        author={article.user.name || article.user.id}
        icon={article.user.profile_image_url}
        publishedAt={article.created_at}
      />
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
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  const articleId = params?.articleId
  const QIITA_TOKEN = process.env.QIITA_TOKEN
  if (typeof articleId !== 'string') return { props: { article: null } }
  if (!QIITA_TOKEN) return { props: { article: null } }

  try {
    const article = await fetchArticle(articleId, QIITA_TOKEN)
    return { props: { article: article } }
  } catch (error) {
    console.error(error)
    return { props: { article: null } }
  }
}

export default DetailedArticle
