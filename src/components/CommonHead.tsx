import Head from 'next/head'
import React from 'react'

interface CommonHeadProps {
  genre: string
  title?: string
  author?: string
  icon?: string
  publishedAt?: string
}

/* eslint react/display-name: 0 */
const CommonHead = React.memo(({ genre, title, author, icon, publishedAt }: CommonHeadProps) => {
  return (
    <Head>
      <title>I love Qiita</title>
      <meta content="I love Qiita, where many seekers for knowledge meet up." name="description" />
      <meta charSet="utf-8" />

      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="icon" href="/favicon.ico" sizes="48x48" />
      <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      {/* <link rel="manifest" href="/site.webmanifest" /> */}

      {/* URLはデプロイ後に変える */}
      <meta property="og:title" content="I love Qiita" />
      <meta
        property="og:description"
        content="I love Qiita, where many seekers for knowledge meet up."
      />
      <meta property="og:type" content={genre} />
      <meta property="og:url" content="https://i-love-qiita.vercel.app" />

      <meta property="og:site_name" content="I love Qiita" />
      <meta property="og:locale" content="ja_JP" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="I love Qiita" />

      {genre === 'article' ? (
        <>
          <meta
            property="og:image"
            content={`https://i-love-qiita.vercel.app/api/ogpArticle?title=${title}&author=${author}&icon=${typeof icon === 'string' ? encodeURIComponent(icon) : ''}&publishedAt=${publishedAt}`}
          />
          <meta
            name="twitter:image"
            content={`https://i-love-qiita.vercel.app/api/ogpArticle?title=${title}&author=${author}&icon=${typeof icon === 'string' ? encodeURIComponent(icon) : ''}&publishedAt=${publishedAt}`}
          />
        </>
      ) : (
        <>
          <meta property="og:image" content="https://i-love-qiita.vercel.app/api/ogp" />
          <meta name="twitter:image" content="https://i-love-qiita.vercel.app/api/ogp" />
        </>
      )}
    </Head>
  )
})

export default CommonHead
