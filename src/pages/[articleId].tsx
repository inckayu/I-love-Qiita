import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import sanitizeHtml from 'sanitize-html'

import { allowedTags } from '@/constants/allowedTags'

import { decorateLink } from '@/functions/decorateLink'
import { downgradeHeadings } from '@/functions/downgradeHeadings'
import { fetchArticle } from '@/functions/fetchArticle'

import DetailedArticleHeader from '@/stories/DetailedArticleHeader'
import Divider from '@/stories/Divider'
import LinkText from '@/stories/LinkText'

import { Article } from '@/types/Article'

import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import styles from '@/styles/modules/detailedarticle.module.scss'

// import { remark } from 'remark'
// import html from 'remark-html'
// import prism from 'remark-prism'
// import highlight from 'remark-highlight.js'
// import { unified } from 'unified'
// import remarkParse from 'remark-parse'
// import remarkRehype from 'remark-rehype'
// import rehypeHighlight from 'rehype-highlight'
// import rehypeStringify from 'rehype-stringify'
// import 'highlight.js/styles/hybrid.css'

const DetailedArticle = () => {
  const [article, setArticle] = useState<Article | null>(null)
  const qiitaApiToken = useRecoilValue(qiitaApiTokenState)
  const router = useRouter()

  // const [code, setCode] = useState<string>('')
  // const syntaxHighlighter = async (codeBlock: string) => {
  //   const result = await unified()
  //     .use(remarkParse)
  //     .use(remarkRehype)
  //     .use(rehypeHighlight)
  //     .use(rehypeStringify)
  //     .process(codeBlock)
  //   return result.toString()
  // }
  // const reg = article?.body.match(/```([^`]+)```/g)
  // const test = article?.body.match(/use/g)

  useEffect(() => {
    const articleId = router.query.articleId
    if (articleId && typeof articleId === 'string') {
      fetchArticle(articleId, qiitaApiToken)
        .then((article) => {
          console.log(article)
          setArticle(article)
          // syntaxHighlighter(article.body).then((result) => {
          //   console.log(result)
          //   setCode(result)
          // })
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
                    sanitizeHtml(downgradeHeadings(article?.rendered_body), {
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
